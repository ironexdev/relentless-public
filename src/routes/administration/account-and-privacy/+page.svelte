<script lang="ts">
	import { page } from '$app/state';
	import {
		t_account_and_privacy_delete_account_button_title,
		t_account_and_privacy_delete_account_description,
		t_account_and_privacy_delete_account_label,
		t_account_and_privacy_email_button_title,
		t_account_and_privacy_email_label,
		t_account_and_privacy_meta_description,
		t_account_and_privacy_page_title,
		t_account_and_privacy_title,
		t_account_and_privacy_username_label
	} from '$lib/i18n/messages/administration/t-account-and-privacy.ts';
	import type { LocaleType } from '$lib/types/locale-type.ts';
	import type { PageData } from '../../../../.svelte-kit/types/src/routes/create-account/$types';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import { PencilLineIcon, Trash2Icon } from '@lucide/svelte';
	import Footer from '$lib/components/Footer.svelte';
	import EditEmailModal from '$lib/components/Modal/User/Email/EditEmailModal.svelte';
	import Menu from '$lib/components/Menu/Menu.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import MenuToggleButton from '$lib/components/Menu/MenuToggleButton.svelte';

	const locale: LocaleType = $derived(page.data.locale);
	const { data }: { data: PageData } = $props();
	const user = $derived(page.data.user!);

	let showEditEmail = $state(false);
</script>

<svelte:head>
	<title>{t_account_and_privacy_page_title(locale)}</title>
	<meta name="description" content={t_account_and_privacy_meta_description(locale)} />
	<link rel="canonical" href={data.url} />
</svelte:head>

<main class="ntw-admin-main">
	<aside class="hidden min-h-full w-[360px] border-r border-primary bg-tertiary px-5 lg:block">
		<Menu class="hidden lg:flex" alwaysVisible />
	</aside>
	<section class="relative mx-auto flex min-h-full max-w-[800px] flex-1 flex-col p-20">
		<div class="flex-1 pb-10">
			<div class="flex w-full flex-col gap-10">
				<h1 id="settings-heading" class="w-full pb-5 text-left text-3xl text-primary sm:text-4xl">
					{t_account_and_privacy_title(locale)}
				</h1>
				<!-- Email -->
				<dl class="w-full">
					<div class="flex w-full flex-col gap-1.5">
						<dt class="flex w-full items-center justify-between">
							<span class="text-lg text-secondary">{t_account_and_privacy_email_label(locale)}</span
							>
							<MyButton
								size="icon-md"
								variant="icon"
								title={t_account_and_privacy_email_button_title(locale)}
								onclick={() => (showEditEmail = true)}><PencilLineIcon class="size-5" /></MyButton
							>
						</dt>
						<dd class="w-full">
							{user.email}
						</dd>
					</div>
				</dl>
				<!-- Delete Account -->
				<dl class="w-full">
					<div class="flex w-full flex-col gap-1.5">
						<dt class="flex w-full items-center justify-between">
							<span class="text-lg text-secondary"
								>{t_account_and_privacy_delete_account_label(locale)}</span
							>
							<MyButton
								size="icon-md"
								variant="icon"
								title={t_account_and_privacy_delete_account_button_title(locale)}
								><Trash2Icon class="size-5" /></MyButton
							>
						</dt>
						<dd class="w-full">
							{t_account_and_privacy_delete_account_description(locale, user.createdAt)}
						</dd>
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

<EditEmailModal bind:showModal={showEditEmail} email={user.email} />
