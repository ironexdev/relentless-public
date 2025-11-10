<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/string-utils';
	import { ChevronDown } from '@lucide/svelte';

	const selectVariants = cva(
		'flex items-center select-none disabled:pointer-events-none cursor-pointer disabled:opacity-50 outline-none rounded-lg appearance-none w-full',
		{
			variants: {
				variant: {
					primary: 'transition-colors bg-select text-button text-primary'
				},
				size: {
					sm: 'h-8 px-2.5 text-sm',
					md: 'h-10 sm:h-11 px-5 text-base'
				}
			},
			defaultVariants: {
				variant: 'primary',
				size: 'md'
			}
		}
	);

	type Props = VariantProps<typeof selectVariants> &
		Omit<HTMLSelectAttributes, 'size'> & {
			title: string;
			'aria-label'?: string;
			class?: string;
			children?: () => unknown;
		};

	let {
		variant = 'primary',
		size = 'md',
		class: className = 'relative',
		children,
		title,
		'aria-label': ariaLabel,
		...rest
	}: Props = $props();
	const finalClass = $derived(cn(selectVariants({ variant, size, class: className })));
</script>

<div class="relative">
	<select class={finalClass} {title} aria-label={ariaLabel ?? title} {...rest}>
		{#if children}
			{@render children()}
		{/if}
	</select>
	<ChevronDown class="pointer-events-none absolute inset-y-0 right-3 my-auto size-5 text-primary" />
</div>
