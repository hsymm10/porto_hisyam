<script lang="ts" module>
	export type LandPalette = 'dawn' | 'alpine' | 'dusk' | 'mist';

	export type Slide = {
		image?: string;
		title?: string;
		caption?: string;
		alt?: string;
		/** Palette and seed of the painted landscape used when `image` is empty or fails to load. */
		palette?: LandPalette;
		seed?: number;
	};

	export type PolaroidLineCarouselProps = {
		slides?: Slide[];
		/** Any CSS length. Default 100svh. */
		height?: number | string;
		/** Width of a print in px (shrinks cleanly on narrow screens). */
		cardWidth?: number;
		/** How far the string sags in the middle, px. */
		sag?: number;
		/** How much the prints swing; 0 holds them still. */
		swing?: number;
		/** ms per print; 0 turns autoplay off. Waits while someone is interacting. */
		autoplay?: number;
		/** Colour of the sagging string. */
		stringColor?: string;
		background?: string;
		ink?: string;
		onChange?: (index: number) => void;
		onSelect?: (index: number) => void;
		class?: string;
		ariaLabel?: string;
	};

	export function wrap(i: number, n: number): number {
		return n ? ((i % n) + n) % n : 0;
	}

	export function clamp(v: number, a: number, b: number): number {
		return Math.min(b, Math.max(a, v));
	}

	/** Height of a string sagging by `sag` between (0, y0) and (w, y0), at x. */
	export function stringY(x: number, w: number, y0: number, sag: number): number {
		const t = clamp(x / Math.max(1, w), 0, 1);
		return y0 + 4 * sag * t * (1 - t);
	}

	/** One step of a critically damped spring toward target. */
	export function springStep(
		x: number,
		v: number,
		target: number,
		dt: number,
		k = 70
	): [number, number] {
		const c = 2 * Math.sqrt(k);
		const nv = v + (k * (target - x) - c * v) * dt;
		return [x + nv * dt, nv];
	}

	/** One step of a print's swing. */
	export function swingStep(
		a: number,
		w: number,
		lineVel: number,
		dt: number,
		gain: number
	): [number, number] {
		const nw = w + (-38 * a - 4.2 * w + lineVel * 0.0034 * gain) * dt;
		return [clamp(a + nw * dt, -0.6, 0.6), nw];
	}

	/** Index of the print nearest the centre for a line offset. */
	export function nearestAt(off: number, spacing: number, n: number): number {
		return clamp(Math.round(off / Math.max(1, spacing)), 0, Math.max(0, n - 1));
	}

	export function pad2(n: number): string {
		return n < 10 ? '0' + n : String(n);
	}

	const PALETTES: Record<
		LandPalette,
		{ top: string; bottom: string; sun: string; far: string; near: string; mist: string }
	> = {
		dawn: {
			top: '#e7b7a5',
			bottom: '#f8e8d6',
			sun: '#fff4df',
			far: '#d2b2bb',
			near: '#3a2a3b',
			mist: '255,240,232'
		},
		alpine: {
			top: '#7ea5c8',
			bottom: '#e3ecf2',
			sun: '#ffffff',
			far: '#a9bfd0',
			near: '#1c3044',
			mist: '236,244,250'
		},
		dusk: {
			top: '#2a2450',
			bottom: '#ef8d60',
			sun: '#ffd9a6',
			far: '#93607c',
			near: '#18121f',
			mist: '255,196,160'
		},
		mist: {
			top: '#c4d0cb',
			bottom: '#eef1ec',
			sun: '#ffffff',
			far: '#aebcb5',
			near: '#2c3a33',
			mist: '246,248,245'
		}
	};

	function mulberry32(seed: number): () => number {
		let a = seed >>> 0;
		return () => {
			a = (a + 0x6d2b79f5) >>> 0;
			let t = a;
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	function hexRgb(h: string): [number, number, number] {
		const v = parseInt(h.replace('#', ''), 16);
		return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
	}

	function mixRgb(a: string, b: string, t: number): string {
		const A = hexRgb(a);
		const B = hexRgb(b);
		return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',') + ')';
	}

	function paintLandscape(seed: number, palette: LandPalette, w = 1200, h = 900): string {
		if (typeof document === 'undefined') return '';
		const c = document.createElement('canvas');
		c.width = w;
		c.height = h;
		const g = c.getContext('2d');
		if (!g) return '';
		const P = PALETTES[palette] ?? PALETTES.dawn;
		const r = mulberry32(seed * 104729 + 7);

		const sky = g.createLinearGradient(0, 0, 0, h * 0.72);
		sky.addColorStop(0, P.top);
		sky.addColorStop(1, P.bottom);
		g.fillStyle = sky;
		g.fillRect(0, 0, w, h);

		const sx = w * (0.22 + r() * 0.56);
		const sy = h * (0.26 + r() * 0.16);
		const halo = g.createRadialGradient(sx, sy, 0, sx, sy, w * 0.45);
		halo.addColorStop(0, 'rgba(' + hexRgb(P.sun).join(',') + ',.85)');
		halo.addColorStop(0.08, 'rgba(' + hexRgb(P.sun).join(',') + ',.55)');
		halo.addColorStop(1, 'rgba(' + hexRgb(P.sun).join(',') + ',0)');
		g.fillStyle = halo;
		g.fillRect(0, 0, w, h);
		g.fillStyle = P.sun;
		g.beginPath();
		g.arc(sx, sy, h * 0.045, 0, Math.PI * 2);
		g.fill();

		const layers = 5;
		for (let L = 0; L < layers; L++) {
			const k = L / (layers - 1);
			const base = h * (0.42 + k * 0.4);
			const amp = h * (0.07 + k * 0.1);
			const ph = [r(), r(), r(), r()].map((v) => v * Math.PI * 2);
			const fr = [1.3 + r(), 3.1 + r() * 2, 7 + r() * 4, 17 + r() * 8];
			const ridge = (x: number) => {
				const u = x / w;
				return (
					base -
					amp *
						(0.55 * Math.sin(u * fr[0] + ph[0]) +
							0.28 * Math.sin(u * fr[1] + ph[1]) +
							0.12 * Math.abs(Math.sin(u * fr[2] + ph[2])) +
							0.05 * Math.sin(u * fr[3] + ph[3]))
				);
			};

			const mist = g.createLinearGradient(0, base - amp * 1.4, 0, base + amp * 0.4);
			mist.addColorStop(0, 'rgba(' + P.mist + ',0)');
			mist.addColorStop(1, 'rgba(' + P.mist + ',' + (0.55 - k * 0.35).toFixed(2) + ')');
			g.fillStyle = mist;
			g.fillRect(0, base - amp * 1.4, w, amp * 1.8);

			const body = g.createLinearGradient(0, base - amp, 0, h);
			body.addColorStop(0, mixRgb(P.far, P.near, Math.pow(k, 1.3)));
			body.addColorStop(1, mixRgb(P.far, P.near, Math.min(1, Math.pow(k, 1.3) + 0.18)));
			g.fillStyle = body;
			g.beginPath();
			g.moveTo(0, h);
			for (let x = 0; x <= w; x += 6) g.lineTo(x, ridge(x));
			g.lineTo(w, h);
			g.closePath();
			g.fill();

			if (L >= layers - 2) {
				g.fillStyle = mixRgb(P.far, P.near, Math.min(1, Math.pow(k, 1.3) + 0.08));
				for (let x = 0; x < w; x += 7 + r() * 9) {
					if (r() < 0.35) continue;
					const y = ridge(x) + 2;
					const th = h * (0.025 + r() * 0.035) * (0.6 + k);
					const tw = th * 0.32;
					g.beginPath();
					g.moveTo(x, y - th);
					g.lineTo(x + tw, y);
					g.lineTo(x - tw, y);
					g.closePath();
					g.fill();
				}
			}
		}

		const vig = g.createRadialGradient(w / 2, h * 0.45, h * 0.3, w / 2, h / 2, w * 0.78);
		vig.addColorStop(0, 'rgba(0,0,0,0)');
		vig.addColorStop(1, 'rgba(0,0,0,.32)');
		g.fillStyle = vig;
		g.fillRect(0, 0, w, h);

		const grain = g.getImageData(0, 0, w, h);
		const d = grain.data;
		for (let i = 0; i < d.length; i += 4) {
			const v = (r() - 0.5) * 14;
			d[i] += v;
			d[i + 1] += v;
			d[i + 2] += v;
		}
		g.putImageData(grain, 0, 0);
		return c.toDataURL('image/jpeg', 0.88);
	}

	const DEFAULT_SLIDES: Slide[] = [
		{
			title: 'First Light',
			caption: 'Haze lifting off the eastern ridges.',
			palette: 'dawn',
			seed: 3
		},
		{
			title: 'High Pass',
			caption: 'Cold air, clear to the far range.',
			palette: 'alpine',
			seed: 8
		},
		{
			title: 'Ember Hour',
			caption: 'The last of the sun on the valley floor.',
			palette: 'dusk',
			seed: 14
		},
		{
			title: 'Still Valley',
			caption: 'Morning mist that never quite lifts.',
			palette: 'mist',
			seed: 21
		},
		{
			title: 'Rose Ridge',
			caption: 'Five ridges, one long exhale.',
			palette: 'dawn',
			seed: 34
		},
		{
			title: 'Blue Hour',
			caption: 'Pines going dark against the snow.',
			palette: 'alpine',
			seed: 55
		}
	];
</script>

<script lang="ts">
	import { gsap, REDUCED_MOTION_QUERY, registerGsap, ScrollTrigger } from '#lib/gsap.js';
	import { cn } from '#lib/utils.js';
	import { untrack } from 'svelte';

	let {
		slides = DEFAULT_SLIDES,
		height = '100svh',
		cardWidth = 300,
		sag = 46,
		swing = 1,
		autoplay = 4500,
		stringColor = 'var(--foreground)',
		background = 'var(--neo-canvas)',
		ink = 'var(--foreground)',
		onChange,
		onSelect,
		class: className,
		ariaLabel = 'Polaroid photo carousel'
	}: PolaroidLineCarouselProps = $props();

	const n = $derived(slides.length);
	let active = $state(0);
	let statusAnnouncement = $state('');
	let hasInteracted = $state(false);
	let dragging = $state(false);
	let suppressClick = false;
	let isHoveredOrFocused = $state(false);
	let reducedMotion = $state(false);
	let painted = $state<string[]>([]);
	let failedImages = $state<Record<number, boolean>>({});
	let size = $state({ w: 1200, h: 640, cw: 260 });

	let rootEl: HTMLDivElement | undefined = $state();
	let pathEl: SVGPathElement | undefined = $state();
	let cardEls: (HTMLDivElement | null)[] = [];

	const sim = {
		off: 0,
		vel: 0,
		target: 0,
		a: [] as number[],
		w: [] as number[]
	};

	let dragState: null | {
		x: number;
		off: number;
		lx: number;
		lt: number;
		v: number;
		moved: boolean;
	} = null;
	let lastTouch = 0;
	let activeIdx = 0;

	const spacing = $derived(size.cw * 1.1);
	const heightStyle = $derived(typeof height === 'number' ? `${height}px` : height);
	const currentSlide = $derived(slides[active] || {});

	function resolvedSrc(slide: Slide, index: number): string {
		if (slide.image && !failedImages[index]) {
			return slide.image;
		}
		return painted[index] || '';
	}

	function handleImageError(index: number) {
		if (!failedImages[index]) {
			failedImages = { ...failedImages, [index]: true };
			const slide = slides[index];
			if (slide && !painted[index]) {
				const nextPainted = [...painted];
				nextPainted[index] = paintLandscape(slide.seed ?? index + 1, slide.palette || 'dawn');
				painted = nextPainted;
			}
		}
	}

	function goTo(i: number, announce = true) {
		const clamped = clamp(i, 0, Math.max(0, n - 1));
		sim.target = clamped * spacing;
		if (reducedMotion) {
			sim.off = sim.target;
			sim.vel = 0;
		}
		if (announce) hasInteracted = true;
	}

	function step(dir: number) {
		lastTouch = performance.now();
		if (n === 0) return;
		const next = wrap(activeIdx + dir, n);
		goTo(next, true);
	}

	// Generate painted fallback images lazily on client for slides without URLs or on failed load
	$effect(() => {
		const list = slides;
		const next = list.map((s, i) =>
			s.image && !failedImages[i] ? '' : paintLandscape(s.seed ?? i + 1, s.palette || 'dawn')
		);
		untrack(() => {
			painted = next;
		});
	});

	// ResizeObserver to keep card width proportional to stage dimensions
	$effect(() => {
		const root = rootEl;
		if (!root) return;

		const updateSize = () => {
			const r = root.getBoundingClientRect();
			if (r.width <= 0 || r.height <= 0) return;
			const cw = Math.round(Math.max(150, Math.min(cardWidth, r.width * 0.42, r.height * 0.46)));
			size = { w: r.width, h: r.height, cw };
		};

		updateSize();
		const ro = new ResizeObserver(updateSize);
		ro.observe(root);
		return () => ro.disconnect();
	});

	// Snap line offset cleanly when card spacing changes on resize
	$effect(() => {
		const s = spacing;
		sim.target = activeIdx * s;
		sim.off = activeIdx * s;
	});

	$effect(() => {
		onChange?.(active);
		if (hasInteracted) {
			const title = currentSlide.title ? `: ${currentSlide.title}` : '';
			statusAnnouncement = `Slide ${active + 1} of ${n}${title}`;
		}
	});

	// Physics + RAF loop (paused offscreen via IntersectionObserver, respects prefers-reduced-motion)
	$effect(() => {
		const root = rootEl;
		if (!root) return;

		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = motionQuery.matches;
		const onMotionChange = (e: MediaQueryListEvent) => {
			reducedMotion = e.matches;
		};
		motionQuery.addEventListener('change', onMotionChange);

		let visible = true;
		let raf = 0;
		let prev = performance.now();

		const frame = (now: number) => {
			raf = 0;
			if (!visible) return;
			const dt = Math.min(0.033, Math.max(0.001, (now - prev) / 1000));
			prev = now;

			const { w, h, cw } = size;
			const sp = spacing;
			const count = n;
			const y0 = Math.max(36, h * 0.16);
			const d = dragState;
			let lineVel = 0;

			if (d && d.moved) {
				lineVel = d.v * 1000;
			} else if (reducedMotion) {
				sim.off = sim.target;
				sim.vel = 0;
			} else {
				const before = sim.off;
				[sim.off, sim.vel] = springStep(sim.off, sim.vel, sim.target, dt);
				lineVel = -(sim.off - before) / Math.max(dt, 1e-3);
			}

			const gain = reducedMotion ? 0 : swing;
			const near = nearestAt(sim.off, sp, count);

			for (let i = 0; i < count; i++) {
				const el = cardEls[i];
				if (!el) continue;
				const x = w / 2 + i * sp - sim.off;
				if (x < -cw * 1.5 || x > w + cw * 1.5) {
					el.style.visibility = 'hidden';
					continue;
				}
				el.style.visibility = 'visible';

				let a = sim.a[i] || 0;
				let av = sim.w[i] || 0;
				if (gain === 0) {
					a = 0;
					av = 0;
				} else {
					[a, av] = swingStep(a, av, lineVel, dt, gain);
					a += Math.sin(now / 1300 + i * 1.7) * 0.0009 * gain;
				}
				sim.a[i] = a;
				sim.w[i] = av;

				const y = stringY(x, w, y0, sag) - 6;
				el.style.transform = `translate(${(x - cw / 2).toFixed(1)}px, ${y.toFixed(1)}px) rotate(${a.toFixed(4)}rad)`;
				el.style.zIndex = String(i === near ? count + 1 : count - Math.abs(i - near));
			}

			pathEl?.setAttribute('d', `M0 ${y0} Q${w / 2} ${y0 + 2 * sag} ${w} ${y0}`);

			if (near !== activeIdx) {
				activeIdx = near;
				active = near;
			}

			raf = window.requestAnimationFrame(frame);
		};

		const io = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible && !raf) {
				prev = performance.now();
				raf = window.requestAnimationFrame(frame);
			}
		});

		io.observe(root);
		raf = window.requestAnimationFrame(frame);

		return () => {
			motionQuery.removeEventListener('change', onMotionChange);
			window.cancelAnimationFrame(raf);
			io.disconnect();
		};
	});

	// GSAP ScrollTrigger entrance & scroll-velocity physical breeze on the Polaroid line
	$effect(() => {
		const root = rootEl;
		if (!root) return;
		registerGsap();

		const mm = gsap.matchMedia(root);
		mm.add(REDUCED_MOTION_QUERY, () => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: root,
					start: 'top 82%',
					once: true,
					onEnter: () => {
						for (let i = 0; i < n; i++) {
							sim.w[i] = (i % 2 === 0 ? 1 : -1) * 1.45;
						}
					}
				}
			});

			tl.from('.pl-string', {
				y: -14,
				opacity: 0,
				duration: 0.5,
				ease: 'power2.out',
				clearProps: 'transform'
			})
				.from(
					'.pl-print',
					{
						y: 20,
						opacity: 0,
						duration: 0.55,
						stagger: 0.04,
						ease: 'power3.out',
						clearProps: 'transform'
					},
					'-=0.35'
				)
				.from(
					'.pl-bar',
					{
						y: 22,
						opacity: 0,
						duration: 0.5,
						ease: 'back.out(1.4)',
						clearProps: 'transform'
					},
					'-=0.3'
				);

			ScrollTrigger.create({
				trigger: root,
				start: 'top bottom',
				end: 'bottom top',
				onUpdate: (self) => {
					if (dragState || reducedMotion) return;
					const impulse = Math.max(-0.35, Math.min(0.35, self.getVelocity() * 0.00014));
					if (Math.abs(impulse) < 0.02) return;
					for (let i = 0; i < n; i++) {
						sim.w[i] = (sim.w[i] || 0) + impulse * (i % 2 === 0 ? 1 : 0.7) * 0.15;
					}
				}
			});
		});

		return () => mm.revert();
	});

	// Autoplay timer (skipped when reducedMotion or hovered/focused or during pointer interaction)
	$effect(() => {
		if (!autoplay || n < 2 || isHoveredOrFocused || reducedMotion) return;
		const id = window.setInterval(() => {
			if (document.hidden || dragState || performance.now() - lastTouch < autoplay) return;
			goTo(activeIdx >= n - 1 ? 0 : activeIdx + 1, false);
		}, autoplay);
		return () => window.clearInterval(id);
	});

	function onPointerDown(e: PointerEvent) {
		if ((e.target as HTMLElement).closest('.pl-bar')) return;
		suppressClick = false;
		lastTouch = performance.now();
		dragState = {
			x: e.clientX,
			off: sim.off,
			lx: e.clientX,
			lt: e.timeStamp,
			v: 0,
			moved: false
		};
	}

	function onPointerMove(e: PointerEvent) {
		const d = dragState;
		if (!d) return;
		const dx = e.clientX - d.x;
		if (!d.moved && Math.abs(dx) > 10) {
			d.moved = true;
			suppressClick = true;
			dragging = true;
			rootEl?.setPointerCapture(e.pointerId);
		}
		if (!d.moved) return;
		const dt = Math.max(1, e.timeStamp - d.lt);
		d.v = 0.7 * ((e.clientX - d.lx) / dt) + 0.3 * d.v;
		d.lx = e.clientX;
		d.lt = e.timeStamp;
		const max = (n - 1) * spacing;
		let off = d.off - dx;
		if (off < 0) off *= 0.35;
		if (off > max) off = max + (off - max) * 0.35;
		sim.off = off;
	}

	function onPointerUp() {
		const d = dragState;
		dragState = null;
		lastTouch = performance.now();
		if (!d) return;
		if (d.moved) {
			dragging = false;
			sim.vel = -d.v * 1000;
			goTo(nearestAt(sim.off - d.v * 180, spacing, n), true);
			window.requestAnimationFrame(() => {
				suppressClick = false;
			});
		}
	}

	function handleCardClick(idx: number) {
		if (suppressClick) return;
		goTo(idx, true);
		onSelect?.(idx);
	}

	function onKeyDown(e: KeyboardEvent) {
		if ((e.target as HTMLElement).closest('button, a, input, textarea, select')) return;
		if (e.key === 'ArrowRight') {
			step(1);
			e.preventDefault();
		} else if (e.key === 'ArrowLeft') {
			step(-1);
			e.preventDefault();
		}
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	bind:this={rootEl}
	class={cn('pl-root neo-grid-bg', className)}
	style:height={heightStyle}
	style:--pl-bg={background}
	style:--pl-ink={ink}
	style:--pl-cw={`${size.cw}px`}
	data-drag={dragging ? '1' : '0'}
	role="region"
	aria-roledescription="carousel"
	aria-label={ariaLabel}
	tabindex={0}
	onkeydown={onKeyDown}
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onpointercancel={onPointerUp}
	onmouseenter={() => (isHoveredOrFocused = true)}
	onmouseleave={() => (isHoveredOrFocused = false)}
	onfocusin={() => (isHoveredOrFocused = true)}
	onfocusout={() => (isHoveredOrFocused = false)}
>
	<svg class="pl-string" aria-hidden="true">
		<path
			bind:this={pathEl}
			fill="none"
			stroke={stringColor}
			stroke-width="2"
			stroke-linecap="round"
		/>
	</svg>

	{#each slides as sl, i (i)}
		{@const src = resolvedSrc(sl, i)}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			bind:this={cardEls[i]}
			class="pl-card"
			data-i={i}
			data-on={i === active ? '1' : '0'}
			role="group"
			aria-roledescription="slide"
			aria-label={`${i + 1} of ${n}${sl.title ? `: ${sl.title}` : ''}`}
			onclick={() => handleCardClick(i)}
		>
			<div class="pl-print">
				<div class="pl-shot">
					{#if src}
						<img
							{src}
							alt={sl.alt || sl.title || ''}
							loading="lazy"
							draggable={false}
							onerror={() => handleImageError(i)}
						/>
					{/if}
				</div>
				<div class="pl-note">{sl.title || ''}</div>
			</div>
			<div class="pl-peg" data-tone={i % 3} aria-hidden="true"></div>
		</div>
	{/each}

	<!-- Bottom Neobrutalism Caption Bar -->
	<div class="pl-bar">
		<div class="pl-cap">
			{#key active}
				<div class="pl-cap-inner">
					{#if currentSlide.title}
						<span class="pl-title">{currentSlide.title}</span>
					{/if}
					{#if currentSlide.caption}
						<span class="pl-sub">{currentSlide.caption}</span>
					{/if}
				</div>
			{/key}
		</div>
		{#if onSelect}
			<button
				type="button"
				class="pl-view-btn"
				onclick={() => onSelect(active)}
				aria-label={`Lihat penuh ${currentSlide.title || 'foto'}`}
			>
				VIEW FULL ↗
			</button>
		{/if}
	</div>

	<p class="pl-sr" role="status" aria-live="polite">
		{statusAnnouncement}
	</p>
</div>

<style>
	.pl-root {
		position: relative;
		width: 100%;
		overflow: hidden;
		background-color: var(--pl-bg);
		color: var(--pl-ink);
		user-select: none;
		-webkit-user-select: none;
		touch-action: pan-y;
		outline: none;
		cursor: grab;
	}

	.pl-root[data-drag='1'] {
		cursor: grabbing;
	}

	.pl-root:focus-visible {
		box-shadow: inset 0 0 0 3px var(--ring);
	}

	.pl-string {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		overflow: visible;
	}

	.pl-card {
		position: absolute;
		left: 0;
		top: 0;
		width: var(--pl-cw);
		transform-origin: 50% 0;
		will-change: transform;
		cursor: pointer;
	}

	.pl-root[data-drag='1'] .pl-card {
		cursor: grabbing;
	}

	.pl-print {
		margin-top: 10px;
		background: var(--neo-white);
		border: 2px solid var(--neo-black);
		padding: 10px 10px 0;
		box-shadow: 4px 4px 0px var(--neo-shadow-color, #0d0c0b);
		transition:
			transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1),
			box-shadow 0.35s ease,
			filter 0.35s ease;
	}

	.pl-card[data-on='1'] .pl-print {
		box-shadow: 6px 6px 0px var(--neo-shadow-color, #0d0c0b);
	}

	.pl-card[data-on='0'] .pl-print {
		transform: scale(0.9);
		filter: saturate(0.78) brightness(0.94);
	}

	.pl-shot {
		position: relative;
		aspect-ratio: 1;
		overflow: hidden;
		border: 2px solid var(--neo-black);
		background: var(--neo-surface-muted);
	}

	.pl-shot img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		max-width: none;
		object-fit: cover;
		display: block;
		pointer-events: none;
	}

	.pl-note {
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 6px;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--neo-black);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Vintage Clothespin Peg */
	.pl-peg {
		position: absolute;
		left: 50%;
		top: 0;
		width: 12px;
		height: 26px;
		margin-left: -6px;
		border: 2px solid var(--neo-black);
		background: #fe7a25;
		box-shadow: 2px 2px 0px var(--neo-shadow-color, #0f2116);
	}

	.pl-peg[data-tone='1'] {
		background: #006732;
	}

	.pl-peg[data-tone='2'] {
		background: #e9e8ca;
	}

	.pl-peg::after {
		content: '';
		position: absolute;
		left: 3px;
		top: 7px;
		width: 2px;
		height: 8px;
		background: var(--neo-black);
	}

	.pl-bar {
		position: absolute;
		left: clamp(16px, 3vw, 32px);
		right: clamp(16px, 3vw, 32px);
		bottom: clamp(16px, 3vh, 28px);
		display: flex;
		align-items: center;
		gap: clamp(12px, 2vw, 20px);
		cursor: default;
		z-index: 50;
	}

	.pl-cap {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		padding: 8px 12px;
		border: 2px solid var(--border);
		background: var(--card);
		box-shadow: var(--neo-shadow-sm);
	}

	.pl-view-btn {
		flex-shrink: 0;
		padding: 10px 14px;
		border: 2px solid var(--border);
		background: var(--accent);
		color: var(--accent-foreground);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		white-space: nowrap;
		box-shadow: var(--neo-shadow-sm);
		cursor: pointer;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.pl-view-btn:hover {
		transform: translate(-1px, -1px);
		box-shadow: var(--neo-shadow);
	}

	.pl-view-btn:active {
		transform: translate(1px, 1px);
		box-shadow: none;
	}

	.pl-cap-inner {
		display: block;
	}

	@media (prefers-reduced-motion: no-preference) {
		.pl-cap-inner {
			animation: pl-in 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both;
		}
	}

	.pl-title {
		display: block;
		font-family: var(--font-display);
		font-size: clamp(1rem, 1.8vw, 1.35rem);
		font-weight: 900;
		line-height: 1.1;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.pl-sub {
		display: block;
		margin-top: 3px;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		line-height: 1.35;
		color: var(--muted-foreground);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.pl-sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}

	@keyframes pl-in {
		from {
			transform: translateY(100%);
			opacity: 0;
		}
		to {
			transform: none;
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.pl-print {
			transition: none;
		}
	}
</style>
