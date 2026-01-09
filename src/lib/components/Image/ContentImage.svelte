<script lang="ts">
	import AssetImage from '$lib/components/Image/AssetImage.svelte';

	type Props = {
		path: string | null;
		fallbackPath: string;
		title: string;
		width?: number;
		height?: number;
		class?: string;
	};

	let { path, fallbackPath, title, width, height, class: className }: Props = $props();
</script>

{#if path}
	<img
		draggable="false"
		src={path}
		alt={title}
		{title}
		{width}
		{height}
		class="block {className}"
	/>
{:else}
	<AssetImage {fallbackPath} {title} {width} {height} class={className} />
{/if}
