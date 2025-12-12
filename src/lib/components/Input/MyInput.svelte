<script lang="ts">
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import InputError from '$lib/components/Input/InputError.svelte';
	import { EraserIcon } from '@lucide/svelte';
	import { cn } from '$lib/utils/string-utils';
	import type { HTMLInputAttributes } from 'svelte/elements';

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

	const finalWrapperClass = $derived(
		cn('relative flex w-full flex-col flex flex-col gap-1 relative', wrapperClass)
	);
	const finalInputClass = $derived(
		cn(
			'w-full h-10 sm:h-11 bg-transparent border-b border-b-primary outline-none transition-border duration-xs px-5 text-center focus:bg-tertiary dark:focus:bg-secondary',
			error ? 'border-b-error text-error' : 'focus:border-b-secondary',
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
					aria-label="Clear input"
					title="Clear input"
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
				aria-label="Clear input"
				title="Clear input"
				class="absolute inset-y-0 right-3.5 my-auto text-secondary transition-colors duration-xs hover:text-primary"
			>
				<EraserIcon class="size-5" />
			</MyButton>
		{/if}
		{#if error}<InputError message={error} />{/if}
	</div>
{/if}
