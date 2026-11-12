<script lang="ts">
	import lanyardBack from '#lib/assets/lanyard-back.svg';
	import lanyardFront from '#lib/assets/lanyard-front.svg';
	import CraftStory from '#lib/components/CraftStory.svelte';
	import Lanyard from '#lib/components/Lanyard.svelte';
	import { Badge } from '#lib/components/ui/badge/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import * as Card from '#lib/components/ui/card/index.js';
	import {
		PolaroidLineCarousel,
		type Slide
	} from '#lib/components/ui/polaroid-line-carousel/index.js';
	import { Separator } from '#lib/components/ui/separator/index.js';
	import { gsap, REDUCED_MOTION_QUERY, registerGsap, ScrollTrigger } from '#lib/gsap.js';
	import { tick } from 'svelte';
	import {
		siGit,
		siMongodb,
		siNodedotjs,
		siReact,
		siSvelte,
		siTailwindcss,
		siTypescript
	} from 'simple-icons';
	import {
		ArrowRight,
		ArrowUpRight,
		Braces,
		ChevronLeft,
		ChevronRight,
		Code2,
		Download,
		GitBranch,
		Globe,
		Mail,
		Moon,
		Pause,
		Play,
		Sun,
		Terminal
	} from '@lucide/svelte';

	let isDark = $state(false);
	let isMarqueePaused = $state(false);

	function toggleTheme() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
	}

	function toggleMarquee() {
		isMarqueePaused = !isMarqueePaused;
	}

	const skills = [
		{ name: 'React', icon: siReact },
		{ name: 'TypeScript', icon: siTypescript },
		{ name: 'Node.js', icon: siNodedotjs },
		{ name: 'Tailwind CSS', icon: siTailwindcss },
		{ name: 'MongoDB', icon: siMongodb },
		{ name: 'Git', icon: siGit },
		{ name: 'Svelte', icon: siSvelte }
	];

	const projects = [
		{
			id: 'weatherly',
			title: 'Weatherly',
			description: 'A weather app with real-time data, beautiful charts and forecasts.',
			tags: ['SvelteKit', 'TypeScript', 'API']
		},
		{
			id: 'neoui',
			title: 'NeoUI Kit',
			description:
				'Sistem desain berbasis shadcn-svelte dengan token warna kontras tinggi, sudut 0px, dan hard shadow.',
			tags: ['shadcn-svelte', 'Tailwind v4', 'Tokens']
		},
		{
			id: 'lanyard',
			title: '3D Pass Playground',
			description:
				'Kartu identitas 3D interaktif berbasis Three.js dengan simulasi fisika tali, drag, fling, dan flip.',
			tags: ['Three.js', 'WebGL', 'Physics']
		}
	];

	const certifications = [
		{ label: 'Cert 1', bgClass: 'bg-neo-surface-subtle text-neo-black' },
		{ label: 'Cert 2', bgClass: 'bg-[#dcdcdc] text-neo-black' },
		{ label: 'Cert 3', bgClass: 'bg-neo-surface-muted text-neo-black' }
	];

	const experiences = [
		{
			role: 'Senior Frontend Developer',
			company: 'TechNova Inc.',
			period: '2022 - Present',
			description:
				'Lead the frontend development of a high-traffic SaaS platform used by over 50,000 active users.'
		},
		{
			role: 'Web Developer',
			company: 'Creative Studio',
			period: '2019 - 2022',
			description:
				'Built interactive marketing websites and internal tools for various high-profile clients.'
		},
		{
			role: 'Junior Developer',
			company: 'Startup Hub',
			period: '2018 - 2019',
			description:
				'Assisted in building MVP applications for early-stage startups in rapid-iteration cycles.'
		}
	];

	const unsplashPhoto = (id: string) =>
		`https://images.unsplash.com/photo-${id}?q=80&w=1800&auto=format&fit=crop`;

	const polaroidSlides: Slide[] = [
		{
			image: unsplashPhoto('1506905925346-21bda4d32df4'),
			title: 'Above the Clouds',
			caption: 'Valais, Switzerland — sunrise at 3,100 m.',
			palette: 'dawn',
			seed: 3
		},
		{
			image: unsplashPhoto('1501785888041-af3ef285b470'),
			title: 'Glass Lake',
			caption: 'Lago di Braies, a rowboat at noon.',
			palette: 'alpine',
			seed: 8
		},
		{
			image: unsplashPhoto('1469474968028-56623f02e42e'),
			title: 'Gold Valley',
			caption: 'Late light pouring over the ridge.',
			palette: 'dusk',
			seed: 14
		},
		{
			image: unsplashPhoto('1464822759023-fed622ff2c3b'),
			title: 'Snow Line',
			caption: 'Pines, river flats and the high range.',
			palette: 'mist',
			seed: 21
		},
		{
			image: unsplashPhoto('1500534314209-a25ddb2bd429'),
			title: 'Blue Ridges',
			caption: 'Seven layers of haze before dusk.',
			palette: 'dawn',
			seed: 34
		},
		{
			image: unsplashPhoto('1433086966358-54859d0ed716'),
			title: 'Falls Bridge',
			caption: 'Multnomah Falls after the rain.',
			palette: 'alpine',
			seed: 55
		}
	];

	let pageRootEl: HTMLDivElement | undefined = $state();
	let projectCardWrapperEl: HTMLDivElement | undefined = $state();
	let activeSection = $state('');
	let activeProjectIndex = $state(0);
	const currentProject = $derived(projects[activeProjectIndex]);

	async function animateProjectCard() {
		await tick();
		if (!projectCardWrapperEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}
		registerGsap();
		gsap.fromTo(
			projectCardWrapperEl,
			{ opacity: 0, y: 14, scale: 0.985 },
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.34,
				ease: 'power2.out',
				clearProps: 'transform'
			}
		);
	}

	function selectProject(index: number) {
		if (index === activeProjectIndex) return;
		activeProjectIndex = index;
		animateProjectCard();
	}

	function prevProject() {
		activeProjectIndex = (activeProjectIndex - 1 + projects.length) % projects.length;
		animateProjectCard();
	}

	function nextProject() {
		activeProjectIndex = (activeProjectIndex + 1) % projects.length;
		animateProjectCard();
	}

	const NAV_LINKS = [
		{ id: 'skills', label: 'Skills' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'craft', label: 'Craft' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'gallery', label: 'Gallery' },
		{ id: 'contact', label: 'Contact' }
	];

	$effect(() => {
		const root = pageRootEl;
		if (!root) return;
		registerGsap();

		const navCtx = gsap.context(() => {
			for (const { id } of NAV_LINKS) {
				const target = document.getElementById(id);
				if (!target) continue;
				ScrollTrigger.create({
					trigger: target,
					start: 'top 45%',
					end: 'bottom 45%',
					onEnter: () => (activeSection = id),
					onEnterBack: () => (activeSection = id)
				});
			}
		}, root);

		const mm = gsap.matchMedia(root);
		mm.add(REDUCED_MOTION_QUERY, () => {
			// Global reading progress bar across the full page
			gsap.fromTo(
				'[data-scroll-progress]',
				{ scaleX: 0 },
				{
					scaleX: 1,
					ease: 'none',
					scrollTrigger: {
						trigger: root,
						start: 'top top',
						end: 'bottom bottom',
						scrub: true
					}
				}
			);

			// 1. Hero entrance choreography
			const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
			heroTl
				.from('[data-hero-stagger]', {
					y: 24,
					opacity: 0,
					duration: 0.6,
					stagger: 0.08,
					clearProps: 'transform'
				})
				.from(
					'[data-hero-lanyard]',
					{
						y: 26,
						scale: 0.95,
						opacity: 0,
						duration: 0.7,
						clearProps: 'transform'
					},
					'-=0.45'
				)
				.from(
					'[data-hero-sticker]',
					{
						scale: 0.45,
						opacity: 0,
						duration: 0.52,
						stagger: 0.07,
						ease: 'back.out(1.7)',
						clearProps: 'transform'
					},
					'-=0.45'
				);

			// Idle subtle float on inner sticker visuals
			root.querySelectorAll<HTMLElement>('[data-hero-sticker-inner]').forEach((el, idx) => {
				gsap.to(el, {
					y: -6,
					duration: 2.1 + idx * 0.28,
					repeat: -1,
					yoyo: true,
					ease: 'sine.inOut',
					delay: idx * 0.25
				});
			});

			// Hero scroll-out parallax depth
			root.querySelectorAll<HTMLElement>('[data-hero-sticker]').forEach((el) => {
				const py = Number(el.dataset.parallaxY ?? -28);
				const prot = Number(el.dataset.parallaxRot ?? 0);
				gsap.to(el, {
					y: py,
					rotation: prot,
					ease: 'none',
					scrollTrigger: {
						trigger: '[data-hero-section]',
						start: 'top top',
						end: 'bottom top',
						scrub: true
					}
				});
			});

			gsap.to('[data-hero-copy]', {
				y: -26,
				ease: 'none',
				scrollTrigger: {
					trigger: '[data-hero-section]',
					start: 'top top',
					end: 'bottom top',
					scrub: true
				}
			});

			// 2. Skills marquee band reveal + scroll arrow scrub
			const skillsTl = gsap.timeline({
				scrollTrigger: {
					trigger: '#skills',
					start: 'top 88%',
					once: true
				}
			});
			skillsTl
				.from('[data-skills-label]', {
					x: -28,
					opacity: 0,
					duration: 0.5,
					ease: 'power3.out',
					clearProps: 'transform'
				})
				.from(
					['[data-skills-track]', '[data-skills-toggle]'],
					{
						y: 16,
						opacity: 0,
						duration: 0.45,
						stagger: 0.08,
						ease: 'power2.out',
						clearProps: 'transform'
					},
					'-=0.3'
				);

			gsap.to('[data-skills-arrow]', {
				x: 8,
				ease: 'none',
				scrollTrigger: {
					trigger: '#skills',
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			});

			// 3. Featured Projects + Certifications reveal
			const projectsTl = gsap.timeline({
				scrollTrigger: {
					trigger: '#projects',
					start: 'top 80%',
					once: true
				}
			});
			projectsTl
				.from('[data-projects-panel]', {
					y: 34,
					opacity: 0,
					duration: 0.65,
					ease: 'power3.out',
					clearProps: 'transform'
				})
				.from(
					'[data-certs-aside]',
					{
						y: 40,
						opacity: 0,
						duration: 0.65,
						ease: 'power3.out',
						clearProps: 'transform'
					},
					'-=0.45'
				)
				.from(
					'[data-cert-card]',
					{
						y: 18,
						scale: 0.96,
						opacity: 0,
						duration: 0.42,
						stagger: 0.1,
						ease: 'back.out(1.4)',
						clearProps: 'transform'
					},
					'-=0.35'
				);

			// 4. Experience timeline & Call To Action scrollytelling
			const expTl = gsap.timeline({
				scrollTrigger: {
					trigger: '#experience',
					start: 'top 78%',
					once: true
				}
			});
			expTl
				.from('[data-exp-sidebar]', {
					x: -24,
					opacity: 0,
					duration: 0.5,
					ease: 'power3.out',
					clearProps: 'transform'
				})
				.from(
					'[data-exp-line]',
					{
						scaleY: 0,
						transformOrigin: 'top center',
						duration: 0.75,
						ease: 'power2.out'
					},
					'-=0.25'
				)
				.from(
					'[data-exp-dot]',
					{
						scale: 0,
						duration: 0.35,
						stagger: 0.16,
						ease: 'back.out(2)',
						clearProps: 'transform'
					},
					'-=0.65'
				)
				.from(
					'[data-exp-item]',
					{
						x: -18,
						opacity: 0,
						duration: 0.48,
						stagger: 0.16,
						ease: 'power2.out',
						clearProps: 'transform'
					},
					'-=0.68'
				)
				.from(
					'[data-exp-resume]',
					{
						y: 16,
						opacity: 0,
						duration: 0.42,
						ease: 'power2.out',
						clearProps: 'transform'
					},
					'-=0.2'
				)
				.from(
					'[data-cta-card]',
					{
						y: 32,
						opacity: 0,
						duration: 0.6,
						ease: 'power3.out',
						clearProps: 'transform'
					},
					0.1
				)
				.from(
					'[data-cta-stagger]',
					{
						y: 18,
						opacity: 0,
						duration: 0.45,
						stagger: 0.1,
						ease: 'power2.out',
						clearProps: 'transform'
					},
					0.28
				);

			// Starburst rotates smoothly as user scrolls through Experience/CTA
			gsap.to('[data-cta-starburst]', {
				rotation: 135,
				ease: 'none',
				scrollTrigger: {
					trigger: '#experience',
					start: 'top bottom',
					end: 'bottom top',
					scrub: 0.5
				}
			});

			// 5. Polaroid Gallery section reveal
			const galleryTl = gsap.timeline({
				scrollTrigger: {
					trigger: '#gallery',
					start: 'top 82%',
					once: true
				}
			});
			galleryTl
				.from('[data-gallery-header]', {
					y: 24,
					opacity: 0,
					duration: 0.5,
					ease: 'power3.out',
					clearProps: 'transform'
				})
				.from(
					'[data-gallery-stage]',
					{
						y: 30,
						opacity: 0,
						duration: 0.6,
						ease: 'power3.out',
						clearProps: 'transform'
					},
					'-=0.3'
				);

			// 6. Footer reveal
			gsap.from('[data-footer-inner]', {
				y: 16,
				opacity: 0,
				duration: 0.48,
				ease: 'power2.out',
				clearProps: 'transform',
				scrollTrigger: {
					trigger: '[data-footer]',
					start: 'top 96%',
					once: true
				}
			});
		});

		return () => {
			mm.revert();
			navCtx.revert();
		};
	});
</script>

<svelte:head>
	<title>PORTO.DEV — SvelteKit × Neobrutalism UI</title>
</svelte:head>

<div id="top" bind:this={pageRootEl} class="flex min-h-screen w-full flex-col bg-background">
	<!-- Full-Screen Sticky Header with max-w-7xl centered content -->
	<header class="sticky top-0 z-40 w-full border-b-2 border-border bg-card">
		<div
			class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3.5 sm:px-8"
		>
			<a href="#top" class="inline-flex items-center">
				<Badge variant="lime" class="px-3 py-1.5 text-xs">
					<Code2 class="size-4" />
					PORTO.DEV
				</Badge>
			</a>

			<nav
				aria-label="Primary"
				class="hidden items-center gap-7 font-mono text-xs font-bold tracking-wider uppercase md:flex"
			>
				{#each NAV_LINKS as item (item.id)}
					<a
						href={`#${item.id}`}
						class="underline-offset-4 transition-colors hover:underline {activeSection === item.id
							? 'text-secondary underline decoration-2'
							: ''}"
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<div class="flex items-center gap-2.5">
				<Button
					variant="outline"
					size="icon"
					onclick={toggleTheme}
					aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
				>
					{#if isDark}
						<Sun class="size-4" />
					{:else}
						<Moon class="size-4" />
					{/if}
				</Button>
				<Button href="#contact" variant="secondary">
					Contact Me
					<ArrowRight class="size-3.5" />
				</Button>
			</div>
		</div>
		<!-- Global Scrollytelling Progress Indicator -->
		<div
			aria-hidden="true"
			class="h-1 w-full overflow-hidden border-t-2 border-border bg-neo-surface-subtle motion-reduce:hidden"
		>
			<div data-scroll-progress class="h-full w-full origin-left scale-x-0 bg-secondary"></div>
		</div>
	</header>

	<main class="w-full flex-1">
		<!-- Full-Screen Hero Section -->
		<section
			data-hero-section
			class="neo-grid-bg relative w-full overflow-x-clip border-b-2 border-border"
		>
			<div
				class="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-6 pt-5 pb-10 sm:px-8 sm:pt-7 sm:pb-12 lg:grid-cols-12 lg:gap-10"
			>
				<!-- Floating Tech Sticker: Tilted Svelte Square (Top-Center, Desktop) -->
				<div
					aria-hidden="true"
					data-hero-sticker
					data-parallax-y="-42"
					data-parallax-rot="-16"
					class="pointer-events-none absolute top-4 left-[53%] z-20 hidden -translate-x-1/2 -rotate-12 lg:flex"
				>
					<div
						data-hero-sticker-inner
						class="flex size-13 items-center justify-center rounded-xl border-2 border-neo-black bg-secondary text-neo-white shadow-neo"
					>
						<svg viewBox="0 0 24 24" class="size-7 fill-current">
							<path d={siSvelte.path} />
						</svg>
					</div>
				</div>

				<!-- Floating Dev Sticker: Pink Circular Braces Stamp (Bottom-Left Open Space) -->
				<div
					aria-hidden="true"
					data-hero-sticker
					data-parallax-y="-22"
					data-parallax-rot="14"
					class="pointer-events-none absolute bottom-6 left-[36%] z-20 hidden -rotate-12 lg:flex"
				>
					<div
						data-hero-sticker-inner
						class="flex size-13 items-center justify-center rounded-full border-2 border-neo-black bg-accent text-neo-black shadow-neo"
					>
						<Braces class="size-6 stroke-[2.25]" />
					</div>
				</div>

				<!-- Left Intro Content -->
				<div data-hero-copy class="relative z-10 space-y-6 lg:col-span-7">
					<div class="space-y-4">
						<div data-hero-stagger>
							<Badge variant="default">Hey, I'm Hisyam — Software Developer</Badge>
						</div>

						<h1
							data-hero-stagger
							class="font-display text-5xl leading-[0.95] font-black tracking-tight uppercase sm:text-6xl lg:text-7xl"
						>
							Software<br />Developer
						</h1>

						<p
							data-hero-stagger
							class="max-w-xl font-mono text-sm leading-relaxed text-muted-foreground sm:text-base"
						>
							Saya membangun aplikasi web yang cepat, skalabel, dan berkarakter dengan SvelteKit,
							Tailwind CSS v4, dan komponen shadcn-svelte bergaya Neobrutalism.
						</p>
					</div>

					<div data-hero-stagger class="flex flex-wrap items-center gap-3.5">
						<Button href="#projects" size="lg" variant="default">
							View My Work
							<ArrowUpRight class="size-4" />
						</Button>
						<Button href="#contact" size="lg" variant="outline">
							Download Resume
							<Download class="size-4" />
						</Button>
					</div>

					<div data-hero-stagger class="space-y-2.5 pt-1">
						<p class="font-mono text-xs font-bold tracking-wider uppercase">Connect With Me</p>
						<div class="flex items-center gap-2.5">
							<Button variant="outline" size="icon" aria-label="Terminal">
								<Terminal class="size-4" />
							</Button>
							<Button variant="outline" size="icon" aria-label="Website">
								<Globe class="size-4" />
							</Button>
							<Button variant="outline" size="icon" aria-label="Email">
								<Mail class="size-4" />
							</Button>
						</div>
					</div>
				</div>

				<!-- Right 3D Lanyard Stage (bounded overflow-hidden + outer floating badges) -->
				<div class="relative lg:col-span-5">
					<!-- Floating Cursor + "Hisyam" Pill Badge (Top-Right) -->
					<div
						aria-hidden="true"
						data-hero-sticker
						data-parallax-y="-48"
						data-parallax-rot="-4"
						class="pointer-events-none absolute -top-4 right-2 z-20 flex items-end gap-1 sm:-top-5 sm:-right-3"
					>
						<div data-hero-sticker-inner class="flex items-end gap-1">
							<svg
								viewBox="0 0 24 24"
								class="mb-0.5 size-5 shrink-0 drop-shadow-[2px_2px_0px_#0d0d0d]"
							>
								<polygon
									points="3,3 21,10 13,13 10,21"
									fill="var(--neo-lime)"
									stroke="#0d0d0d"
									stroke-width="2.2"
									stroke-linejoin="round"
								/>
							</svg>
							<div
								class="rounded-full border-2 border-neo-black bg-secondary px-4 py-1 font-display text-sm font-black tracking-tight text-neo-white shadow-neo sm:text-base"
							>
								Hisyam
							</div>
						</div>
					</div>

					<!-- Floating Terminal Speech Bubble (Upper-Left Edge of Lanyard) -->
					<div
						aria-hidden="true"
						data-hero-sticker
						data-parallax-y="-34"
						data-parallax-rot="8"
						class="pointer-events-none absolute top-10 -left-3 z-20 hidden -rotate-6 sm:-left-6 sm:flex"
					>
						<div
							data-hero-sticker-inner
							class="relative flex size-12 items-center justify-center rounded-xl border-2 border-neo-black bg-primary text-neo-black shadow-neo sm:size-13"
						>
							<Terminal class="size-6 stroke-[2.25]" />
							<span
								class="absolute -bottom-1.5 left-3 size-3 rotate-45 border-r-2 border-b-2 border-neo-black bg-primary"
							></span>
						</div>
					</div>

					<!-- Floating Git Branch Circular Stamp (Lower-Right Edge of Lanyard) -->
					<div
						aria-hidden="true"
						data-hero-sticker
						data-parallax-y="-20"
						data-parallax-rot="-14"
						class="pointer-events-none absolute -right-3 bottom-20 z-20 hidden rotate-12 sm:-right-5 sm:flex"
					>
						<div
							data-hero-sticker-inner
							class="flex size-12 items-center justify-center rounded-full border-2 border-neo-black bg-neo-surface text-neo-black shadow-neo sm:size-13"
						>
							<GitBranch class="size-6 stroke-[2.25]" />
						</div>
					</div>

					<div
						data-hero-lanyard
						class="relative h-[400px] w-full min-w-0 overflow-hidden border-2 border-border bg-accent shadow-neo-lg sm:h-[450px] lg:h-[480px]"
					>
						<div class="absolute inset-0 h-full w-full overflow-hidden">
							<Lanyard
								frontImage={lanyardFront}
								backImage={lanyardBack}
								cardColor="#ffffff"
								strapColor="#0d0d0d"
								finish="glossy"
								metal="silver"
								cornerRadius={0.08}
								size={0.56}
								strapLength={0.38}
								strapWidth={0.62}
								breeze={0.45}
								interactive={true}
								intro={true}
							/>
						</div>

						<div class="pointer-events-none absolute right-4 bottom-4 z-10">
							<Badge variant="lime">Drag &bull; Click to Flip</Badge>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Full-Screen Skills Marquee Band (max-w-7xl centered) -->
		<section
			id="skills"
			aria-label="Skills"
			class="w-full border-b-2 border-border bg-neo-surface-subtle"
		>
			<div class="mx-auto flex w-full max-w-7xl items-stretch px-6 sm:px-8">
				<!-- Left Violet SKILLS -> Label Block -->
				<div
					data-skills-label
					class="flex shrink-0 flex-col justify-center gap-1.5 border-x-2 border-border bg-secondary px-6 py-5 text-secondary-foreground sm:min-w-44 sm:px-8 sm:py-6"
				>
					<span class="font-display text-base font-black tracking-wider uppercase sm:text-lg">
						Skills
					</span>
					<span data-skills-arrow class="inline-flex">
						<ArrowRight class="size-4" aria-hidden="true" />
					</span>
				</div>

				<!-- Infinite Tech Stack Marquee -->
				<div
					data-skills-track
					class="neo-marquee flex min-w-0 flex-1 items-center overflow-hidden"
					data-paused={isMarqueePaused}
				>
					<div class="neo-marquee-track">
						<ul class="flex items-center">
							{#each [...skills, ...skills] as skill, index (`a-${index}-${skill.name}`)}
								<li
									aria-hidden={index >= skills.length ? 'true' : undefined}
									class="flex shrink-0 flex-col items-center justify-center gap-2 px-8 py-4 sm:px-12"
								>
									<svg
										viewBox="0 0 24 24"
										class="size-8 fill-current text-foreground"
										aria-hidden="true"
									>
										<path d={skill.icon.path} />
									</svg>
									<span
										class="font-mono text-[0.6875rem] font-semibold whitespace-nowrap text-foreground"
									>
										{skill.name}
									</span>
								</li>
							{/each}
						</ul>
						<div class="flex items-center" aria-hidden="true">
							{#each [...skills, ...skills] as skill, index (`b-${index}-${skill.name}`)}
								<div
									class="flex shrink-0 flex-col items-center justify-center gap-2 px-8 py-4 sm:px-12"
								>
									<svg
										viewBox="0 0 24 24"
										class="size-8 fill-current text-foreground"
										aria-hidden="true"
									>
										<path d={skill.icon.path} />
									</svg>
									<span
										class="font-mono text-[0.6875rem] font-semibold whitespace-nowrap text-foreground"
									>
										{skill.name}
									</span>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<!-- Accessible Pause/Play Toggle -->
				<button
					type="button"
					data-skills-toggle
					onclick={toggleMarquee}
					aria-label={isMarqueePaused ? 'Play skills marquee' : 'Pause skills marquee'}
					class="flex shrink-0 items-center justify-center border-x-2 border-border bg-card px-3.5 text-foreground transition-colors hover:bg-neo-surface-subtle focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				>
					{#if isMarqueePaused}
						<Play class="size-4" aria-hidden="true" />
					{:else}
						<Pause class="size-4" aria-hidden="true" />
					{/if}
				</button>
			</div>
		</section>

		<!-- Full-Screen Featured Projects (Carousel) + Certifications Section -->
		<section id="projects" class="w-full border-b-2 border-border bg-background py-16 sm:py-20">
			<div class="mx-auto grid w-full max-w-7xl items-stretch gap-8 px-6 sm:px-8 lg:grid-cols-12">
				<!-- Left: Featured Projects (1 item at a time with Prev/Next) -->
				<div
					data-projects-panel
					class="flex flex-col justify-between gap-6 border-2 border-border bg-card p-6 shadow-neo sm:p-8 lg:col-span-8"
				>
					<div class="flex flex-wrap items-start justify-between gap-4">
						<div class="space-y-3">
							<h2 class="font-display text-2xl font-black tracking-tight uppercase sm:text-3xl">
								Featured Projects
							</h2>
							<Button href="#projects" variant="outline" size="sm">
								View All Projects
								<ArrowRight class="size-3.5" />
							</Button>
						</div>

						<div class="flex items-center gap-2">
							<Button
								variant="accent"
								size="icon-sm"
								onclick={prevProject}
								aria-label="Previous project"
							>
								<ChevronLeft class="size-4" />
							</Button>
							<Button
								variant="accent"
								size="icon-sm"
								onclick={nextProject}
								aria-label="Next project"
							>
								<ChevronRight class="size-4" />
							</Button>
						</div>
					</div>

					<div bind:this={projectCardWrapperEl} class="flex flex-1 flex-col">
						<Card.Root class="flex-1 justify-between">
							<div class="border-b-2 border-border bg-accent p-4">
								<div
									class="flex h-52 items-center justify-center overflow-hidden border-2 border-border bg-[#f7f3ea] sm:h-64"
								>
									{#if currentProject.id === 'weatherly'}
										<svg
											viewBox="0 0 480 240"
											class="h-full w-full object-cover"
											aria-label="Weatherly preview illustration"
										>
											<rect width="480" height="240" fill="#f7f3ea" />
											<circle
												cx="145"
												cy="70"
												r="58"
												fill="#f97316"
												stroke="#0d0d0d"
												stroke-width="7"
											/>
											<path
												d="M 80 185 C 62 185 50 170 50 152 C 50 132 67 118 88 120 C 96 90 124 72 156 76 C 185 78 206 98 214 124 C 238 122 258 140 258 164 C 258 178 246 185 230 185 Z"
												fill="#60a5fa"
												stroke="#0d0d0d"
												stroke-width="7"
												stroke-linejoin="round"
											/>
											<rect
												x="266"
												y="148"
												width="184"
												height="72"
												fill="#ffffff"
												stroke="#0d0d0d"
												stroke-width="7"
											/>
											<text
												x="358"
												y="202"
												text-anchor="middle"
												fill="#0d0d0d"
												font-family="sans-serif"
												font-size="48"
												font-weight="900"
											>
												24°C
											</text>
										</svg>
									{:else if currentProject.id === 'neoui'}
										<div class="flex flex-col items-center gap-3 p-6 text-center">
											<div class="flex items-center gap-2">
												<span class="size-8 border-2 border-border bg-primary shadow-neo-sm"></span>
												<span class="size-8 border-2 border-border bg-secondary shadow-neo-sm"
												></span>
												<span class="size-8 border-2 border-border bg-accent shadow-neo-sm"></span>
											</div>
											<p class="font-display text-2xl font-black text-neo-black uppercase">
												NeoUI Design System
											</p>
										</div>
									{:else}
										<div class="flex flex-col items-center gap-3 p-6 text-center">
											<div
												class="border-2 border-border bg-secondary px-5 py-3 font-mono text-sm font-bold text-secondary-foreground shadow-neo"
											>
												THREE.JS × VERLET PHYSICS
											</div>
											<p class="font-mono text-xs font-bold text-neo-black uppercase">
												Interactive Drag • Fling • Flip
											</p>
										</div>
									{/if}
								</div>
							</div>

							<Card.Header>
								<Card.Title>{currentProject.title}</Card.Title>
								<Card.Description>{currentProject.description}</Card.Description>
							</Card.Header>

							<Card.Content class="space-y-4">
								<div class="flex flex-wrap gap-2">
									{#each currentProject.tags as tag (tag)}
										<Badge variant="outline">{tag}</Badge>
									{/each}
								</div>
								<Separator />
							</Card.Content>

							<Card.Footer>
								<Button variant="outline" size="sm">
									View Details
									<ArrowRight class="size-3.5" />
								</Button>
							</Card.Footer>
						</Card.Root>
					</div>

					<!-- Carousel Pagination Dots -->
					<div class="flex items-center justify-center gap-2.5 pt-1">
						{#each projects as project, i (project.id)}
							<button
								type="button"
								onclick={() => selectProject(i)}
								aria-label={`Show project ${project.title}`}
								aria-current={activeProjectIndex === i ? 'true' : undefined}
								class="size-3 rounded-full border-2 border-border transition-colors {activeProjectIndex ===
								i
									? 'bg-foreground'
									: 'bg-card hover:bg-neo-surface-subtle'}"
							></button>
						{/each}
					</div>
				</div>

				<!-- Right: Certifications Lime Panel -->
				<aside
					id="certifications"
					data-certs-aside
					class="flex flex-col justify-between gap-5 border-2 border-border bg-primary p-6 text-primary-foreground shadow-neo sm:p-8 lg:col-span-4"
				>
					<h2 class="font-display text-2xl font-black tracking-tight uppercase sm:text-3xl">
						Certifications
					</h2>

					<div class="flex flex-1 flex-col justify-between gap-4">
						{#each certifications as cert (cert.label)}
							<div
								data-cert-card
								class="flex min-h-24 flex-1 items-center justify-center border-2 border-border px-4 py-6 font-display text-xl font-bold shadow-neo-sm {cert.bgClass}"
							>
								{cert.label}
							</div>
						{/each}
					</div>

					<Button variant="outline" class="w-full justify-between">
						<span>View All Certifications</span>
						<ArrowRight class="size-4" />
					</Button>
				</aside>
			</div>
		</section>

		<!-- Sticky Scrollytelling Section: How I Build · The Craft -->
		<CraftStory />

		<!-- Full-Screen Experience (Left Pink + Timeline) & Call To Action (Right Violet Grid) -->
		<section id="experience" class="w-full border-b-2 border-border bg-background py-16 sm:py-20">
			<div class="mx-auto grid w-full max-w-7xl items-stretch gap-8 px-6 sm:px-8 lg:grid-cols-12">
				<!-- Left: Experience Panel (Pink label column + White timeline) -->
				<div
					class="flex flex-col overflow-hidden border-2 border-border bg-card shadow-neo sm:flex-row lg:col-span-8"
				>
					<!-- Pink EXPERIENCE Sidebar -->
					<div
						data-exp-sidebar
						class="flex shrink-0 flex-col justify-center gap-2 border-b-2 border-border bg-accent px-6 py-5 text-neo-black sm:w-44 sm:border-r-2 sm:border-b-0 sm:px-7 sm:py-8 md:w-48"
					>
						<h2 class="font-display text-xl font-black tracking-tight uppercase sm:text-2xl">
							Experience
						</h2>
						<ArrowRight class="size-5" aria-hidden="true" />
					</div>

					<!-- White Timeline & View Full Resume CTA -->
					<div class="flex flex-1 flex-col justify-between p-6 sm:p-8 lg:p-10">
						<div class="relative">
							<div
								aria-hidden="true"
								data-exp-line
								class="absolute top-2 bottom-2 left-[5px] w-0.5 bg-border"
							></div>
							<ol class="space-y-8 pl-8">
								{#each experiences as exp (exp.role + exp.period)}
									<li data-exp-item class="relative">
										<span
											aria-hidden="true"
											data-exp-dot
											class="absolute top-1.5 -left-8 size-3 rounded-full bg-foreground"
										></span>
										<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
											<h3
												class="font-display text-sm font-black tracking-wide uppercase sm:text-base"
											>
												{exp.role}<span class="mx-1.5 text-secondary" aria-hidden="true"
													>&bull;</span
												>{exp.company}
											</h3>
											<span
												class="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase"
											>
												{exp.period}
											</span>
										</div>
										<p
											class="mt-2 font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm"
										>
											{exp.description}
										</p>
									</li>
								{/each}
							</ol>
						</div>

						<div data-exp-resume class="mt-8 pl-8">
							<Button
								href="#contact"
								variant="outline"
								size="lg"
								class="border-border bg-card text-secondary shadow-neo hover:bg-neo-surface-subtle"
							>
								View Full Resume
								<ArrowRight class="size-4" />
							</Button>
						</div>
					</div>
				</div>

				<!-- Right: Violet Grid Call To Action Card -->
				<aside
					id="contact"
					data-cta-card
					class="neo-grid-violet-bg relative flex min-h-80 flex-col justify-center overflow-hidden border-2 border-border p-8 text-neo-white shadow-neo sm:p-10 lg:col-span-4"
				>
					<div class="relative z-10 max-w-xs space-y-6">
						<h2
							data-cta-stagger
							class="font-display text-2xl leading-[1.08] font-black tracking-tight uppercase sm:text-3xl"
						>
							Let's Build<br />Something<br />Amazing<br />Together.
						</h2>
						<div data-cta-stagger>
							<Button
								href="mailto:hello@porto.dev"
								variant="outline"
								size="lg"
								class="border-neo-black bg-neo-surface text-neo-black shadow-neo hover:bg-neo-surface-subtle"
							>
								Get In Touch
								<ArrowRight class="size-4" />
							</Button>
						</div>
					</div>

					<!-- Bottom-Right Pink Starburst Accent -->
					<svg
						viewBox="0 0 120 120"
						aria-hidden="true"
						data-cta-starburst
						class="pointer-events-none absolute -right-10 -bottom-10 size-36 sm:size-40"
					>
						<polygon
							points="114,60 94.8,69.3 106.8,87 85.5,85.5 87,106.8 69.3,94.8 60,114 50.7,94.8 33,106.8 34.5,85.5 13.2,87 25.2,69.3 6,60 25.2,50.7 13.2,33 34.5,34.5 33,13.2 50.7,25.2 60,6 69.3,25.2 87,13.2 85.5,34.5 106.8,33 94.8,50.7"
							fill="#ff6e9f"
							stroke="#0d0d0d"
							stroke-width="4"
							stroke-linejoin="miter"
						/>
					</svg>
				</aside>
			</div>
		</section>

		<!-- Polaroid Line Carousel Section (Placed After Experience) -->
		<section id="gallery" class="w-full border-b-2 border-border bg-card py-16 sm:py-20">
			<div class="mx-auto w-full max-w-7xl space-y-6 px-6 sm:px-8">
				<div data-gallery-header class="flex flex-wrap items-end justify-between gap-4">
					<div class="space-y-2.5">
						<Badge variant="pink">Snapshots &bull; Off the Clock</Badge>
						<h2 class="font-display text-2xl font-black tracking-tight uppercase sm:text-3xl">
							Field Notes on a Line
						</h2>
					</div>
				</div>

				<div
					data-gallery-stage
					class="overflow-hidden border-2 border-border bg-neo-surface-subtle shadow-neo"
				>
					<PolaroidLineCarousel
						slides={polaroidSlides}
						height="520px"
						cardWidth={250}
						sag={42}
						ariaLabel="Polaroid photography gallery"
					/>
				</div>
			</div>
		</section>
	</main>

	<!-- Full-Screen Footer with max-w-7xl centered content -->
	<footer data-footer class="w-full bg-card py-6">
		<div
			data-footer-inner
			class="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 sm:px-8"
		>
			<Badge variant="lime">
				<Code2 class="size-3" />
				PORTO.DEV
			</Badge>
			<p class="font-mono text-xs text-muted-foreground">
				Neobrutalism Portfolio UI — SvelteKit &amp; shadcn-svelte
			</p>
			<div class="flex items-center gap-2">
				<Button variant="outline" size="icon-sm" aria-label="Terminal">
					<Terminal class="size-3.5" />
				</Button>
				<Button variant="outline" size="icon-sm" aria-label="Email">
					<Mail class="size-3.5" />
				</Button>
			</div>
		</div>
	</footer>
</div>
