<script lang="ts">
	import { page } from '$app/state';
	import {
		t_settings_delete_account_button_title,
		t_settings_delete_account_description,
		t_settings_delete_account_label,
		t_settings_email_button_title,
		t_settings_email_label,
		t_settings_title
	} from '$lib/i18n/messages/t-settings';
	import {
		t_verify_login_meta_description,
		t_verify_login_page_title
	} from '$lib/i18n/messages/t-verify-login';
	import type { LocaleType } from '$lib/types/locale-type';
	import type { PageData } from '../../../.svelte-kit/types/src/routes/create-account/$types';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import { PencilLineIcon, Trash2Icon } from '@lucide/svelte';
	import Footer from '$lib/components/Footer.svelte';
	import EditEmailModal from '$lib/components/Modal/User/Email/EditEmailModal.svelte';

	const locale: LocaleType = $derived(page.data.locale);
	const { data }: { data: PageData } = $props();
	const user = $derived(page.data.user!);

	let showEditEmail = $state(false);
</script>

<svelte:head>
	<title>{t_verify_login_page_title(locale)}</title>
	<meta name="description" content={t_verify_login_meta_description(locale)} />
	<link rel="canonical" href={data.url} />
</svelte:head>

<main class="ntw-main-onecol">
	<img src="/media/wallpaper.jpg" class="fixed inset-0 min-h-full min-w-full opacity-20" alt="" />
	<section
		class="relative mx-auto flex min-h-full w-full max-w-[640px] min-w-[320px] flex-1 flex-col"
		aria-labelledby="settings-heading"
	>
		<div class="flex h-[35vh] w-full items-center justify-center">
			<h1 id="settings-heading" class="w-full text-center text-3xl text-primary sm:text-4xl">
				{t_settings_title(locale)}
			</h1>
		</div>
		<div
			class="flex-1 rounded-t-3xl border-x border-t border-primary bg-tertiary px-5 py-12 sm:px-10"
		>
			<div class="flex w-full flex-col gap-8">
				<dl class="w-full">
					<div class="flex w-full flex-col gap-1.5">
						<dt class="flex w-full items-center justify-between">
							<span class="text-lg text-secondary">{t_settings_email_label(locale)}</span>
							<MyButton
								size="icon-md"
								variant="icon"
								title={t_settings_email_button_title(locale)}
								onclick={() => (showEditEmail = true)}><PencilLineIcon class="size-5" /></MyButton
							>
						</dt>
						<dd class="w-full">
							{user.email}
						</dd>
					</div>
				</dl>
				<dl class="w-full">
					<div class="flex w-full flex-col gap-1.5">
						<dt class="flex w-full items-center justify-between">
							<span class="text-lg text-secondary">{t_settings_delete_account_label(locale)}</span>
							<MyButton
								size="icon-md"
								variant="icon"
								title={t_settings_delete_account_button_title(locale)}
								><Trash2Icon class="size-5" /></MyButton
							>
						</dt>
						<dd class="w-full">{t_settings_delete_account_description(locale, user.createdAt)}</dd>
					</div>
				</dl>
			</div>
		</div>
	</section>
</main>

<Footer />

<EditEmailModal bind:showModal={showEditEmail} email={user.email} />
