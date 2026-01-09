<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		name: string;
		checked?: boolean;
		error?: string;
		children?: Snippet;
		class?: string;
	};

	let { name, checked = $bindable(false), error, children, class: className }: Props = $props();
</script>

<div class="flex w-full flex-col gap-2 {className}">
	<label class="flex cursor-pointer items-start gap-3">
		<input type="checkbox" {name} bind:checked class="accent-primary h-5 w-5 cursor-pointer" />
		{#if children}
			<span class="text-sm text-secondary">
				{@render children()}
			</span>
		{/if}
	</label>
	{#if error}
		<p class="text-sm text-error">{error}</p>
	{/if}
</div>
