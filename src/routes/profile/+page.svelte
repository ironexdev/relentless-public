<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import { t_profile_title } from '$lib/i18n/messages/t-profile';
	import {
		t_verify_login_meta_description,
		t_verify_login_page_title
	} from '$lib/i18n/messages/t-verify-login';
	import type { LocaleType } from '$lib/types/locale-type';
	import type { PageData } from '../../../.svelte-kit/types/src/routes/create-account/$types';
	import { t_settings_title } from '$lib/i18n/messages/t-settings.ts';

	const locale: LocaleType = $derived(page.data.locale);
	const { data }: { data: PageData } = $props();
	const user = $derived(page.data.user!);
</script>

<svelte:head>
	<title>{t_verify_login_page_title(locale)}</title>
	<meta name="description" content={t_verify_login_meta_description(locale)} />
	<link rel="canonical" href={data.url} />
</svelte:head>

<Header class="ntw-header-onecol" />
<main
	class="ntw-main-onecol bg-[url(/media/wallpaper.jpg)] bg-cover bg-fixed bg-center bg-no-repeat"
>
	<div class="relative mx-auto flex min-h-full w-full max-w-[640px] min-w-[320px] flex-1 flex-col">
		<div class="flex h-[35vh] w-full items-center justify-center">
			<h1 class="w-full text-center text-3xl text-white sm:text-4xl dark:text-primary">
				{t_profile_title(locale)}
			</h1>
		</div>
		<div class="flex-1 bg-primary/95 px-5 py-12 sm:px-10 dark:bg-tertiary/99">{user.email}</div>
	</div>
</main>
