<script lang="ts">
	import { ToastEnum } from '$lib/enums/toast-enum';
	import { XIcon } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { page } from '$app/state';
	import type { LocaleType } from '$lib/types/locale-type';
	import Menu from '$lib/components/Menu/Menu.svelte';
	import MenuToggleButton from '$lib/components/Menu/MenuToggleButton.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Logo from '$lib/components/Logo.svelte';

	const { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon/favicon.svg" />
	<link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
	<link rel="shortcut icon" href="/favicon/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="MyWebSited" />
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>

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
