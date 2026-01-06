<script lang="ts">
	type Props = {
		fallbackPath: string;
		title: string;
		width?: number;
		height?: number;
		class?: string;
	};

	let { fallbackPath, title, width, height, class: className }: Props = $props();
</script>

<img
	draggable="false"
	src="/media/{fallbackPath}"
	alt={title}
	{title}
	{width}
	{height}
	class="block {className}"
/>
