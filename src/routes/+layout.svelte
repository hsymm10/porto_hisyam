<script lang="ts">
	import 'lenis/dist/lenis.css';
	import './layout.css';
	import Lenis from 'lenis';
	import favicon from '#lib/assets/favicon.svg';
	import { gsap, registerGsap, ScrollTrigger } from '#lib/gsap.js';
	import { setLenisInstance } from '#lib/lenis.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

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
</svelte:head>

{@render children()}
