<script lang="ts">
import { ChevronDown } from '@lucide/svelte';
import Modal from '$lib/components/Modal/Modal.svelte';
import MyButton from '$lib/components/Button/MyButton.svelte';
import UpdateProfileStepOne from '$lib/components/Modal/User/Profile/UpdateProfileStepOne.svelte';
import UpdateProfileStepTwo from '$lib/components/Modal/User/Profile/UpdateProfileStepTwo.svelte';
import {
	t_edit_profile_modal_close,
	t_edit_profile_modal_title
} from '$lib/i18n/messages/administration/t-edit-profile';
import type { LocaleType } from '$lib/types/locale-type';
import { page } from '$app/state';

type Props = {
	showModal: boolean;
	email: string;
	username: string;
	profileLink: string;
	yearOfBirth: number;
	onSuccess: () => void;
};

let { showModal = $bindable(), email, username, profileLink, yearOfBirth, onSuccess }: Props =
	$props();

const locale: LocaleType = $derived(page.data.locale);

let currentStep = $state(1);

$effect(() => {
	if (showModal) {
		currentStep = 1;
	}
});
</script>

<Modal bind:showModal className="flex max-w-[640px] flex-col">
	{#snippet header()}
	<div class="flex h-full w-full items-center justify-between px-5 pt-12 xxs:px-10">
<h3 class="text-lg text-secondary">
	{t_edit_profile_modal_title(locale)}
	</h3>
	<MyButton
variant="icon"
size="icon-md"
class="absolute top-3 right-3 opacity-20 transition-opacity hover:opacity-100"
onclick={() => (showModal = false)}
title={t_edit_profile_modal_close(locale)}
>
<ChevronDown size={24} />
</MyButton>
</div>
{/snippet}

	{#if currentStep === 1}
	<UpdateProfileStepOne
		{email}
	isStepVisible={currentStep === 1}
	onSuccess={() => (currentStep = 2)}
	/>
	{:else if currentStep === 2}
	<UpdateProfileStepTwo
		{email}
	{username}
	{profileLink}
	{yearOfBirth}
	isStepVisible={currentStep === 2}
	onSuccess={() => {
	showModal = false;
	onSuccess();
}}
	onBack={() => (currentStep = 1)}
	/>
	{/if}
	</Modal>