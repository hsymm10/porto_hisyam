<script lang="ts">
	import { Separator as SeparatorPrimitive } from 'bits-ui';
	import { cn } from '#lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		'data-slot': dataSlot = 'separator',
		...restProps
	}: SeparatorPrimitive.RootProps = $props();
</script>

<SeparatorPrimitive.Root
	bind:ref
	data-slot={dataSlot}
	class={cn(
		'shrink-0 bg-border data-horizontal:h-[2px] data-horizontal:w-full data-vertical:w-[2px] data-vertical:self-stretch',
		className
	)}
	{...restProps}
/>
