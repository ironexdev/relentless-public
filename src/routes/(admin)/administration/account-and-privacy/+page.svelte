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
		t_account_and_privacy_title
	} from '$lib/i18n/messages/administration/t-account-and-privacy.ts';
	import type { LocaleType } from '$lib/types/locale-type.ts';
	import type { PageData } from './$types';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import { PencilLineIcon, Trash2Icon } from '@lucide/svelte';
	import EditEmailModal from '$lib/components/Modal/User/Email/EditEmailModal.svelte';
	import DeleteAccountModal from '$lib/components/Modal/User/Delete/DeleteAccountModal.svelte';

	const locale: LocaleType = $derived(page.data.locale);
	const { data }: { data: PageData } = $props();
	const user = $derived(page.data.user!);

	let showEditEmail = $state(false);
	let showDeleteAccount = $state(false);
</script>

<svelte:head>
	<title>{t_account_and_privacy_page_title(locale)}</title>
	<meta name="description" content={t_account_and_privacy_meta_description(locale)} />
	<link rel="canonical" href={data.url} />
</svelte:head>

<section class="relative mx-auto flex min-h-full max-w-[800px] flex-1 flex-col px-5 py-10 lg:p-20">
	<div class="flex-1 pb-10">
		<div class="flex w-full flex-col gap-10">
			<h1 class="w-full pb-5 text-left text-xl text-primary sm:text-3xl">
				{t_account_and_privacy_title(locale)}
			</h1>
			<!-- Email -->
			<dl class="w-full">
				<div class="flex w-full flex-col gap-1.5">
					<dt class="flex w-full items-center justify-between">
						<span class="text-lg text-secondary">{t_account_and_privacy_email_label(locale)}</span>
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
							onclick={() => (showDeleteAccount = true)}><Trash2Icon class="size-5" /></MyButton
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

<EditEmailModal bind:showModal={showEditEmail} email={user.email} />

<DeleteAccountModal bind:showModal={showDeleteAccount} email={user.email} />
