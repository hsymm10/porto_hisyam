import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getHisyamAiSystemInstruction } from '#lib/server/hisyamKnowledge.js';

interface IncomingMessage {
	role: 'user' | 'model';
	text: string;
}

// In-memory rate limiting map: ip -> array of request timestamps (last 60s)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 8;
const MIN_INTERVAL_MS = 1500; // Minimum 1.5 seconds between messages

function checkRateLimit(ip: string): { limited: boolean; reason?: 'spam' | 'quota' } {
	const now = Date.now();
	const windowStart = now - RATE_LIMIT_WINDOW_MS;
	const timestamps = (rateLimitMap.get(ip) || []).filter((t) => t > windowStart);

	// Check if user is clicking too fast (< 1.5s interval)
	if (timestamps.length > 0) {
		const lastRequestTime = timestamps[timestamps.length - 1];
		if (now - lastRequestTime < MIN_INTERVAL_MS) {
			return { limited: true, reason: 'spam' };
		}
	}

	// Check if user exceeded 8 requests per minute
	if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
		return { limited: true, reason: 'quota' };
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

	return { limited: false };
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	try {
		const clientIp = getClientAddress ? getClientAddress() : 'unknown';

		const body = (await request.json().catch(() => null)) as {
			messages?: IncomingMessage[];
			lang?: 'id' | 'en';
		} | null;

		const lang = body?.lang === 'en' ? 'en' : 'id';

		const rateCheck = checkRateLimit(clientIp);
		if (rateCheck.limited) {
			const reply =
				rateCheck.reason === 'spam'
					? lang === 'en'
						? 'Please wait a moment before sending another message.'
						: 'Mohon tunggu sebentar sebelum mengirim pesan lagi ya.'
					: lang === 'en'
						? 'Rate limit exceeded (max 8 messages/min). Please try again in a minute.'
						: 'Batas pesan tercapai (maks 8 pesan/menit). Silakan tunggu 1 menit.';

			return json(
				{
					error: 'Rate limit exceeded',
					reply
				},
				{ status: 429 }
			);
		}

		if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
			return json({ error: 'Format pesan tidak valid' }, { status: 400 });
		}

		// Keep only the last 4 messages to keep context concise, fast, and token-efficient
		const recentMessages = body.messages.slice(-4).map((msg) => ({
			role: msg.role === 'user' ? 'user' : 'model',
			parts: [{ text: String(msg.text || '').trim().slice(0, 250) }]
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
					lang === 'en'
						? "Hello! I am Hisyam'AI. The assistant is ready, but GEMINI_API_KEY is not configured on the server yet."
						: "Halo! Saya Hisyam'AI. Asisten ini sudah siap beroperasi, namun GEMINI_API_KEY belum dikonfigurasi di file .env server.",
				configured: false
			});
		}

		const preferredModel = (process.env.GEMINI_MODEL || 'gemini-flash-lite-latest').replace(/['"]/g, '').trim();
		const candidateModels = Array.from(
			new Set([preferredModel, 'gemini-flash-lite-latest', 'gemini-3.1-flash-lite', 'gemini-3.5-flash-lite'])
		);

		const payload = {
			system_instruction: {
				parts: [{ text: getHisyamAiSystemInstruction(lang) }]
			},
			contents: recentMessages,
			generationConfig: {
				temperature: 0.2, // Low temperature for high speed and direct factual answers
				topK: 20,
				topP: 0.8,
				maxOutputTokens: 200 // Concise responses for sub-second speed and saving token quota
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
					console.warn(`Model ${currentModel} failed with status ${res.status}: ${lastErrorText.slice(0, 100)}`);
				}
			} catch (e) {
				console.warn(`Fetch to ${currentModel} failed:`, e);
			}
		}

		if (!candidate?.content?.parts?.[0]?.text) {
			let userFacingError =
				lang === 'en'
					? 'Sorry, unable to contact AI service right now. Please try again later.'
					: 'Maaf, terjadi kendala saat menghubungi layanan AI. Coba sesaat lagi.';

			if (lastErrorStatus === 429) {
				userFacingError =
					lang === 'en'
						? 'AI quota is currently busy. Please wait a few seconds and try again.'
						: 'Kuota gratis API sedang padat. Silakan tunggu beberapa detik dan coba lagi.';
			} else if (lastErrorStatus === 400 || lastErrorStatus === 403) {
				userFacingError =
					lang === 'en'
						? 'Gemini API key is invalid or not enabled in Google AI Studio.'
						: 'API key Gemini tidak valid atau izin belum diaktifkan di Google AI Studio.';
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
			(lang === 'en'
				? 'Sorry, I could not generate a response right now.'
				: 'Maaf, saya tidak dapat merumuskan respon saat ini.');

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
