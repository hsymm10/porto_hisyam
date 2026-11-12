<script lang="ts">
	import { Badge } from '#lib/components/ui/badge/index.js';
	import { getLenisInstance } from '#lib/lenis.js';
	import { Activity, Check, Eye, Layers, Pause, Play, Zap } from '@lucide/svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	type Principle = {
		no: string;
		kicker: string;
		title: string;
		caption: string;
		tags: string[];
		icon: typeof Zap;
		accent: string;
		visual: 'performance' | 'a11y' | 'motion' | 'system';
	};

	const PRINCIPLES: Principle[] = [
		{
			no: '01',
			kicker: 'Performance',
			title: 'Fast is a feature.',
			caption: 'Every millisecond is part of the design.',
			tags: ['Core Web Vitals', 'Code-splitting', 'Lazy assets'],
			icon: Zap,
			accent: '#4d7c0f',
			visual: 'performance'
		},
		{
			no: '02',
			kicker: 'Accessibility',
			title: 'Built for everyone.',
			caption: 'If it isn\u2019t usable by all, it isn\u2019t done.',
			tags: ['Semantic HTML', 'Keyboard-first', 'Contrast AA'],
			icon: Eye,
			accent: '#7542ff',
			visual: 'a11y'
		},
		{
			no: '03',
			kicker: 'Motion',
			title: 'Motion with meaning.',
			caption: 'Animation that guides \u2014 never decorates.',
			tags: ['60fps', 'Spring physics', 'Interruptible'],
			icon: Activity,
			accent: '#d9386a',
			visual: 'motion'
		},
		{
			no: '04',
			kicker: 'Design systems',
			title: 'Consistency that scales.',
			caption: 'Tokens and components that grow with you.',
			tags: ['Design tokens', 'Reusable UI', 'Documented'],
			icon: Layers,
			accent: '#b45309',
			visual: 'system'
		}
	];

	const PERF_METRICS = [
		{ label: 'LCP', value: '1.1s' },
		{ label: 'CLS', value: '0.00' },
		{ label: 'TTI', value: '1.6s' }
	];

	const A11Y_ITEMS = [
		'Semantic HTML structure',
		'Full keyboard navigation',
		'Color contrast \u2265 AA',
		'Screen-reader labels'
	];

	const MOTION_DOTS = [0, 1, 2, 3, 4];
	const TOKEN_SWATCHES = ['#aee82a', '#7542ff', '#ff6e9f', '#ececec', '#0d0d0d'];
	const TOKEN_SPACES = [40, 70, 110, 150];

	let sectionEl: HTMLElement | undefined = $state();
	let active = $state(0);
	let scrollProgress = $state(0);
	let supportsScrollTimeline = $state(false);
	let reducedMotion = $state(false);
	let motionDemoPaused = $state(false);

	const activePrinciple = $derived(PRINCIPLES[active]);
	const ActiveIcon = $derived(activePrinciple.icon);

	function jumpToStory(index: number) {
		if (!sectionEl) {
			active = index;
			return;
		}
		const rect = sectionEl.getBoundingClientRect();
		const sectionTop = window.scrollY + rect.top;
		const maxScroll = Math.max(1, rect.height - window.innerHeight);
		const sliceRatio = (index + 0.15) / PRINCIPLES.length;
		const targetY = sectionTop + maxScroll * Math.min(0.99, Math.max(0, sliceRatio));
		const lenis = getLenisInstance();
		if (lenis) {
			lenis.scrollTo(targetY, { immediate: reducedMotion });
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

	$effect(() => {
		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = motionQuery.matches;
		const handleMotionChange = (event: MediaQueryListEvent) => {
			reducedMotion = event.matches;
		};
		motionQuery.addEventListener('change', handleMotionChange);

		supportsScrollTimeline = CSS.supports(
			'(animation-timeline: scroll()) and (animation-range: 0% 100%)'
		);

		let rafId = 0;
		const updateScroll = () => {
			rafId = 0;
			if (!sectionEl) return;
			const rect = sectionEl.getBoundingClientRect();
			const maxScroll = Math.max(1, rect.height - window.innerHeight);
			const nextProgress = Math.min(1, Math.max(0, -rect.top / maxScroll));
			scrollProgress = nextProgress;
			const nextActive = Math.min(
				PRINCIPLES.length - 1,
				Math.max(0, Math.floor(nextProgress * PRINCIPLES.length))
			);
			if (nextActive !== active) {
				active = nextActive;
			}
		};

		const onScrollOrResize = () => {
			if (rafId !== 0) return;
			rafId = window.requestAnimationFrame(updateScroll);
		};

		updateScroll();
		window.addEventListener('scroll', onScrollOrResize, { passive: true });
		window.addEventListener('resize', onScrollOrResize, { passive: true });

		return () => {
			motionQuery.removeEventListener('change', handleMotionChange);
			window.removeEventListener('scroll', onScrollOrResize);
			window.removeEventListener('resize', onScrollOrResize);
			if (rafId !== 0) window.cancelAnimationFrame(rafId);
		};
	});
</script>

<section
	id="craft"
	bind:this={sectionEl}
	class="craft-section relative h-[440vh] w-full border-b-2 border-border bg-background"
>
	<div class="sticky top-16 flex min-h-[calc(100svh-4rem)] items-center py-8 sm:py-12">
		<div class="mx-auto w-full max-w-7xl px-6 sm:px-8">
			<div class="mb-5 flex flex-wrap items-center justify-between gap-4">
				<Badge variant="lime">How I Build &bull; The Craft</Badge>
				<span class="font-mono text-xs font-bold text-muted-foreground uppercase">
					keep scrolling to flip stories &darr;
				</span>
			</div>

			<!-- Storybook Window (full max-w-7xl width + shadow-neo matching all sections) -->
			<div class="w-full overflow-hidden border-2 border-border bg-card shadow-neo">
				<!-- Toolbar -->
				<div
					class="flex items-center gap-3 border-b-2 border-border bg-neo-surface-subtle px-5 py-3.5 sm:px-6"
				>
					<span class="flex gap-1.5" aria-hidden="true">
						<span class="size-3 rounded-full border-2 border-border bg-accent"></span>
						<span class="size-3 rounded-full border-2 border-border bg-primary"></span>
						<span class="size-3 rounded-full border-2 border-border bg-secondary"></span>
					</span>
					<span
						class="hidden truncate font-mono text-xs font-medium text-muted-foreground md:block"
					>
						craft / {activePrinciple.kicker} &rsaquo; Default
					</span>
					<span class="ml-auto font-mono text-xs font-bold text-muted-foreground">
						{activePrinciple.no}/0{PRINCIPLES.length}
					</span>
				</div>

				<!-- Scroll Progress Track -->
				<div aria-hidden="true" class="h-1.5 w-full border-b-2 border-border bg-neo-surface-subtle">
					<div
						class="craft-progress h-full w-full origin-left bg-secondary"
						style:transform={!supportsScrollTimeline || reducedMotion
							? `scaleX(${scrollProgress})`
							: undefined}
					></div>
				</div>

				<div class="grid md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
					<!-- Sidebar (Tablet & Desktop) -->
					<aside class="hidden border-r-2 border-border bg-neo-surface-subtle p-4 sm:p-5 md:block">
						<span
							class="px-2 font-mono text-[0.6875rem] font-bold tracking-wider text-muted-foreground uppercase"
						>
							Stories
						</span>
						<div class="mt-3 space-y-1.5">
							{#each PRINCIPLES as item, i (item.no)}
								{@const isCurrent = i === active}
								<button
									type="button"
									onclick={() => jumpToStory(i)}
									aria-current={isCurrent ? 'step' : undefined}
									class="flex w-full items-center gap-2.5 border-2 px-3 py-2.5 text-left transition-colors {isCurrent
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

					<!-- Mobile Tabs -->
					<div class="flex gap-2 overflow-x-auto border-b-2 border-border p-3 md:hidden">
						{#each PRINCIPLES as item, i (item.no)}
							{@const isCurrent = i === active}
							<button
								type="button"
								onclick={() => jumpToStory(i)}
								aria-current={isCurrent ? 'step' : undefined}
								class="shrink-0 border-2 px-3 py-1.5 font-mono text-xs font-bold uppercase transition-colors {isCurrent
									? 'border-border bg-foreground text-background shadow-neo-sm'
									: 'border-border bg-card text-muted-foreground'}"
							>
								{item.kicker}
							</button>
						{/each}
					</div>

					<!-- Main Column: Canvas + Meta -->
					<div class="min-w-0">
						<!-- Story Canvas -->
						<div
							class="neo-grid-bg grid min-h-[280px] items-center justify-items-center p-6 sm:min-h-[340px] sm:p-10 [&>*]:col-start-1 [&>*]:row-start-1"
						>
							{#key active}
								<div
									in:fly={{ y: 14, duration: reducedMotion ? 0 : 320, easing: cubicOut }}
									out:fade={{ duration: reducedMotion ? 0 : 150 }}
									class="flex w-full justify-center"
								>
									{#if activePrinciple.visual === 'performance'}
										<!-- 01 Performance Gauge -->
										<div class="flex w-full max-w-sm flex-wrap items-center justify-center gap-6">
											<div class="relative size-32 shrink-0">
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
														stroke="#4d7c0f"
														stroke-width="11"
														stroke-linecap="square"
														transform="rotate(-90 65 65)"
														class="craft-ring-fill"
													/>
												</svg>
												<div class="absolute inset-0 flex flex-col items-center justify-center">
													<span
														class="font-display text-4xl leading-none font-black text-foreground"
													>
														98
													</span>
													<span
														class="mt-0.5 font-mono text-[0.6875rem] font-bold text-muted-foreground uppercase"
													>
														score
													</span>
												</div>
											</div>
											<div class="min-w-[140px] flex-1 space-y-2.5">
												{#each PERF_METRICS as metric (metric.label)}
													<div
														class="flex items-center justify-between border-b-2 border-border pb-1"
													>
														<span class="font-mono text-xs font-bold text-muted-foreground">
															{metric.label}
														</span>
														<span class="font-display text-xl font-black text-foreground">
															{metric.value}
														</span>
													</div>
												{/each}
											</div>
										</div>
									{:else if activePrinciple.visual === 'a11y'}
										<!-- 02 Accessibility Checklist -->
										<ul class="w-full max-w-sm space-y-3">
											{#each A11Y_ITEMS as label, idx (label)}
												<li
													class="craft-stagger-item flex items-center gap-3"
													style:--delay={`${idx * 90}ms`}
												>
													<span
														class="flex size-7 shrink-0 items-center justify-center border-2 border-border bg-secondary text-secondary-foreground shadow-neo-sm"
													>
														<Check class="size-4 stroke-[2.5]" aria-hidden="true" />
													</span>
													<span class="font-display text-base font-bold text-foreground sm:text-lg">
														{label}
													</span>
												</li>
											{/each}
										</ul>
									{:else if activePrinciple.visual === 'motion'}
										<!-- 03 Motion Demo -->
										<div class="flex w-full max-w-sm flex-col items-center">
											<div
												class="craft-motion-dots flex h-24 items-end justify-center gap-2.5 sm:gap-3"
												data-paused={motionDemoPaused}
											>
												{#each MOTION_DOTS as dotIndex (dotIndex)}
													<span
														class="craft-motion-dot size-9 border-2 border-border bg-accent shadow-neo-sm sm:size-10"
														style:--delay={`${dotIndex * 110}ms`}
													></span>
												{/each}
											</div>
											<div class="mt-6 flex flex-wrap items-center justify-center gap-2.5">
												<span class="font-mono text-xs font-bold text-muted-foreground uppercase">
													easing
												</span>
												<span
													class="border-2 border-border bg-foreground px-3 py-1 font-mono text-xs font-bold text-background shadow-neo-sm"
												>
													spring(200, 18)
												</span>
												<button
													type="button"
													onclick={toggleMotionDemo}
													aria-label={motionDemoPaused ? 'Play motion demo' : 'Pause motion demo'}
													class="inline-flex size-8 items-center justify-center border-2 border-border bg-card text-foreground shadow-neo-sm transition-colors hover:bg-neo-surface-subtle focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
												>
													{#if motionDemoPaused}
														<Play class="size-3.5" aria-hidden="true" />
													{:else}
														<Pause class="size-3.5" aria-hidden="true" />
													{/if}
												</button>
											</div>
										</div>
									{:else}
										<!-- 04 Design System Tokens -->
										<div class="w-full max-w-sm">
											<div class="flex gap-2">
												{#each TOKEN_SWATCHES as swatchColor (swatchColor)}
													<span
														aria-hidden="true"
														class="h-9 flex-1 border-2 border-border shadow-neo-sm"
														style:background-color={swatchColor}
													></span>
												{/each}
											</div>
											<div class="mt-5 space-y-2.5">
												{#each TOKEN_SPACES as widthPx, idx (widthPx)}
													<div class="flex items-center gap-3">
														<span
															class="craft-token-bar h-3 origin-left border-2 border-border bg-primary"
															style:width={`${widthPx}px`}
															style:--delay={`${idx * 85}ms`}
														></span>
														<span class="font-mono text-xs font-bold text-muted-foreground">
															{widthPx}px
														</span>
													</div>
												{/each}
											</div>
										</div>
									{/if}
								</div>
							{/key}
						</div>

						<!-- Meta & Tags -->
						<div
							class="grid border-t-2 border-border bg-card p-6 sm:p-8 [&>*]:col-start-1 [&>*]:row-start-1"
						>
							{#key active}
								<div
									in:fly={{ y: 10, duration: reducedMotion ? 0 : 280, easing: cubicOut }}
									out:fade={{ duration: reducedMotion ? 0 : 120 }}
								>
									<div class="flex items-center gap-2">
										<ActiveIcon
											class="size-4 shrink-0"
											style={`color: ${activePrinciple.accent}`}
											aria-hidden="true"
										/>
										<span
											class="font-mono text-xs font-bold tracking-wider uppercase"
											style:color={activePrinciple.accent}
										>
											{activePrinciple.kicker}
										</span>
									</div>
									<h2
										class="mt-1.5 font-display text-2xl leading-tight font-black uppercase sm:text-3xl"
									>
										{activePrinciple.title}
									</h2>
									<p class="mt-1.5 font-mono text-xs text-muted-foreground sm:text-sm">
										{activePrinciple.caption}
									</p>
									<div class="mt-4 flex flex-wrap gap-2">
										{#each activePrinciple.tags as tag (tag)}
											<Badge variant="outline">{tag}</Badge>
										{/each}
									</div>
								</div>
							{/key}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Scroll-driven progress bar using CSS view-timeline when supported */
	.craft-section {
		view-timeline: --craft-scroll block;
	}

	@media (prefers-reduced-motion: no-preference) {
		@supports ((animation-timeline: scroll()) and (animation-range: 0% 100%)) {
			@keyframes craft-progress-grow {
				from {
					transform: scaleX(0);
				}
				to {
					transform: scaleX(1);
				}
			}

			.craft-progress {
				animation: craft-progress-grow auto linear both;
				animation-timeline: --craft-scroll;
				animation-range: contain 0% contain 100%;
			}
		}

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

		@keyframes craft-slide-in {
			from {
				opacity: 0;
				transform: translateX(-14px);
			}
			to {
				opacity: 1;
				transform: translateX(0);
			}
		}

		.craft-stagger-item {
			animation: craft-slide-in 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
			animation-delay: var(--delay, 0ms);
		}

		@keyframes craft-bar-grow {
			from {
				transform: scaleX(0);
			}
			to {
				transform: scaleX(1);
			}
		}

		.craft-token-bar {
			animation: craft-bar-grow 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
			animation-delay: var(--delay, 0ms);
		}

		@keyframes craft-dot-bounce {
			from {
				transform: translateY(0);
			}
			to {
				transform: translateY(-16px);
			}
		}

		.craft-motion-dot {
			animation: craft-dot-bounce 0.7s ease-in-out infinite alternate;
			animation-delay: var(--delay, 0ms);
		}

		.craft-motion-dots[data-paused='true'] .craft-motion-dot {
			animation-play-state: paused;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.craft-ring-fill {
			stroke-dasharray: 327;
			stroke-dashoffset: 6.5;
		}
	}
</style>
