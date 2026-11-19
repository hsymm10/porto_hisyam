<script lang="ts">
	import Icon from '@iconify/svelte';
	import { tick } from 'svelte';
	import { currentLang } from '#lib/i18n.js';

	interface ChatMessage {
		role: 'user' | 'model';
		text: string;
		time?: string;
	}

	let isOpen = $state(false);
	let inputMessage = $state('');
	let isLoading = $state(false);
	let messagesContainerEl: HTMLDivElement | undefined = $state();
	let inputEl: HTMLInputElement | undefined = $state();

	const initialGreetingId =
		'Halo! Saya **Hisyam\'AI**, asisten AI resmi portofolio Hisyam Sayyid Alzam. Anda bisa bertanya tentang proyek, keahlian teknis (tech stack), pengalaman organisasi, atau cara menghubungi Hisyam. Ada yang ingin Anda ketahui?';

	const initialGreetingEn =
		'Hello! I am **Hisyam\'AI**, the official portfolio AI assistant for Hisyam Sayyid Alzam. You can ask me about his projects, technical skills, experience, or how to contact him. How can I help you today?';

	let messages = $state<ChatMessage[]>([
		{
			role: 'model',
			text: initialGreetingId,
			time: getTimestamp()
		}
	]);

	// Update initial greeting if user switches language and hasn't started chatting
	$effect(() => {
		if (messages.length === 1 && messages[0].role === 'model') {
			messages[0].text = $currentLang === 'id' ? initialGreetingId : initialGreetingEn;
		}
	});

	const quickPromptsId = [
		'🚀 Proyek Unggulan',
		'🛠️ Tech Stack & Keahlian',
		'🏆 Prestasi & Sertifikasi',
		'📞 Cara Menghubungi Hisyam'
	];

	const quickPromptsEn = [
		'🚀 Featured Projects',
		'🛠️ Tech Stack & Skills',
		'🏆 Awards & Certifications',
		'📞 How to Contact Hisyam'
	];

	const quickPrompts = $derived($currentLang === 'id' ? quickPromptsId : quickPromptsEn);

	function getTimestamp(): string {
		const now = new Date();
		return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	function renderMarkdown(text: string): string {
		const escaped = text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
		return escaped
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.*?)\*/g, '<em>$1</em>');
	}

	async function scrollToBottom() {
		await tick();
		if (messagesContainerEl) {
			messagesContainerEl.scrollTo({
				top: messagesContainerEl.scrollHeight,
				behavior: 'smooth'
			});
		}
	}

	async function toggleChat() {
		isOpen = !isOpen;
		if (isOpen) {
			await tick();
			inputEl?.focus();
			scrollToBottom();
		}
	}

	function resetChat() {
		messages = [
			{
				role: 'model',
				text: $currentLang === 'id' ? initialGreetingId : initialGreetingEn,
				time: getTimestamp()
			}
		];
	}

	async function sendMessage(textToSend?: string) {
		const text = (textToSend ?? inputMessage).trim();
		if (!text || isLoading) return;

		inputMessage = '';
		messages.push({
			role: 'user',
			text,
			time: getTimestamp()
		});

		isLoading = true;
		await scrollToBottom();

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					messages: messages.map((m) => ({ role: m.role, text: m.text }))
				})
			});

			const data = await res.json();
			const replyText =
				data.reply ||
				($currentLang === 'id'
					? 'Maaf, terjadi kesalahan saat menerima respon.'
					: 'Sorry, an error occurred while receiving the response.');

			messages.push({
				role: 'model',
				text: replyText,
				time: getTimestamp()
			});
		} catch (err) {
			console.error('Chat error:', err);
			messages.push({
				role: 'model',
				text:
					$currentLang === 'id'
						? 'Maaf, jaringan bermasalah. Pastikan koneksi internet Anda aktif dan coba lagi.'
						: 'Network error. Please check your internet connection and try again.',
				time: getTimestamp()
			});
		} finally {
			isLoading = false;
			await scrollToBottom();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		} else if (e.key === 'Escape' && isOpen) {
			isOpen = false;
		}
	}
</script>

<!-- Floating Chat Launcher Button -->
<div class="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
	<button
		type="button"
		onclick={toggleChat}
		aria-label={isOpen ? 'Tutup Hisyam AI' : 'Buka Hisyam AI'}
		class="group relative flex items-center gap-2.5 rounded-xs border-2 border-border bg-accent px-3.5 py-2.5 font-mono text-xs font-bold text-accent-foreground shadow-neo transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-none active:translate-x-0.5 active:translate-y-0.5 sm:px-4 sm:py-3 sm:text-sm"
	>
		<!-- Sparkle / Robot Icon -->
		<span class="relative flex items-center justify-center">
			<Icon icon={isOpen ? 'mdi:close' : 'mdi:robot-happy'} class="size-5 transition-transform duration-200 group-hover:scale-110" />
			{#if !isOpen}
				<span class="absolute -top-1 -right-1 flex h-2.5 w-2.5">
					<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
					<span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary"></span>
				</span>
			{/if}
		</span>
		<span class="tracking-wide uppercase">Hisyam'AI</span>
	</button>
</div>

<!-- Floating Chat Window Dialog -->
{#if isOpen}
	<div
		data-lenis-prevent
		role="dialog"
		aria-label="Hisyam AI Chatbot"
		class="fixed right-3 bottom-18 z-50 flex h-[500px] max-h-[80vh] w-[calc(100vw-1.5rem)] max-w-[390px] flex-col rounded-xs border-2 border-border bg-background shadow-neo animate-in fade-in zoom-in-95 duration-150 sm:right-6 sm:bottom-22 sm:h-[540px] sm:max-h-[85vh] sm:w-[410px]"
	>
		<!-- Chat Header (Neobrutalism Orange) -->
		<div class="flex items-center justify-between border-b-2 border-border bg-accent px-4 py-3 text-accent-foreground">
			<div class="flex items-center gap-2.5">
				<div class="flex size-7 items-center justify-center rounded-xs border-2 border-border bg-background text-foreground shadow-xs">
					<Icon icon="mdi:sparkles" class="size-4 text-accent" />
				</div>
				<div>
					<div class="flex items-center gap-1.5 leading-none">
						<span class="font-mono text-sm font-black tracking-wider uppercase">Hisyam'AI</span>
						<span class="inline-block size-2 rounded-full bg-emerald-500"></span>
					</div>
					<span class="font-mono text-[10px] opacity-90">Gemini Powered • Free Tier</span>
				</div>
			</div>

			<div class="flex items-center gap-1">
				<!-- Reset chat button -->
				<button
					type="button"
					onclick={resetChat}
					title="Reset Obrolan"
					aria-label="Reset Obrolan"
					class="flex size-7 items-center justify-center rounded-xs border-2 border-border bg-background/80 text-foreground transition-all hover:bg-background active:translate-x-0.5 active:translate-y-0.5"
				>
					<Icon icon="mdi:refresh" class="size-4" />
				</button>

				<!-- Close window button -->
				<button
					type="button"
					onclick={toggleChat}
					title="Tutup Chat"
					aria-label="Tutup Chat"
					class="flex size-7 items-center justify-center rounded-xs border-2 border-border bg-background/80 text-foreground transition-all hover:bg-background active:translate-x-0.5 active:translate-y-0.5"
				>
					<Icon icon="mdi:close" class="size-4" />
				</button>
			</div>
		</div>

		<!-- Quick Suggestions Chips -->
		<div class="flex items-center gap-1.5 overflow-x-auto border-b border-border/40 bg-neo-surface-subtle px-3 py-2 [touch-action:pan-x] [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
			{#each quickPrompts as prompt}
				<button
					type="button"
					onclick={() => sendMessage(prompt)}
					class="shrink-0 rounded-xs border border-border bg-card px-2.5 py-1 font-mono text-[11px] font-medium transition-all hover:bg-accent/20 hover:border-accent active:translate-y-0.5"
				>
					{prompt}
				</button>
			{/each}
		</div>

		<!-- Chat Messages Container -->
		<div
			bind:this={messagesContainerEl}
			data-lenis-prevent
			class="flex-1 space-y-3.5 overflow-y-auto p-3.5 overscroll-contain text-xs sm:p-4 sm:text-sm"
		>
			{#each messages as msg, i (i)}
				{#if msg.role === 'user'}
					<!-- User Message Bubble -->
					<div class="flex justify-end">
						<div class="max-w-[85%] space-y-1">
							<div class="rounded-xs border-2 border-border bg-accent px-3 py-2 text-accent-foreground shadow-xs">
								<p class="whitespace-pre-wrap leading-relaxed break-words font-sans">
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{@html renderMarkdown(msg.text)}
								</p>
							</div>
							{#if msg.time}
								<span class="block text-right font-mono text-[10px] text-muted-foreground">{msg.time}</span>
							{/if}
						</div>
					</div>
				{:else}
					<!-- Model / Assistant Message Bubble -->
					<div class="flex items-start gap-2">
						<div class="flex size-6 shrink-0 items-center justify-center rounded-xs border-2 border-border bg-secondary text-secondary-foreground shadow-xs">
							<Icon icon="mdi:robot-outline" class="size-3.5" />
						</div>
						<div class="max-w-[85%] space-y-1">
							<div class="rounded-xs border-2 border-border bg-card px-3 py-2.5 leading-relaxed text-foreground shadow-xs">
								<!-- Render text with basic bold support -->
								<p class="whitespace-pre-wrap leading-relaxed break-words font-sans">
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{@html renderMarkdown(msg.text)}
								</p>
							</div>
							{#if msg.time}
								<span class="block font-mono text-[10px] text-muted-foreground">{msg.time}</span>
							{/if}
						</div>
					</div>
				{/if}
			{/each}

			{#if isLoading}
				<!-- Typing indicator -->
				<div class="flex items-start gap-2">
					<div class="flex size-6 shrink-0 items-center justify-center rounded-xs border-2 border-border bg-secondary text-secondary-foreground shadow-xs">
						<Icon icon="mdi:robot-outline" class="size-3.5" />
					</div>
					<div class="rounded-xs border-2 border-border bg-card px-3 py-2.5 text-foreground shadow-xs">
						<div class="flex items-center gap-1.5">
							<span class="size-2 animate-bounce rounded-full bg-accent"></span>
							<span class="size-2 animate-bounce rounded-full bg-accent [animation-delay:0.15s]"></span>
							<span class="size-2 animate-bounce rounded-full bg-accent [animation-delay:0.3s]"></span>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Chat Input Footer -->
		<form
			onsubmit={(e) => {
				e.preventDefault();
				sendMessage();
			}}
			class="flex items-center gap-2 border-t-2 border-border bg-card p-2.5 sm:p-3"
		>
			<input
				bind:this={inputEl}
				bind:value={inputMessage}
				onkeydown={handleKeydown}
				type="text"
				placeholder={$currentLang === 'id' ? 'Tanya seputar Hisyam...' : 'Ask about Hisyam...'}
				disabled={isLoading}
				class="flex-1 rounded-xs border-2 border-border bg-background px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none disabled:opacity-50 sm:text-sm"
			/>
			<button
				type="submit"
				disabled={!inputMessage.trim() || isLoading}
				aria-label="Kirim Pesan"
				class="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xs border-2 border-border bg-secondary text-secondary-foreground shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
			>
				<Icon icon="mdi:send" class="size-4" />
			</button>
		</form>
	</div>
{/if}
