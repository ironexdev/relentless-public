<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import StepOne from '$lib/components/Modal/User/Email/EditEmailStepOne.svelte';
	import StepTwo from '$lib/components/Modal/User/Email/EditEmailStepTwo.svelte';
	import StepThree from '$lib/components/Modal/User/Email/EditEmailStepThree.svelte';
	import {
		t_user_email_modal_close,
		t_user_email_modal_title
	} from '$lib/i18n/messages/t-user-modal';
	import type { LocaleType } from '$lib/types/locale-type';
	import { page } from '$app/state';

	type Props = {
		showModal: boolean;
		email: string;
	};

	let { showModal = $bindable(), email }: Props = $props();

	const locale: LocaleType = $derived(page.data.locale);

	let currentPage = $state(1);
	let newEmail = $state('');

	$effect(() => {
		if (showModal) {
			currentPage = 1;
			newEmail = '';
		}
	});
</script>

<Modal bind:showModal className="flex max-w-[640px] flex-col">
	{#snippet header()}
		<div class="flex h-full w-full items-center justify-between px-5 pt-12 xxs:px-10">
			<h3 class="text-lg text-primary">
				{t_user_email_modal_title(locale)}
			</h3>
			<MyButton
				variant="icon"
				size="icon-md"
				class="absolute top-3 right-3 opacity-20 transition-opacity hover:opacity-100"
				onclick={() => (showModal = false)}
				title={t_user_email_modal_close(locale)}
			>
				<ChevronDown size={24} />
			</MyButton>
		</div>
	{/snippet}

	{#if currentPage === 1}
		<StepOne
			currentEmail={email}
			isStepVisible={currentPage === 1}
			onSuccess={() => (currentPage = 2)}
			onSkip={() => (currentPage = 2)}
		/>
	{:else if currentPage === 2}
		<StepTwo
			currentEmail={email}
			isStepVisible={currentPage === 2}
			onSuccess={(val) => {
				newEmail = val;
				currentPage = 3;
			}}
			onBack={() => (currentPage = 1)}
			onSkip={(val) => {
				newEmail = val;
				currentPage = 3;
			}}
		/>
	{:else if currentPage === 3}
		<StepThree {newEmail} isModalVisible={currentPage === 3} onBack={() => (currentPage = 2)} />
	{/if}
</Modal>
