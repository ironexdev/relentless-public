<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import type { LocaleType } from '$lib/types/locale-type';
	import {
		t_edit_profile_modal_send_pin,
		t_edit_profile_modal_description,
		t_edit_profile_modal_pin_sent
	} from '$lib/i18n/messages/administration/t-edit-profile';
	import { handleFormResult } from '$lib/utils/form-utils';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { tick } from 'svelte';
	import { LoaderCircleIcon } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { VerificationActionEnum } from '$lib/enums/verification-action-enum';

	type Props = {
		email: string;
		isStepVisible: boolean;
		onSuccess: () => void;
	};

	let { email, isStepVisible, onSuccess }: Props = $props();

	const locale: LocaleType = $derived(page.data.locale);
	let isLoading = $state(false);
	let formRef: HTMLFormElement | undefined = $state();

	$effect(() => {
		if (isStepVisible && formRef) {
			tick().then(() => {
				const button = formRef?.querySelector('button[type="submit"]') as HTMLButtonElement;
				button?.focus();
			});
		}
	});

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;
		return async ({ result, update }) => {
			if (result.type === 'success') {
				toast.success(t_edit_profile_modal_pin_sent(locale));
				onSuccess();
			} else {
				await handleFormResult(result);
				await update({ reset: false });
			}
			isLoading = false;
		};
	};
</script>

<form
	bind:this={formRef}
	method="POST"
	action="/administration/edit-profile?/request-verification-pin"
	use:enhance={handleSubmit}
	novalidate
	class="flex h-full w-full flex-1 flex-col justify-between"
>
	<input type="hidden" name="email" value={email} />
	<input type="hidden" name="action" value={VerificationActionEnum.UPDATE_PROFILE} />
	<div class="flex flex-1 flex-col items-center justify-center gap-2 px-5 pt-5 xxs:px-10">
		<div class="w-full text-sm text-primary sm:text-base">
			{t_edit_profile_modal_description(locale)}
		</div>
		<div class="flex w-full flex-1 flex-col items-center justify-center text-center">
			<div class="w-full">
				<p class="mt-1 text-base font-medium text-primary">{email}</p>
			</div>
		</div>
	</div>
	<div
		class="header-based-h bg-gradient-header flex w-full shrink-0 items-center justify-center border-t border-t-primary"
	>
		<MyButton
			type="submit"
			disabled={isLoading}
			title={t_edit_profile_modal_send_pin(locale)}
			class="min-w-[160px]"
		>
			{#if isLoading}
				<LoaderCircleIcon class="animate-spin" />
			{:else}
				{t_edit_profile_modal_send_pin(locale)}
			{/if}
		</MyButton>
	</div>
</form>
