<script lang="ts">
	import { page } from '$app/state';
	import {
		t_edit_profile_meta_description,
		t_edit_profile_page_title,
		t_edit_profile_title,
		t_edit_profile_username_label
	} from '$lib/i18n/messages/administration/t-edit-profile.ts';
	import type { LocaleType } from '$lib/types/locale-type.ts';
	import type { PageData } from './$types';

	const locale: LocaleType = $derived(page.data.locale);
	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{t_edit_profile_page_title(locale)}</title>
	<meta name="description" content={t_edit_profile_meta_description(locale)} />
	<link rel="canonical" href={data.url} />
</svelte:head>

<section class="relative mx-auto flex min-h-full max-w-[800px] flex-1 flex-col px-5 py-10 lg:p-20">
	<div class="flex-1 pb-10">
		<div class="flex w-full flex-col gap-10">
			<h1 class="w-full pb-5 text-left text-xl text-primary sm:text-3xl">
				{t_edit_profile_title(locale)}
			</h1>
			<dl class="w-full">
				<div class="flex w-full flex-col gap-1.5">
					<dt class="flex w-full items-center justify-between">
						<span class="text-lg text-secondary">{t_edit_profile_username_label(locale)}</span>
					</dt>
					<dd class="w-full"></dd>
				</div>
			</dl>
		</div>
	</div>
</section>
