<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		children?: Snippet;
	};

	const { class: className = 'ntw-footer', children }: Props = $props();
</script>

<footer class={className}>
	<div class="mx-auto flex size-full max-w-[1440px] items-center gap-5 px-5 2xl:px-0">
		{@render children?.()}
	</div>
</footer>
