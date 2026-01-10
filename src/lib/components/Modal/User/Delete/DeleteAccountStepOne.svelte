<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import type { LocaleType } from '$lib/types/locale-type';
	import {
		t_user_delete_step_one_submit,
		t_user_delete_description_step_one,
		t_user_delete_pin_sent_to,
		t_user_delete_step_one_success
	} from '$lib/i18n/messages/t-user-delete-modal';
	import { handleFormResult } from '$lib/utils/form-utils';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { LoaderCircleIcon } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { VerificationActionEnum } from '$lib/enums/verification-action-enum';

	type Props = {
		currentEmail: string;
		onSuccess: () => void;
	};

	let { currentEmail, onSuccess }: Props = $props();

	const locale: LocaleType = $derived(page.data.locale);
	let isLoading = $state(false);

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;
		return async ({ result, update }) => {
			if (result.type === 'success') {
				toast.success(t_user_delete_step_one_success(locale));
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
	method="POST"
	action="/routes/administration/verification?/request-verification-pin"
	use:enhance={handleSubmit}
	novalidate
	class="flex h-full w-full flex-1 flex-col justify-between"
>
	<input type="hidden" name="email" value={currentEmail} />
	<input type="hidden" name="action" value={VerificationActionEnum.DELETE_USER} />
	<div class="flex flex-1 flex-col items-center justify-center px-5 pt-5 sm:px-10">
		<p class="w-full text-sm text-primary sm:text-base">
			{t_user_delete_description_step_one(locale)}
		</p>
		<div class="flex w-full flex-1 flex-col items-center justify-center py-5 text-center">
			<div class="w-full">
				<p class="text-secondary">{t_user_delete_pin_sent_to(locale)}</p>
				<p class="mt-1 text-base font-medium text-primary">{currentEmail}</p>
			</div>
		</div>
	</div>
	<div
		class="bg-gradient-header flex h-20 w-full shrink-0 items-center justify-center border-t border-t-primary"
	>
		<MyButton
			type="submit"
			disabled={isLoading}
			title={t_user_delete_step_one_submit(locale)}
			class="min-w-[160px]"
		>
			{#if isLoading}
				<LoaderCircleIcon class="animate-spin" />
			{:else}
				{t_user_delete_step_one_submit(locale)}
			{/if}
		</MyButton>
	</div>
</form>
