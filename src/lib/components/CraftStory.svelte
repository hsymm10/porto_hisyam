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
	let canvasEl: HTMLElement | undefined = $state();
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
		if (!sectionEl) return;
		registerGsap();

		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = motionQuery.matches;
		const handleMotionChange = (event: MediaQueryListEvent) => {
			reducedMotion = event.matches;
		};
		motionQuery.addEventListener('change', handleMotionChange);

		supportsScrollTimeline = CSS.supports(
			'(animation-timeline: scroll()) and (animation-range: 0% 100%)'
		);

		const ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: sectionEl,
				start: 'top top',
				end: 'bottom bottom',
				onUpdate: (self) => {
					scrollProgress = self.progress;
					const nextActive = Math.min(
						PRINCIPLES.length - 1,
						Math.max(0, Math.floor(self.progress * PRINCIPLES.length))
					);
					if (nextActive !== active) {
						active = nextActive;
					}
				}
			});
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
					trigger: sectionEl,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		});

		return () => {
			motionQuery.removeEventListener('change', handleMotionChange);
			mm.revert();
			ctx.revert();
		};
	});

	$effect(() => {
		const currentActive = active;
		const container = canvasEl;
		if (reducedMotion || !container || currentActive < 0) return;

		registerGsap();
		const ctx = gsap.context(() => {
			// Animasi baris visual arsitektur
			const archRows = container.querySelectorAll('[data-craft-arch-row]');
			if (archRows.length) {
				gsap.from(archRows, {
					x: -18,
					opacity: 0,
					duration: 0.42,
					stagger: 0.1,
					ease: 'power2.out',
					clearProps: 'transform'
				});
			}

			// Animasi kartu visual UI/UX
			const uiuxCards = container.querySelectorAll('[data-craft-uiux-card]');
			if (uiuxCards.length) {
				gsap.from(uiuxCards, {
					y: 16,
					opacity: 0,
					duration: 0.45,
					stagger: 0.08,
					ease: 'power3.out',
					clearProps: 'transform'
				});
			}

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

			const perfRows = container.querySelectorAll('[data-craft-perf-row]');
			if (perfRows.length) {
				gsap.from(perfRows, {
					x: 18,
					opacity: 0,
					duration: 0.4,
					stagger: 0.08,
					ease: 'power2.out',
					clearProps: 'transform'
				});
			}

			const motionMeta = container.querySelector('[data-craft-motion-meta]');
			if (motionMeta) {
				gsap.from(motionMeta, {
					y: 12,
					opacity: 0,
					duration: 0.42,
					delay: 0.15,
					ease: 'power2.out',
					clearProps: 'transform'
				});
			}

			// Animasi baris visual task manajemen proyek
			const sprintRows = container.querySelectorAll('[data-craft-sprint-row]');
			if (sprintRows.length) {
				gsap.from(sprintRows, {
					x: 16,
					opacity: 0,
					duration: 0.4,
					stagger: 0.08,
					ease: 'power2.out',
					clearProps: 'transform'
				});
			}
		}, container);

		return () => ctx.revert();
	});
</script>

<section
	id="craft"
	bind:this={sectionEl}
	class="craft-section relative h-[440vh] w-full border-b-2 border-border bg-background"
>
	<div class="sticky top-16 flex min-h-[calc(100svh-4rem)] items-center py-8 sm:py-12">
		<div class="mx-auto w-full max-w-7xl px-6 sm:px-8">
			<div data-craft-header class="mb-5 flex flex-wrap items-center justify-between gap-4">
				<Badge variant="lime">{t[$currentLang].craft.badge}</Badge>
				<span data-craft-hint class="font-mono text-xs font-bold text-muted-foreground uppercase">
					{t[$currentLang].craft.scrollHint}
				</span>
			</div>

			<!-- Storybook Window (full max-w-7xl width + shadow-neo matching all sections) -->
			<div
				data-craft-window
				class="w-full overflow-hidden border-2 border-border bg-card shadow-neo"
			>
				<!-- Toolbar -->
				<div
					class="flex items-center gap-3 border-b-2 border-border bg-neo-surface-subtle px-5 py-3.5 sm:px-6"
				>
					<span class="flex gap-1.5" aria-hidden="true">
						<span class="size-3 rounded-full border-2 border-border bg-[#fe7a25]"></span>
						<span class="size-3 rounded-full border-2 border-border bg-[#e9e8ca]"></span>
						<span class="size-3 rounded-full border-2 border-border bg-[#006732]"></span>
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
							{t[$currentLang].craft.storiesLabel}
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
							bind:this={canvasEl}
							class="neo-grid-bg grid min-h-[280px] items-center justify-items-center p-6 sm:min-h-[340px] sm:p-10 [&>*]:col-start-1 [&>*]:row-start-1"
						>
							{#key active}
								<div
									in:fly={{ y: 14, duration: reducedMotion ? 0 : 320, easing: cubicOut }}
									out:fade={{ duration: reducedMotion ? 0 : 150 }}
									class="flex w-full justify-center"
								>
									{#if activePrinciple.visual === 'architecture'}
										<!-- 01 Arsitektur Web: Full Stack Pipeline -->
										<div class="w-full max-w-md space-y-3">
											{#each ARCH_PIPELINE as item (item.step)}
												<div
													data-craft-arch-row
													class="flex items-center gap-3.5 border-2 border-border bg-card p-3 shadow-neo-sm sm:gap-4 sm:p-3.5"
												>
													<span
														class="flex size-10 shrink-0 items-center justify-center border-2 border-border bg-secondary text-secondary-foreground"
													>
														<item.icon class="size-5 stroke-[2.2]" aria-hidden="true" />
													</span>
													<div class="min-w-0 flex-1">
														<div class="flex items-center gap-2">
															<span class="font-mono text-xs font-bold text-muted-foreground">
																#{item.step}
															</span>
															<span class="font-display text-sm font-bold uppercase sm:text-base">
																{item.label}
															</span>
														</div>
														<p class="truncate font-mono text-xs text-muted-foreground">
															{item.desc}
														</p>
													</div>
													<Badge variant="outline" class="hidden sm:inline-flex">{item.badge}</Badge
													>
												</div>
											{/each}
										</div>
									{:else if activePrinciple.visual === 'uiux'}
										<!-- 02 Desain UI/UX: Workflow Stages -->
										<div class="grid w-full max-w-md gap-3 sm:grid-cols-3">
											{#each UIUX_STAGES as stage (stage.no)}
												<div
													data-craft-uiux-card
													class="flex flex-col justify-between border-2 border-border bg-card p-3.5 shadow-neo-sm"
												>
													<div>
														<div class="flex items-center justify-between">
															<span class="font-mono text-xs font-bold text-accent">
																{t[$currentLang].craft.stageLabel}
																{stage.no}
															</span>
															<Badge variant="outline" class="text-[0.6875rem]">{stage.tag}</Badge>
														</div>
														<h3 class="mt-2 font-display text-sm leading-snug font-bold uppercase">
															{stage.name}
														</h3>
														<p
															class="mt-1 font-mono text-[0.6875rem] leading-relaxed text-muted-foreground"
														>
															{stage.desc}
														</p>
													</div>
												</div>
											{/each}
										</div>
									{:else if activePrinciple.visual === 'performance'}
										<!-- 03 Performa & Interaksi: Gauge + Motion Demo -->
										<div class="flex w-full max-w-md flex-col gap-6 sm:flex-row sm:items-center">
											<div class="relative mx-auto size-28 shrink-0 sm:size-32">
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
									{:else}
										<!-- 04 Manajemen Proyek: Sprint & Milestones -->
										<div class="w-full max-w-md space-y-2.5">
											{#each SPRINT_ITEMS as item (item.task)}
												<div
													data-craft-sprint-row
													class="flex items-center justify-between gap-3 border-2 border-border bg-card px-3.5 py-2.5 shadow-neo-sm"
												>
													<div class="flex min-w-0 items-center gap-2.5">
														<span
															class="flex size-6 shrink-0 items-center justify-center border-2 border-border bg-primary text-primary-foreground"
														>
															<Check class="size-3.5 stroke-[3]" aria-hidden="true" />
														</span>
														<span
															class="truncate font-display text-xs font-bold uppercase sm:text-sm"
														>
															{item.task}
														</span>
													</div>
													<div class="flex shrink-0 items-center gap-2">
														<span
															class="hidden font-mono text-[0.6875rem] text-muted-foreground sm:inline"
														>
															{item.owner}
														</span>
														<Badge
															variant={item.status === 'Completed' || item.status === 'Selesai'
																? 'lime'
																: 'outline'}
															class="text-[0.6875rem]"
														>
															{item.status}
														</Badge>
													</div>
												</div>
											{/each}
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
	}

	@media (prefers-reduced-motion: reduce) {
		.craft-ring-fill {
			stroke-dasharray: 327;
			stroke-dashoffset: 6.5;
		}
	}
</style>
