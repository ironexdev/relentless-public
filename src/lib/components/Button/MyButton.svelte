<script lang="ts">
	import { buttonAnimation } from '$lib/utils/animation-utils';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/string-utils';

	const buttonVariants = cva(
		'relative overflow-hidden flex items-center justify-center select-none disabled:pointer-events-none cursor-pointer disabled:opacity-50 outline-none transition-colors',
		{
			variants: {
				variant: {
					primary:
						'bg-gradient-button hover:bg-gradient-button-hover text-button transition-all duration-xs rounded-full',
					secondary: 'bg-button-secondary text-button rounded-full',
					icon: 'hover:bg-quaternary duration-xs rounded-full text-secondary hover:text-primary',
					menu: 'justify-start rounded-full w-full hover:bg-quaternary transition-all duration-xs',
					blank: ''
				},
				size: {
					wrap: '',
					'icon-sm': 'size-8',
					'icon-md': 'size-10',
					sm: 'h-8 sm:h-9 px-5 text-base text-sm',
					md: 'h-10 px-5 sm:h-11 text-base'
				}
			},
			defaultVariants: {
				variant: 'primary',
				size: 'md'
			}
		}
	);
	type Props = VariantProps<typeof buttonVariants> &
		HTMLButtonAttributes & {
			title: string;
			'aria-label'?: string;
			class?: string;
			isActive?: boolean;
			activeClassName?: string;
			children?: () => unknown;
		};

	let {
		variant = 'primary',
		size = 'md',
		isActive = false,
		activeClassName = '',
		class: className,
		children,
		title,
		'aria-label': ariaLabel,
		...rest
	}: Props = $props();
	const finalClass = $derived(
		cn(buttonVariants({ variant, size, class: className }), isActive && activeClassName)
	);
</script>

<button
	class={finalClass}
	{title}
	aria-label={ariaLabel ?? title}
	{...rest}
	type={rest.type || 'button'}
	aria-pressed={isActive}
	onpointerdown={(e) => {
		if (variant && !['menu', 'blank'].includes(variant)) {
			buttonAnimation(e);
		}
	}}
>
	{#if children}
		{@render children()}
	{/if}
</button>
