<script lang="ts">
	import {
		t_home_meta_description,
		t_home_page_title,
		t_home_title
	} from '$lib/i18n/messages/t-home';
	import { page } from '$app/state';
	import type { LocaleType } from '$lib/types/locale-type';
	import Menu from '$lib/components/Menu/Menu.svelte';
	import MenuToggleButton from '$lib/components/Menu/MenuToggleButton.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Logo from '$lib/components/Logo.svelte';

	const currentPath = $derived(page.url.pathname);
	const locale: LocaleType = $derived(page.data.locale);
</script>

<svelte:head>
	<title>{t_home_page_title(locale)}</title>
	<meta name="description" content={t_home_meta_description(locale)} />
	<link rel="canonical" href={currentPath} />
</svelte:head>

<main class="ntw-main">
	<section
		class="relative mx-auto flex min-h-full w-full max-w-[640px] min-w-[320px] flex-1 flex-col"
	>
		<div class="flex h-[35vh] w-full items-center justify-center">
			<h1 class="w-full text-center text-3xl text-primary sm:text-4xl">
				{t_home_title(locale)}
			</h1>
		</div>
	</section>
</main>

<Footer>
	<MenuToggleButton />
	<Logo class="absolute inset-0 m-auto" /></Footer
>

<Menu />
