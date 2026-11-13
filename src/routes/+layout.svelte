<script lang="ts">
	import 'lenis/dist/lenis.css';
	import './layout.css';
	import Lenis from 'lenis';
	import favicon from '#lib/assets/favicon.svg';
	import { gsap, registerGsap, ScrollTrigger } from '#lib/gsap.js';
	import { setLenisInstance } from '#lib/lenis.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const personSchema = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Hisyam Sayyid Alzam',
		alternateName: ['hszamm', 'hsymm10'],
		url: 'https://hisyamsayyid.my.id/',
		jobTitle: 'Full Stack Web Developer & UI/UX Designer',
		sameAs: [
			'https://github.com/hsymm10',
			'https://gitlab.com/hszamm',
			'https://instagram.com/hszamm'
		]
	});

	$effect(() => {
		registerGsap();

		const lenis = new Lenis({
			autoRaf: false,
			lerp: 0.1,
			smoothWheel: true,
			anchors: {
				offset: -64
			},
			respectReducedMotion: true
		});

		setLenisInstance(lenis);
		lenis.on('scroll', ScrollTrigger.update);

		const onTick = (time: number) => {
			lenis.raf(time * 1000);
		};

		gsap.ticker.add(onTick);
		gsap.ticker.lagSmoothing(0);

		let isDisposed = false;
		document.fonts?.ready.then(() => {
			if (!isDisposed) ScrollTrigger.refresh();
		});

		return () => {
			isDisposed = true;
			gsap.ticker.remove(onTick);
			lenis.off('scroll', ScrollTrigger.update);
			setLenisInstance(null);
			lenis.destroy();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<!-- Primary Meta Tags -->
	<title>Hisyam Sayyid Alzam | Web Developer & UI/UX Designer Portfolio</title>
	<meta name="title" content="Hisyam Sayyid Alzam | Web Developer & UI/UX Designer Portfolio" />
	<meta
		name="description"
		content="Portofolio resmi Hisyam Sayyid Alzam. Full Stack Web Developer & UI/UX Designer spesialisasi SvelteKit, Laravel, Nuxt, dan Modern Web App."
	/>
	<meta
		name="keywords"
		content="Hisyam Sayyid Alzam, hszamm, hsymm10, Web Developer, UI UX Designer, SvelteKit, Laravel, Portfolio"
	/>
	<meta name="author" content="Hisyam Sayyid Alzam" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://hisyamsayyid.my.id/" />

	<!-- Open Graph / Facebook / LinkedIn -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://hisyamsayyid.my.id/" />
	<meta
		property="og:title"
		content="Hisyam Sayyid Alzam | Web Developer & UI/UX Designer Portfolio"
	/>
	<meta
		property="og:description"
		content="Full Stack Web Developer & UI/UX Designer spesialisasi SvelteKit, Laravel, dan Modern Web App."
	/>

	<!-- Twitter / X -->
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:url" content="https://hisyamsayyid.my.id/" />
	<meta
		property="twitter:title"
		content="Hisyam Sayyid Alzam | Web Developer & UI/UX Designer Portfolio"
	/>
	<meta
		property="twitter:description"
		content="Full Stack Web Developer & UI/UX Designer spesialisasi SvelteKit, Laravel, dan Modern Web App."
	/>

	<!-- Structured Data (JSON-LD) -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${personSchema}</scr` + `ipt>`}
</svelte:head>

{@render children()}
