<script lang="ts" module>
	import { type VariantProps, tv } from 'tailwind-variants';
	import { cn, type WithElementRef } from '#lib/utils.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	export const buttonVariants = tv({
		base: "focus-visible:ring-ring focus-visible:ring-offset-background aria-invalid:ring-destructive/30 aria-invalid:border-destructive rounded-none border-2 border-border font-mono font-bold uppercase tracking-wider shadow-neo-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:ring-2 focus-visible:ring-offset-2 aria-invalid:ring-2 [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-[transform,box-shadow,background-color] duration-120 ease-out outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-neo-lime-hover',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-neo-violet-hover',
				accent: 'bg-accent text-accent-foreground hover:bg-neo-pink-hover',
				outline:
					'bg-card text-card-foreground hover:bg-neo-surface-subtle aria-expanded:bg-neo-surface-subtle',
				ghost:
					'border-transparent shadow-none hover:border-border hover:bg-neo-surface-subtle hover:shadow-neo-sm hover:translate-x-0 hover:translate-y-0 active:translate-x-0 active:translate-y-0',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				link: 'border-transparent shadow-none text-foreground underline-offset-4 hover:underline hover:translate-x-0 hover:translate-y-0 hover:shadow-none active:translate-x-0 active:translate-y-0'
			},
			size: {
				default:
					'min-h-9 gap-2 px-4 py-2 text-xs has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
				xs: "min-h-6 gap-1 px-2 py-1 text-[0.6875rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: 'min-h-8 gap-1.5 px-3 py-1.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
				lg: 'min-h-11 gap-2 px-5 py-2.5 text-sm has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4',
				icon: 'size-9',
				'icon-xs': "size-6 [&_svg:not([class*='size-'])]:size-3",
				'icon-sm': 'size-8',
				'icon-lg': 'size-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
