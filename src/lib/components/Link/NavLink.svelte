<script lang="ts">
	import { getLocalizedUrl } from '$lib/routes';
	import type { LocaleType } from '$lib/types/locale-type';
	import { cva, type VariantProps } from 'class-variance-authority';
	import { cn } from '$lib/utils/string-utils';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { page } from '$app/state';

	const locale: LocaleType = $derived(page.data.locale);
	const linkVariants = cva(
		'relative overflow-hidden flex items-center justify-center select-none aria-disabled:pointer-events-none cursor-pointer aria-disabled:opacity-50 outline-none transition-colors',
		{
			variants: {
				variant: {
					blank: '',
					icon: 'hover:bg-quaternary duration-xs rounded-full text-secondary hover:text-primary',
					menu: 'justify-start rounded-full w-full hover:bg-quaternary transition-all duration-xs'
				},
				size: {
					blank: '',
					'icon-sm': 'size-8',
					'icon-md': 'size-10',
					sm: 'h-8 sm:h-9 px-5 text-base text-sm',
					md: 'h-10 px-5 sm:h-11 text-base',
					lg: 'size-12',
					xl: 'size-14'
				}
			},
			defaultVariants: {
				variant: 'blank',
				size: 'blank'
			}
		}
	);
	type Props = VariantProps<typeof linkVariants> &
		HTMLAnchorAttributes & {
			title: string;
			'aria-label'?: string;
			href: string;
			children: () => unknown;
			class?: string;
			locale?: LocaleType;
			isExternal?: boolean;
			activeClass?: string;
			disabled?: boolean;
		};

	let {
		href,
		variant,
		size,
		class: className,
		children,
		isExternal = false,
		onclick,
		activeClass,
		title,
		'aria-label': ariaLabel,
		disabled = false,
		...rest
	}: Props = $props();

	const finalHref = $derived(isExternal ? href : getLocalizedUrl(locale, href));

	const currentPath = $derived(page.url.pathname);
	const finalClass = $derived(
		cn(linkVariants({ variant, size, class: className }), currentPath === finalHref && activeClass)
	);

	function handleClick(e: MouseEvent) {
		if (disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		onclick?.(e);
	}
</script>

<a
	href={finalHref}
	class={finalClass}
	{title}
	aria-label={ariaLabel ?? title}
	aria-disabled={disabled ? 'true' : undefined}
	tabindex={disabled ? -1 : undefined}
	{...rest}
	target={isExternal ? '_blank' : rest.target}
	rel={isExternal ? 'noopener noreferrer' : rest.rel}
	onclick={handleClick}
>
	{@render children()}
</a>
