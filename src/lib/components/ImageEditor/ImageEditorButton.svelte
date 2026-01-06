<script lang="ts">
	import type { Component } from 'svelte';
	import MyButton from '$lib/components/Button/MyButton.svelte';

	type Props = {
		title: string;
		icon: Component;
		onclick: () => void;
		label: string;
		disabled?: boolean;
	};

	let { title, icon: Icon, onclick, label, disabled = false }: Props = $props();
</script>

<MyButton
	type="button"
	variant="blank"
	size="wrap"
	{title}
	{onclick}
	{disabled}
	class="flex h-20 w-16 flex-col items-center justify-center gap-1 text-secondary hover:text-primary disabled:opacity-50"
>
	<Icon size={24} />
	<span class="text-xs leading-none">{label}</span>
</MyButton>
