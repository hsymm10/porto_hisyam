<script lang="ts">
	import 'lenis/dist/lenis.css';
	import './layout.css';
	import Lenis from 'lenis';
	import favicon from '#lib/assets/favicon.svg';
	import { setLenisInstance } from '#lib/lenis.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	$effect(() => {
		const lenis = new Lenis({
			autoRaf: true,
			lerp: 0.1,
			smoothWheel: true,
			anchors: {
				offset: -64
			},
			respectReducedMotion: true
		});

		setLenisInstance(lenis);

		return () => {
			setLenisInstance(null);
			lenis.destroy();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
