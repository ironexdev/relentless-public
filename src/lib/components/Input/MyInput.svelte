<script lang="ts">
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import InputError from '$lib/components/Input/InputError.svelte';
	import { EraserIcon } from '@lucide/svelte';
	import { cn } from '$lib/utils/string-utils';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { t_input_clear } from '$lib/i18n/messages/t-input.ts';
	import type { LocaleType } from '$lib/types/locale-type.ts';
	import { page } from '$app/state';

	type Props = Omit<HTMLInputAttributes, 'value'> & {
		name: string;
		label: string;
		value?: string;
		wrapInLabel?: boolean;
		class?: string;
		wrapperClass?: string;
		error?: string;
	};

	let {
		label,
		value = $bindable(''),
		wrapInLabel = true,
		class: className,
		wrapperClass,
		type = 'text',
		error,
		...rest
	}: Props = $props();
	function clearInput() {
		value = '';
	}

	const locale: LocaleType = $derived(page.data.locale);
	const finalWrapperClass = $derived(cn('relative flex w-full flex-col gap-1', wrapperClass));
	const finalInputClass = $derived(
		cn(
			'w-full h-10 sm:h-11 bg-quaternary rounded outline-none transition-all duration-xs px-5 text-center border-2 border-transparent focus:border-secondary',
			error ? 'border-error text-error' : '',
			value && 'pr-10',
			className
		)
	);
</script>

{#if wrapInLabel}
	<label class={finalWrapperClass}>
		<span class="mb-1 text-sm text-secondary uppercase">{label}</span>
		<span class="relative flex items-center">
			<input bind:value {type} class={finalInputClass} {...rest} />
			{#if value}
				<MyButton
					type="button"
					variant="blank"
					size="wrap"
					onclick={clearInput}
					aria-label={t_input_clear(locale)}
					title={t_input_clear(locale)}
					class="absolute inset-y-0 right-3.5 my-auto text-secondary transition-colors duration-xs hover:text-primary"
				>
					<EraserIcon class="size-5" />
				</MyButton>
			{/if}
		</span>
		{#if error}<InputError message={error} />{/if}
	</label>
{:else}
	<div class={finalWrapperClass}>
		<input bind:value {type} class={finalInputClass} aria-label={label} {...rest} />
		{#if value}
			<MyButton
				type="button"
				variant="blank"
				size="wrap"
				onclick={clearInput}
				aria-label={t_input_clear(locale)}
				title={t_input_clear(locale)}
				class="absolute inset-y-0 right-3.5 my-auto text-secondary transition-colors duration-xs hover:text-primary"
			>
				<EraserIcon class="size-5" />
			</MyButton>
		{/if}
		{#if error}<InputError message={error} />{/if}
	</div>
{/if}
