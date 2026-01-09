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
	import Footer from '$lib/components/Footer.svelte';
	import Menu from '$lib/components/Menu/Menu.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import MenuToggleButton from '$lib/components/Menu/MenuToggleButton.svelte';
	import { t_account_and_privacy_email_label } from '$lib/i18n/messages/administration/t-account-and-privacy.ts';
	import MyInput from '$lib/components/Input/MyInput.svelte';

	const locale: LocaleType = $derived(page.data.locale);
	const { data }: { data: PageData } = $props();
	const user = $derived(page.data.user!);
</script>

<svelte:head>
	<title>{t_edit_profile_page_title(locale)}</title>
	<meta name="description" content={t_edit_profile_meta_description(locale)} />
	<link rel="canonical" href={data.url} />
</svelte:head>

<main class="ntw-admin-main">
	<aside class="hidden min-h-full w-[360px] border-r border-tertiary px-5 lg:block">
		<Menu class="hidden lg:flex" alwaysVisible />
	</aside>
	<section class="relative mx-auto flex min-h-full max-w-[800px] flex-1 flex-col p-10 lg:p-20">
		<div class="flex-1 pb-10">
			<div class="flex w-full flex-col gap-10">
				<h1
					id="edit-profile-heading"
					class="w-full pb-5 text-left text-3xl text-primary sm:text-4xl"
				>
					{t_edit_profile_title(locale)}
				</h1>
				<!-- Username -->
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
</main>

<Footer>
	<MenuToggleButton class="lg:hidden" />
	<Logo class="absolute inset-0 m-auto" />
</Footer>

<Menu class="lg:hidden" overlayClass="lg:hidden" />
