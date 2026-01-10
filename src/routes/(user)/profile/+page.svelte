<script lang="ts">
	import { page } from '$app/state';
	import { t_profile_title } from '$lib/i18n/messages/t-profile';
	import { t_profile_meta_description, t_profile_page_title } from '$lib/i18n/messages/t-profile';
	import type { LocaleType } from '$lib/types/locale-type';
	import type { PageData } from './$types';

	const locale: LocaleType = $derived(page.data.locale);
	const { data }: { data: PageData } = $props();
	const user = $derived(page.data.user!);
</script>

<svelte:head>
	<title>{t_profile_page_title(locale)}</title>
	<meta name="description" content={t_profile_meta_description(locale)} />
	<link rel="canonical" href={data.url} />
</svelte:head>

<div class="flex h-[35vh] w-full items-center justify-center">
	<h1 class="w-full text-center text-3xl text-primary sm:text-4xl">
		{t_profile_title(locale)}
	</h1>
</div>
<div
	class="flex-1 rounded-t-3xl border-t border-primary bg-tertiary px-5 py-12 sm:border-x sm:px-10"
>
	{user.email}
</div>
