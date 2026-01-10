<script lang="ts">
	type Props = {
		message?: string;
	};

	const { message }: Props = $props();
</script>

{#if message}
	<div
		class="ntw-announcement mx-auto flex w-full max-w-[1440px] items-center justify-center bg-announcement px-4 py-2 text-sm text-announcement"
	>
		{message}
	</div>
{/if}
