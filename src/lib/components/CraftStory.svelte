<script lang="ts">
	import { Badge } from '#lib/components/ui/badge/index.js';
	import { gsap, REDUCED_MOTION_QUERY, registerGsap, ScrollTrigger } from '#lib/gsap.js';
	import { getLenisInstance } from '#lib/lenis.js';
	import {
		Check,
		Code2,
		Database,
		Kanban,
		Palette,
		Pause,
		Play,
		Server,
		Zap
	} from '@lucide/svelte';
	import { currentLang, t } from '#lib/i18n.js';

	type Principle = {
		no: string;
		kicker: string;
		title: string;
		caption: string;
		tags: string[];
		icon: typeof Zap;
		accent: string;
		visual: 'architecture' | 'uiux' | 'performance' | 'management';
	};

	const PRINCIPLES = $derived<Principle[]>([
		{
			no: '01',
			kicker: t[$currentLang].craft.p1.kicker,
			title: t[$currentLang].craft.p1.title,
			caption: t[$currentLang].craft.p1.caption,
			tags: t[$currentLang].craft.p1.tags,
			icon: Server,
			accent: 'var(--retro-green-text)',
			visual: 'architecture'
		},
		{
			no: '02',
			kicker: t[$currentLang].craft.p2.kicker,
			title: t[$currentLang].craft.p2.title,
			caption: t[$currentLang].craft.p2.caption,
			tags: t[$currentLang].craft.p2.tags,
			icon: Palette,
			accent: 'var(--retro-tangerine-text)',
			visual: 'uiux'
		},
		{
			no: '03',
			kicker: t[$currentLang].craft.p3.kicker,
			title: t[$currentLang].craft.p3.title,
			caption: t[$currentLang].craft.p3.caption,
			tags: t[$currentLang].craft.p3.tags,
			icon: Zap,
			accent: 'var(--retro-tangerine-text)',
			visual: 'performance'
		},
		{
			no: '04',
			kicker: t[$currentLang].craft.p4.kicker,
			title: t[$currentLang].craft.p4.title,
			caption: t[$currentLang].craft.p4.caption,
			tags: t[$currentLang].craft.p4.tags,
			icon: Kanban,
			accent: 'var(--retro-green-text)',
			visual: 'management'
		}
	]);

	// Visual 01: Arsitektur Web (Full Stack Pipeline)
	const ARCH_PIPELINE = $derived([
		{
			step: '01',
			label: t[$currentLang].craft.p1.pipeline[0].label,
			desc: t[$currentLang].craft.p1.pipeline[0].desc,
			icon: Code2,
			badge: t[$currentLang].craft.p1.pipeline[0].badge
		},
		{
			step: '02',
			label: t[$currentLang].craft.p1.pipeline[1].label,
			desc: t[$currentLang].craft.p1.pipeline[1].desc,
			icon: Server,
			badge: t[$currentLang].craft.p1.pipeline[1].badge
		},
		{
			step: '03',
			label: t[$currentLang].craft.p1.pipeline[2].label,
			desc: t[$currentLang].craft.p1.pipeline[2].desc,
			icon: Database,
			badge: t[$currentLang].craft.p1.pipeline[2].badge
		}
	]);

	// Visual 02: Desain UI/UX (Design Process Stages)
	const UIUX_STAGES = $derived(t[$currentLang].craft.p2.stages);

	// Visual 03: Performa & Interaksi
	const PERF_METRICS = [
		{ label: 'LCP', value: '1.1s' },
		{ label: 'CLS', value: '0.00' },
		{ label: 'FID / INP', value: '< 50ms' }
	];

	// Visual 04: Manajemen Proyek (Sprint & Milestones)
	const SPRINT_ITEMS = $derived(t[$currentLang].craft.p4.sprint);

	let sectionEl: HTMLElement | undefined = $state();
	let trackEl: HTMLElement | undefined = $state();
	let frameEl: HTMLElement | undefined = $state();
	let canvasEl: HTMLElement | undefined = $state();

	let active = $state(0);
	let scrollProgress = $state(0);
	let reducedMotion = $state(false);
	let motionDemoPaused = $state(false);
	let st: ScrollTrigger | null = null;

	const activePrinciple = $derived(PRINCIPLES[active]);

	function jumpToStory(i: number) {
		active = i;
		if (!st) return;
		const N = PRINCIPLES.length;
		const targetY = st.start + (st.end - st.start) * ((i + 0.5) / N);
		const lenis = getLenisInstance();
		if (lenis) {
			lenis.scrollTo(targetY, {
				duration: 1.1,
				easing: (t: number) => 1 - Math.pow(1 - t, 3),
				immediate: reducedMotion
			});
		} else {
			window.scrollTo({
				top: targetY,
				behavior: reducedMotion ? 'auto' : 'smooth'
			});
		}
	}

	function toggleMotionDemo() {
		motionDemoPaused = !motionDemoPaused;
	}

	// Re-sync ScrollTrigger when language changes
	$effect(() => {
		void $currentLang;
		if (typeof window !== 'undefined') {
			requestAnimationFrame(() => {
				ScrollTrigger.refresh();
			});
		}
	});

	$effect(() => {
		if (!trackEl || !frameEl) return;
		registerGsap();

		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = motionQuery.matches;
		const handleMotionChange = (event: MediaQueryListEvent) => {
			reducedMotion = event.matches;
		};
		motionQuery.addEventListener('change', handleMotionChange);

		// Accurately track header height via ResizeObserver
		let headerObserver: ResizeObserver | null = null;
		const headerEl = document.querySelector('header');
		if (headerEl) {
			headerObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const h = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
					if (h > 0) {
						document.documentElement.style.setProperty('--nav-h', `${Math.round(h)}px`);
					}
				}
				ScrollTrigger.refresh();
			});
			headerObserver.observe(headerEl);
		}

		const handleRefresh = () => {
			ScrollTrigger.refresh();
		};

		window.addEventListener('resize', handleRefresh);
		window.addEventListener('orientationchange', handleRefresh);
		document.fonts?.ready.then(handleRefresh);

		const currentTrack = trackEl;
		const currentFrame = frameEl;

		const ctx = gsap.context(() => {
			st = ScrollTrigger.create({
				trigger: currentTrack,
				start: () => `top top+=${parseFloat(getComputedStyle(currentFrame).top) || 68}`,
				end: () => `+=${currentTrack.offsetHeight - currentFrame.offsetHeight}`,
				invalidateOnRefresh: true,
				onUpdate: (self) => {
					scrollProgress = self.progress;
					const N = PRINCIPLES.length;
					const clamped = Math.max(0, Math.min(0.9999, self.progress));
					const raw = clamped * N;
					const base = Math.floor(raw);
					const frac = raw - base;

					// 2.5% hysteresis prevents flickering at story boundaries
					const h = 0.025;
					if (base > active && frac >= h) {
						active = Math.min(N - 1, base);
					} else if (base < active && 1 - frac >= h) {
						active = Math.max(0, base);
					}
				}
			});

			if (st) {
				scrollProgress = st.progress;
				active = Math.min(
					PRINCIPLES.length - 1,
					Math.max(0, Math.floor(st.progress * PRINCIPLES.length))
				);
			}
		}, sectionEl);

		const mm = gsap.matchMedia(sectionEl);
		mm.add(REDUCED_MOTION_QUERY, () => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top 80%',
					once: true
				}
			});

			tl.from('[data-craft-header]', {
				y: 22,
				opacity: 0,
				duration: 0.55,
				ease: 'power3.out',
				clearProps: 'transform'
			}).from(
				'[data-craft-window]',
				{
					y: 34,
					scale: 0.97,
					opacity: 0,
					duration: 0.65,
					ease: 'power3.out',
					clearProps: 'transform'
				},
				'-=0.32'
			);

			gsap.to('[data-craft-hint]', {
				x: -14,
				ease: 'none',
				scrollTrigger: {
					trigger: currentTrack,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		});

		return () => {
			motionQuery.removeEventListener('change', handleMotionChange);
			headerObserver?.disconnect();
			window.removeEventListener('resize', handleRefresh);
			window.removeEventListener('orientationchange', handleRefresh);
			mm.revert();
			ctx.revert();
			st = null;
		};
	});

	// Trigger counter when Performance story becomes active
	$effect(() => {
		const currentActive = active;
		const container = canvasEl;
		if (reducedMotion || !container || currentActive !== 2) return;

		registerGsap();
		const ctx = gsap.context(() => {
			const scoreEl = container.querySelector('[data-craft-score]');
			if (scoreEl) {
				const counter = { value: 0 };
				gsap.to(counter, {
					value: 99,
					duration: 0.9,
					ease: 'power3.out',
					onUpdate: () => {
						scoreEl.textContent = String(Math.round(counter.value));
					}
				});
			}
		}, container);

		return () => ctx.revert();
	});
</script>

<!-- Section Container with standard vertical spacing matching #projects, #experience, #gallery -->
<section
	id="craft"
	bind:this={sectionEl}
	class="relative w-full border-b-2 border-border bg-background py-10 sm:py-16 md:py-20"
>
	<!-- Scroll Track with CSS-driven height -->
	<div bind:this={trackEl} class="craft-track relative w-full" style="--n: {PRINCIPLES.length};">
		<!-- Sticky Frame: positioned below sticky navbar with dedicated gap -->
		<div
			bind:this={frameEl}
			class="craft-frame sticky z-20 w-full"
			style="top: calc(var(--nav-h) + var(--nav-gap));"
		>
			<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
				<!-- Header (Badge + Hint): left-aligned, flex-wrap -->
				<div
					data-craft-header
					class="mb-2.5 flex flex-wrap items-center justify-between gap-2 sm:mb-4 sm:gap-4"
				>
					<Badge variant="lime" class="text-[0.6875rem] sm:text-xs">
						{t[$currentLang].craft.badge}
					</Badge>
					<span
						data-craft-hint
						class="font-mono text-[0.6875rem] font-bold text-muted-foreground uppercase sm:text-xs"
					>
						{t[$currentLang].craft.scrollHint}
					</span>
				</div>

				<!-- Storybook Window (constant height across all stories, fits inside viewport) -->
				<div
					data-craft-window
					class="w-full overflow-hidden border-2 border-border bg-card shadow-neo"
				>
					<!-- Toolbar -->
					<div
						class="flex items-center gap-2 border-b-2 border-border bg-neo-surface-subtle px-3 py-2 sm:gap-2.5 sm:px-6 sm:py-3"
					>
						<span class="flex gap-1.5" aria-hidden="true">
							<span class="size-2.5 rounded-full border-2 border-border bg-[#fe7a25] sm:size-3"
							></span>
							<span class="size-2.5 rounded-full border-2 border-border bg-[#e9e8ca] sm:size-3"
							></span>
							<span class="size-2.5 rounded-full border-2 border-border bg-[#006732] sm:size-3"
							></span>
						</span>
						<span
							class="hidden truncate font-mono text-xs font-medium text-muted-foreground md:block"
						>
							{$currentLang === 'id' ? 'proses' : 'craft'} / {activePrinciple.kicker} &rsaquo; {$currentLang ===
							'id'
								? 'Standar'
								: 'Default'}
						</span>
						<span class="ml-auto font-mono text-xs font-bold text-muted-foreground">
							{activePrinciple.no}/0{PRINCIPLES.length}
						</span>
					</div>

					<!-- Scroll Progress Track: purely controlled by GSAP scrollProgress with smooth transition -->
					<div
						aria-hidden="true"
						class="h-1.5 w-full border-b-2 border-border bg-neo-surface-subtle"
					>
						<div
							class="h-full w-full origin-left bg-secondary transition-transform duration-[120ms] ease-linear will-change-transform"
							style:transform={`scaleX(${scrollProgress})`}
						></div>
					</div>

					<div class="grid md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
						<!-- Sidebar (Tablet & Desktop) -->
						<aside
							class="hidden border-r-2 border-border bg-neo-surface-subtle p-4 sm:p-5 md:block"
						>
							<span
								class="px-2 font-mono text-[0.6875rem] font-bold tracking-wider text-muted-foreground uppercase"
							>
								{t[$currentLang].craft.storiesLabel}
							</span>
							<div class="mt-3 space-y-1.5">
								{#each PRINCIPLES as item, i (item.no)}
									{@const isCurrent = i === active}
									<button
										type="button"
										onclick={() => jumpToStory(i)}
										aria-current={isCurrent ? 'step' : undefined}
										class="flex w-full items-center gap-2.5 border-2 px-3 py-2 text-left transition-colors sm:py-2.5 {isCurrent
											? 'border-border bg-card font-bold text-foreground shadow-neo-sm'
											: 'border-transparent text-muted-foreground hover:bg-card/60 hover:text-foreground'}"
									>
										<span
											aria-hidden="true"
											class="size-2.5 shrink-0 rounded-full border border-border"
											style:background-color={item.accent}
										></span>
										<span class="font-mono text-xs uppercase">{item.kicker}</span>
									</button>
								{/each}
							</div>
						</aside>

						<!-- Mobile Story Selector Tabs (2x2 Grid on Mobile, uniform min-h-9, wrapping safely) -->
						<div
							class="grid grid-cols-2 gap-1.5 border-b-2 border-border p-2 sm:gap-2 sm:p-2.5 md:hidden"
						>
							{#each PRINCIPLES as item, i (item.no)}
								{@const isCurrent = i === active}
								<button
									type="button"
									onclick={() => jumpToStory(i)}
									aria-current={isCurrent ? 'step' : undefined}
									class="flex min-h-9 items-center justify-center border-2 px-2 py-1 text-center font-mono text-[0.6875rem] leading-tight font-bold uppercase transition-colors sm:text-xs {isCurrent
										? 'border-border bg-foreground text-background shadow-neo-sm'
										: 'border-border bg-card text-muted-foreground'}"
								>
									<span class="max-w-full text-center break-words">{item.kicker}</span>
								</button>
							{/each}
						</div>

						<!-- Main Column: Canvas + Meta -->
						<div class="min-w-0">
							<!-- Story Canvas: single grid cell where all 4 visual stories are stacked -->
							<div
								bind:this={canvasEl}
								class="neo-grid-bg grid min-h-[200px] place-items-center p-3 sm:min-h-[260px] sm:p-5 md:min-h-[280px] md:p-6 [&>*]:col-start-1 [&>*]:row-start-1"
							>
								<!-- Story 0: Architecture (Uniform CSS grid card pattern) -->
								<div
									class="craft-slide flex h-auto w-full justify-center self-center {active === 0
										? 'active'
										: ''}"
									aria-hidden={active !== 0}
									inert={active !== 0 ? true : undefined}
								>
									<div class="flex w-full max-w-[28rem] flex-col gap-2.5 sm:max-w-[32rem] sm:gap-3">
										{#each ARCH_PIPELINE as item (item.step)}
											<div
												data-craft-arch-row
												class="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 border-2 border-border bg-card p-2.5 shadow-neo-sm sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:p-3"
											>
												<span
													class="grid size-8 shrink-0 place-items-center border-2 border-border bg-secondary text-secondary-foreground sm:size-10"
												>
													<item.icon class="size-4 stroke-[2.2] sm:size-5" aria-hidden="true" />
												</span>
												<div class="min-w-0">
													<p
														class="font-display text-sm font-black break-words uppercase sm:text-base"
													>
														<span
															class="font-mono text-xs font-bold text-muted-foreground sm:text-sm"
															>#{item.step}</span
														>
														{item.label}
													</p>
													<p
														class="mt-0.5 font-mono text-[0.6875rem] break-words text-muted-foreground sm:text-xs"
													>
														{item.desc}
													</p>
												</div>
												<Badge
													variant="outline"
													class="col-start-2 max-w-full justify-self-start text-[0.625rem] whitespace-normal sm:col-start-3 sm:justify-self-end sm:text-[0.6875rem]"
												>
													{item.badge}
												</Badge>
											</div>
										{/each}
									</div>
								</div>

								<!-- Story 1: UI/UX (Uniform CSS grid on mobile, 3-card on desktop) -->
								<div
									class="craft-slide flex h-auto w-full justify-center self-center {active === 1
										? 'active'
										: ''}"
									aria-hidden={active !== 1}
									inert={active !== 1 ? true : undefined}
								>
									<div
										class="grid w-full max-w-[28rem] gap-2.5 sm:max-w-[32rem] sm:grid-cols-3 sm:gap-3"
									>
										{#each UIUX_STAGES as stage (stage.no)}
											<div
												data-craft-uiux-card
												class="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 border-2 border-border bg-card p-2.5 shadow-neo-sm sm:flex sm:flex-col sm:justify-between sm:gap-3 sm:p-3"
											>
												<span
													class="grid size-8 shrink-0 place-items-center border-2 border-border bg-accent font-mono text-xs font-bold text-accent-foreground sm:size-9"
												>
													#{stage.no}
												</span>
												<div class="min-w-0 sm:w-full">
													<h3
														class="font-display text-xs font-black break-words uppercase sm:text-sm"
													>
														{stage.name}
													</h3>
													<p
														class="mt-0.5 font-mono text-[0.6875rem] break-words text-muted-foreground sm:mt-1 sm:text-[0.6875rem]"
													>
														{stage.desc}
													</p>
												</div>
												<Badge
													variant="outline"
													class="col-start-2 max-w-full justify-self-start text-[0.625rem] whitespace-normal sm:col-start-auto sm:self-start sm:text-[0.6875rem]"
												>
													{stage.tag}
												</Badge>
											</div>
										{/each}
									</div>
								</div>

								<!-- Story 2: Performance (Gauge + Metrics) -->
								<div
									class="craft-slide flex h-auto w-full justify-center self-center {active === 2
										? 'active'
										: ''}"
									aria-hidden={active !== 2}
									inert={active !== 2 ? true : undefined}
								>
									<div
										class="flex w-full max-w-[28rem] flex-col gap-4 sm:max-w-[32rem] sm:flex-row sm:items-center sm:gap-6"
									>
										<div class="relative mx-auto size-24 shrink-0 sm:size-28 md:size-32">
											<svg viewBox="0 0 130 130" class="size-full" aria-hidden="true">
												<circle
													cx="65"
													cy="65"
													r="52"
													fill="none"
													stroke="var(--neo-surface-muted)"
													stroke-width="11"
												/>
												<circle
													cx="65"
													cy="65"
													r="52"
													fill="none"
													stroke="var(--retro-green-text)"
													stroke-width="11"
													stroke-linecap="square"
													transform="rotate(-90 65 65)"
													class="craft-ring-fill"
												/>
											</svg>
											<div class="absolute inset-0 flex flex-col items-center justify-center">
												<span
													data-craft-score
													class="font-display text-3xl leading-none font-black text-foreground sm:text-4xl"
												>
													99
												</span>
												<span
													class="mt-0.5 font-mono text-[0.6875rem] font-bold text-muted-foreground uppercase"
												>
													{t[$currentLang].craft.scoreLabel}
												</span>
											</div>
										</div>
										<div class="min-w-0 flex-1 space-y-2">
											{#each PERF_METRICS as metric (metric.label)}
												<div
													data-craft-perf-row
													class="flex items-center justify-between border-b-2 border-border pb-1"
												>
													<span class="font-mono text-xs font-bold text-muted-foreground">
														{metric.label}
													</span>
													<span
														class="font-display text-base font-black text-foreground sm:text-lg"
													>
														{metric.value}
													</span>
												</div>
											{/each}
											<div
												data-craft-motion-meta
												class="flex items-center justify-between gap-2 border-t border-dashed border-border pt-2"
											>
												<span
													class="font-mono text-[0.6875rem] font-bold text-muted-foreground uppercase"
												>
													{t[$currentLang].craft.motionEasing}
												</span>
												<button
													type="button"
													onclick={toggleMotionDemo}
													aria-label={motionDemoPaused
														? $currentLang === 'id'
															? 'Jalankan demonstrasi gerak'
															: 'Play motion demo'
														: $currentLang === 'id'
															? 'Jeda demonstrasi gerak'
															: 'Pause motion demo'}
													class="inline-flex items-center gap-1.5 border-2 border-border bg-card px-2 py-0.5 font-mono text-xs font-bold text-foreground shadow-neo-sm hover:bg-neo-surface-subtle"
												>
													{#if motionDemoPaused}
														<Play class="size-3" aria-hidden="true" />
														{t[$currentLang].craft.motionPlay}
													{:else}
														<Pause class="size-3" aria-hidden="true" />
														60fps
													{/if}
												</button>
											</div>
										</div>
									</div>
								</div>

								<!-- Story 3: Management (Uniform CSS grid card pattern matching Story 01) -->
								<div
									class="craft-slide flex h-auto w-full justify-center self-center {active === 3
										? 'active'
										: ''}"
									aria-hidden={active !== 3}
									inert={active !== 3 ? true : undefined}
								>
									<div class="flex w-full max-w-[28rem] flex-col gap-2.5 sm:max-w-[32rem] sm:gap-3">
										{#each SPRINT_ITEMS as item (item.task)}
											<div
												data-craft-sprint-row
												class="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 border-2 border-border bg-card p-2.5 shadow-neo-sm sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:p-3"
											>
												<span
													class="grid size-8 shrink-0 place-items-center border-2 border-border bg-primary text-primary-foreground sm:size-10"
												>
													<Check class="size-4 stroke-[3] sm:size-5" aria-hidden="true" />
												</span>
												<div class="min-w-0">
													<p
														class="font-display text-sm font-bold break-words uppercase sm:text-base"
													>
														{item.task}
													</p>
													<p
														class="mt-0.5 font-mono text-[0.6875rem] break-words text-muted-foreground sm:text-xs"
													>
														{item.owner}
													</p>
												</div>
												<Badge
													variant={item.status === 'Completed' || item.status === 'Selesai'
														? 'lime'
														: 'outline'}
													class="col-start-2 max-w-full justify-self-start text-[0.625rem] whitespace-normal sm:col-start-3 sm:justify-self-end sm:text-[0.6875rem]"
												>
													{item.status}
												</Badge>
											</div>
										{/each}
									</div>
								</div>
							</div>

							<!-- Meta & Tags: All 4 principle descriptions stacked in one grid cell -->
							<div
								class="grid border-t-2 border-border bg-card p-3 sm:p-5 md:p-6 [&>*]:col-start-1 [&>*]:row-start-1"
							>
								{#each PRINCIPLES as p, i (p.no)}
									{@const Icon = p.icon}
									<div
										class="craft-slide h-auto self-center {active === i ? 'active' : ''}"
										aria-hidden={active !== i}
										inert={active !== i ? true : undefined}
									>
										<div class="flex items-center gap-2">
											<Icon
												class="size-4 shrink-0"
												style={`color: ${p.accent}`}
												aria-hidden="true"
											/>
											<span
												class="font-mono text-xs font-bold tracking-wider uppercase"
												style:color={p.accent}
											>
												{p.kicker}
											</span>
										</div>
										<h2
											class="mt-1.5 font-display text-xl leading-tight font-black break-words uppercase sm:text-2xl md:text-3xl"
										>
											{p.title}
										</h2>
										<p
											class="mt-1.5 font-mono text-xs break-words text-muted-foreground sm:text-sm"
										>
											{p.caption}
										</p>
										<div class="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
											{#each p.tags as tag (tag)}
												<Badge variant="outline" class="max-w-full text-xs break-words">
													{tag}
												</Badge>
											{/each}
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	:root {
		--nav-gap: 1.5rem;
		--craft-step: 55svh;
	}

	@media (max-width: 639px) {
		:root {
			--nav-gap: 0.75rem;
			--craft-step: 45svh;
		}
	}

	.craft-track {
		height: calc(100svh + var(--n) * var(--craft-step));
	}

	.craft-frame {
		max-height: calc(100svh - var(--nav-h) - var(--nav-gap) * 2);
	}

	/* Smooth CSS transitions for slides (interruptible, constant container height) */
	.craft-slide {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		transform: translateY(0.5rem);
		transition:
			opacity 350ms cubic-bezier(0.22, 1, 0.36, 1),
			transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
			visibility 350ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.craft-slide.active {
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
		transform: translateY(0);
	}

	@media (max-height: 700px) {
		[data-craft-header] {
			margin-bottom: 0.375rem !important;
		}
		.neo-grid-bg {
			padding: 0.75rem !important;
			min-height: 180px !important;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		@keyframes craft-ring-draw {
			from {
				stroke-dashoffset: 327;
			}
			to {
				stroke-dashoffset: 6.5;
			}
		}

		.craft-ring-fill {
			stroke-dasharray: 327;
			stroke-dashoffset: 6.5;
			animation: craft-ring-draw 950ms cubic-bezier(0.22, 1, 0.36, 1) both;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.craft-slide {
			transition-duration: 0ms !important;
			transform: none !important;
		}
		.craft-slide.active {
			transform: none !important;
		}

		.craft-ring-fill {
			stroke-dasharray: 327;
			stroke-dashoffset: 6.5;
		}
	}
</style>
