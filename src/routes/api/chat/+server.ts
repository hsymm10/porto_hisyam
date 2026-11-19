import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { HISYAM_AI_SYSTEM_INSTRUCTION } from '#lib/server/hisyamKnowledge.js';

interface IncomingMessage {
	role: 'user' | 'model';
	text: string;
}

// In-memory rate limiting map: ip -> array of request timestamps (last 60s)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 12;

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const windowStart = now - RATE_LIMIT_WINDOW_MS;
	const timestamps = (rateLimitMap.get(ip) || []).filter((t) => t > windowStart);

	if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
		return true;
	}

	timestamps.push(now);
	rateLimitMap.set(ip, timestamps);

	// Clean up old entries periodically
	if (rateLimitMap.size > 1000) {
		for (const [key, times] of rateLimitMap.entries()) {
			const valid = times.filter((t) => t > windowStart);
			if (valid.length === 0) rateLimitMap.delete(key);
			else rateLimitMap.set(key, valid);
		}
	}

	return false;
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	try {
		const clientIp = getClientAddress ? getClientAddress() : 'unknown';
		if (isRateLimited(clientIp)) {
			return json(
				{
					error: 'Terlalu banyak permintaan dalam waktu singkat. Silakan tunggu beberapa saat.',
					reply: 'Mohon tunggu sebentar ya, Anda mengirim terlalu banyak pesan dalam satu menit.'
				},
				{ status: 429 }
			);
		}

		const body = (await request.json().catch(() => null)) as {
			messages?: IncomingMessage[];
		} | null;

		if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
			return json({ error: 'Format pesan tidak valid' }, { status: 400 });
		}

		// Keep only the last 6 messages to keep context concise and within tokens
		const recentMessages = body.messages.slice(-6).map((msg) => ({
			role: msg.role === 'user' ? 'user' : 'model',
			parts: [{ text: String(msg.text || '').trim().slice(0, 1000) }]
		}));

		const lastMsg = recentMessages[recentMessages.length - 1];
		if (!lastMsg || !lastMsg.parts[0]?.text) {
			return json({ error: 'Pesan kosong' }, { status: 400 });
		}

		if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '') {
			try {
				process.loadEnvFile?.('.env');
			} catch {}
		}

		const apiKey = process.env.GEMINI_API_KEY;

		// Fallback friendly message if API Key has not been added to .env yet
		if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_gemini_api_key_here')) {
			return json({
				reply:
					"Halo! Saya Hisyam'AI. Asisten ini sudah siap beroperasi, namun GEMINI_API_KEY belum dikonfigurasi di file .env server. Silakan masukkan API key Anda di .env untuk mulai berbincang dengan AI!",
				configured: false
			});
		}

		const preferredModel = process.env.GEMINI_MODEL || 'gemini-flash-latest';
		const candidateModels = Array.from(
			new Set([preferredModel, 'gemini-flash-latest', 'gemini-3.5-flash', 'gemini-flash-lite-latest'])
		);

		const payload = {
			system_instruction: {
				parts: [{ text: HISYAM_AI_SYSTEM_INSTRUCTION }]
			},
			contents: recentMessages,
			generationConfig: {
				temperature: 0.4,
				topK: 40,
				topP: 0.95,
				maxOutputTokens: 600
			}
		};

		let lastErrorStatus = 500;
		let lastErrorText = '';
		let candidate: { content?: { parts?: Array<{ text?: string }> } } | undefined;

		for (const currentModel of candidateModels) {
			const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${apiKey.trim()}`;
			try {
				const res = await fetch(endpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					signal: AbortSignal.timeout(8000),
					body: JSON.stringify(payload)
				});

				if (res.ok) {
					const data = await res.json();
					candidate = data.candidates?.[0];
					if (candidate?.content?.parts?.[0]?.text) {
						break;
					}
				} else {
					lastErrorStatus = res.status;
					lastErrorText = await res.text();
					console.warn(`Model ${currentModel} failed with status ${res.status}`);
				}
			} catch (e) {
				console.warn(`Fetch to ${currentModel} failed:`, e);
			}
		}

		if (!candidate?.content?.parts?.[0]?.text) {
			let userFacingError = 'Maaf, terjadi kendala saat menghubungi layanan AI. Coba sesaat lagi.';
			if (lastErrorStatus === 429) {
				userFacingError = 'Kuota gratis API sedang padat. Silakan tunggu beberapa detik dan coba lagi.';
			} else if (lastErrorStatus === 400 || lastErrorStatus === 403) {
				userFacingError = 'API key Gemini tidak valid atau izin belum diaktifkan di Google AI Studio.';
			}

			return json(
				{
					reply: userFacingError,
					error: `Gemini API returned status ${lastErrorStatus}: ${lastErrorText.slice(0, 200)}`
				},
				{ status: 502 }
			);
		}

		const aiReply =
			candidate.content.parts[0].text.trim() ||
			'Maaf, saya tidak dapat merumuskan respon saat ini.';

		return json({
			reply: aiReply,
			configured: true
		});
	} catch (err: unknown) {
		console.error('Chat endpoint error:', err);
		return json(
			{
				reply: 'Terjadi kesalahan sistem internal. Silakan coba kembali nanti.',
				error: err instanceof Error ? err.message : String(err)
			},
			{ status: 500 }
		);
	}
};
