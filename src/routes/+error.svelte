<script lang="ts">
	import { page } from '$app/state';
	import {
		t_error_not_found_page_title,
		t_error_not_found_title
	} from '$lib/i18n/messages/t-error';
	import type { LocaleType } from '$lib/types/locale-type';
	import { defaultLocale, locales } from '$lib/i18n';

	const getLocaleFromUrl = () => {
		const lang = page.url.pathname.split('/')[1];
		if (lang && (locales as string[]).includes(lang)) {
			return lang as LocaleType;
		}
		return defaultLocale;
	};

	const locale: LocaleType = $derived(getLocaleFromUrl());
</script>

<svelte:head>
	<title>{t_error_not_found_page_title(locale)}</title>
</svelte:head>

<main class="ntw-main">
	<div class="relative mx-auto flex min-h-full w-full min-w-[320px] flex-1 flex-col">
		<div class="flex h-[35vh] w-full items-center justify-center">
			<h1 class="text-3xl">{t_error_not_found_title(locale)}</h1>
		</div>
	</div>
</main>
