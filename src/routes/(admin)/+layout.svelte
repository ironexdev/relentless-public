<script lang="ts">
	import type { Snippet } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Menu from '$lib/components/Menu/Menu.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import MenuToggleButton from '$lib/components/Menu/MenuToggleButton.svelte';

	const { children }: { children: Snippet } = $props();
</script>

<main class="ntw-admin-main">
	<aside class="hidden min-h-full w-[360px] border-r border-tertiary px-5 lg:block">
		<Menu class="hidden lg:flex" alwaysVisible />
	</aside>
	{@render children()}
</main>

<Footer>
	<MenuToggleButton class="lg:hidden" />
	<Logo class="absolute inset-0 m-auto" />
</Footer>

<Menu class="lg:hidden" overlayClass="lg:hidden" />
