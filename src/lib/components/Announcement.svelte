<script lang="ts">
	type Props = {
		message?: string;
	};

	const { message }: Props = $props();
</script>

{#if message}
	<div
		class="ntw-announcement flex items-center justify-center bg-green-300 px-4 py-2 text-sm text-green-900"
	>
		{message}
	</div>
{/if}
