<script lang="ts">
	import type { Snippet } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Menu from '$lib/components/Menu/Menu.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import MenuToggleButton from '$lib/components/Menu/MenuToggleButton.svelte';

	const { children }: { children: Snippet } = $props();
</script>

<main class="ntw-main">
	<section
		class="relative mx-auto flex min-h-full w-full max-w-[640px] min-w-[320px] flex-1 flex-col"
	>
		{@render children()}
	</section>
</main>

<Footer>
	<MenuToggleButton />
	<Logo class="absolute inset-0 m-auto" /></Footer
>

<Menu />
