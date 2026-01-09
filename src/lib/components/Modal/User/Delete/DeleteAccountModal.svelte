<script lang="ts">
	import { XIcon } from '@lucide/svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import StepOne from '$lib/components/Modal/User/Delete/DeleteAccountStepOne.svelte';
	import StepTwo from '$lib/components/Modal/User/Delete/DeleteAccountStepTwo.svelte';
	import {
		t_user_delete_modal_close,
		t_user_delete_modal_title
	} from '$lib/i18n/messages/t-user-delete-modal';
	import type { LocaleType } from '$lib/types/locale-type';
	import { page } from '$app/state';

	type Props = {
		showModal: boolean;
		email: string;
	};

	let { showModal = $bindable(), email }: Props = $props();

	const locale: LocaleType = $derived(page.data.locale);

	let currentPage = $state(1);

	$effect(() => {
		if (showModal) {
			currentPage = 1;
		}
	});
</script>

<Modal bind:showModal className="flex max-w-[640px] flex-col">
	{#snippet header()}
		<div class="flex h-full w-full items-center justify-between px-5 pt-12 sm:px-10">
			<h3 class="text-lg text-secondary">
				{t_user_delete_modal_title(locale)}
			</h3>
			<MyButton
				variant="icon"
				size="icon-md"
				class="absolute top-3 right-3 opacity-50 transition-opacity hover:opacity-100"
				onclick={() => (showModal = false)}
				title={t_user_delete_modal_close(locale)}
			>
				<XIcon size={24} />
			</MyButton>
		</div>
	{/snippet}

	{#if currentPage === 1}
		<StepOne currentEmail={email} onSuccess={() => (currentPage = 2)} />
	{:else if currentPage === 2}
		<StepTwo currentEmail={email} />
	{/if}
</Modal>
