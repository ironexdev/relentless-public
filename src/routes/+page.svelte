<script lang="ts">
	import {
		t_home_meta_description,
		t_home_page_title,
		t_home_title
	} from '$lib/i18n/messages/t-home';
	import { page } from '$app/state';
	import type { LocaleType } from '$lib/types/locale-type';
	import Footer from '$lib/components/Footer.svelte';

	const currentPath = $derived(page.url.pathname);
	const locale: LocaleType = $derived(page.data.locale);
</script>

<svelte:head>
	<title>{t_home_page_title(locale)}</title>
	<meta name="description" content={t_home_meta_description(locale)} />
	<link rel="canonical" href={currentPath} />
</svelte:head>

<main class="ntw-main-onecol">
	<img src="/media/wallpaper.jpg" class="fixed inset-0 min-h-full min-w-full opacity-20" />
	<div class="relative mx-auto flex min-h-full w-full max-w-[640px] min-w-[320px] flex-1 flex-col">
		<div class="flex h-[35vh] w-full items-center justify-center">
			<h1 class="w-full text-center text-3xl text-primary sm:text-4xl">
				{t_home_title(locale)}
			</h1>
		</div>
	</div>
</main>

<Footer />
