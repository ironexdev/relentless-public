<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import { t_settings_title } from '$lib/i18n/messages/t-settings';
	import {
		t_verify_login_meta_description,
		t_verify_login_page_title
	} from '$lib/i18n/messages/t-verify-login';
	import type { LocaleType } from '$lib/types/locale-type';

	const currentPath = $derived(page.url.pathname);
	const locale: LocaleType = $derived(page.data.locale);
	const user = $derived(page.data.user!);
</script>

<svelte:head>
	<title>{t_verify_login_page_title(locale)}</title>
	<meta name="description" content={t_verify_login_meta_description(locale)} />
	<link rel="canonical" href={currentPath} />
</svelte:head>

<Header class="ntw-header-onecol" />
<main class="ntw-main-onecol">
	<div class="relative mx-auto flex min-h-full w-full max-w-[640px] min-w-[320px] flex-1 flex-col">
		<div class="flex flex-col gap-10 py-20">
			<h1 class="w-full text-center text-3xl sm:text-4xl">
				{t_settings_title(locale)}
			</h1>
			<p class="w-full text-center">
				{user.email}
			</p>
		</div>
	</div>
</main>
