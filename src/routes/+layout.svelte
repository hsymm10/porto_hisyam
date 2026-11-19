<script lang="ts">
	import 'lenis/dist/lenis.css';
	import './layout.css';
	import Lenis from 'lenis';
	import logoHisyam from '#lib/assets/logo_hisyam.png';
	import { gsap, registerGsap, ScrollTrigger } from '#lib/gsap.js';
	import { setLenisInstance } from '#lib/lenis.js';
	import { currentLang } from '#lib/i18n.js';
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
			'https://instagram.com/hszamm',
			'https://www.linkedin.com/in/hisyam-sayyid-alzam/'
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

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.lang = $currentLang;
		}
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="{logoHisyam}?v=3" />
	<link rel="shortcut icon" href="/favicon.ico?v=3" />
	<link rel="apple-touch-icon" href="/favicon.png?v=3" />

	<!-- Primary Meta Tags -->
	<title>
		{$currentLang === 'id'
			? 'Hisyam Sayyid Alzam | Portofolio Pengembang Web & Desainer UI/UX'
			: 'Hisyam Sayyid Alzam | Web Developer & UI/UX Designer Portfolio'}
	</title>
	<meta
		name="title"
		content={$currentLang === 'id'
			? 'Hisyam Sayyid Alzam | Portofolio Pengembang Web & Desainer UI/UX'
			: 'Hisyam Sayyid Alzam | Web Developer & UI/UX Designer Portfolio'}
	/>
	<meta
		name="description"
		content={$currentLang === 'id'
			? 'Portofolio resmi Hisyam Sayyid Alzam. Pengembang Web Full Stack & Desainer UI/UX spesialisasi SvelteKit, Laravel, Nuxt, dan Aplikasi Web Modern.'
			: 'Official portfolio of Hisyam Sayyid Alzam. Full Stack Web Developer & UI/UX Designer specializing in SvelteKit, Laravel, Nuxt, and Modern Web Applications.'}
	/>
	<meta
		name="keywords"
		content="Hisyam Sayyid Alzam, hszamm, hsymm10, Web Developer, UI UX Designer, SvelteKit, Laravel, Portfolio"
	/>
	<meta name="author" content="Hisyam Sayyid Alzam" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://hisyamsayyid.my.id/" />

	<!-- Open Graph / Facebook / LinkedIn / WhatsApp / Discord -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://hisyamsayyid.my.id/" />
	<meta property="og:site_name" content="Hisyam Sayyid Alzam — Portfolio" />
	<meta property="og:locale" content={$currentLang === 'id' ? 'id_ID' : 'en_US'} />

	<meta property="og:title" content="Hisyam Sayyid Alzam — Full Stack Developer & UI/UX Designer" />

	<meta
		property="og:description"
		content={$currentLang === 'id'
			? 'Portofolio resmi Hisyam Sayyid Alzam. Full Stack Web Developer & UI/UX Designer spesialisasi SvelteKit, Laravel, dan aplikasi web modern.'
			: 'Official portfolio of Hisyam Sayyid Alzam. Full Stack Web Developer & UI/UX Designer specializing in SvelteKit, Laravel, and modern web applications.'}
	/>

	<meta property="og:image" content="https://hisyamsayyid.my.id/images/og-image.png" />
	<meta property="og:image:secure_url" content="https://hisyamsayyid.my.id/images/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:alt" content="Hisyam Sayyid Alzam Logo" />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://hisyamsayyid.my.id/" />

	<meta
		name="twitter:title"
		content="Hisyam Sayyid Alzam — Full Stack Developer & UI/UX Designer"
	/>

	<meta
		name="twitter:description"
		content={$currentLang === 'id'
			? 'Portofolio resmi Hisyam Sayyid Alzam. Full Stack Web Developer & UI/UX Designer spesialisasi SvelteKit, Laravel, dan aplikasi web modern.'
			: 'Official portfolio of Hisyam Sayyid Alzam. Full Stack Web Developer & UI/UX Designer specializing in SvelteKit, Laravel, and modern web applications.'}
	/>

	<meta name="twitter:image" content="https://hisyamsayyid.my.id/images/og-image.png" />
	<meta name="twitter:image:alt" content="Hisyam Sayyid Alzam Logo" />

	<!-- Structured Data (JSON-LD) -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${personSchema}</scr` + `ipt>`}
</svelte:head>

{@render children()}
