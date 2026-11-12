<script lang="ts" module>
	import { type VariantProps, tv } from 'tailwind-variants';

	export const badgeVariants = tv({
		base: 'min-h-6 gap-1.5 rounded-none border-2 border-border px-2.5 py-0.5 font-mono text-[0.6875rem] font-bold uppercase tracking-wider shadow-neo-sm transition-[transform,box-shadow,background-color] duration-120 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none',
		variants: {
			variant: {
				default: 'bg-secondary text-secondary-foreground [a]:hover:bg-neo-violet-hover',
				lime: 'bg-primary text-primary-foreground [a]:hover:bg-neo-lime-hover',
				pink: 'bg-accent text-accent-foreground [a]:hover:bg-neo-pink-hover',
				secondary: 'bg-muted text-foreground [a]:hover:bg-neo-surface-subtle',
				destructive: 'bg-destructive text-destructive-foreground [a]:hover:bg-destructive/90',
				outline: 'bg-card text-foreground [a]:hover:bg-neo-surface-subtle',
				ghost: 'border-transparent shadow-none hover:bg-neo-surface-subtle',
				link: 'border-transparent shadow-none text-foreground underline-offset-4 hover:underline'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from '#lib/utils.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = 'default',
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
	} = $props();
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(badgeVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
