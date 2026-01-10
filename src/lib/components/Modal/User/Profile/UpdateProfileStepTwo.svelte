<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowLeftIcon, LoaderCircleIcon } from '@lucide/svelte';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import MyInput from '$lib/components/Input/MyInput.svelte';
	import { page } from '$app/state';
	import type { LocaleType } from '$lib/types/locale-type';
	import {
		t_edit_profile_modal_verify_button,
		t_edit_profile_modal_pin_label,
		t_edit_profile_modal_pin_placeholder,
		t_edit_profile_success
	} from '$lib/i18n/messages/administration/t-edit-profile';
	import { type FormResultResponse, handleFormResult } from '$lib/utils/form-utils';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { tick } from 'svelte';
	import { toast } from 'svelte-sonner';

	type Props = {
		email: string;
		username: string;
		profileLink: string;
		yearOfBirth: number;
		isStepVisible: boolean;
		onSuccess: () => void;
		onBack: () => void;
	};

	let { email, username, profileLink, yearOfBirth, isStepVisible, onSuccess, onBack }: Props =
		$props();

	const locale: LocaleType = $derived(page.data.locale);

	let pin = $state('');
	let isLoading = $state(false);
	let formRef: HTMLFormElement | undefined = $state();
	let response = $state<FormResultResponse<{ pin?: string; message?: string }> | null>(null);

	$effect(() => {
		if (isStepVisible && formRef) {
			tick().then(() => {
				const input = formRef?.querySelector('input[name="pin"]') as HTMLInputElement;
				input?.focus();
			});
		}
	});

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;
		return async ({ result, update }) => {
			response = await handleFormResult<{ pin?: string; message?: string }>(result);
			if (result.type === 'success') {
				toast.success(t_edit_profile_success(locale));
				onSuccess();
			} else {
				await update({ reset: false });
			}
			isLoading = false;
		};
	};
</script>

<form
	bind:this={formRef}
	method="POST"
	action="/administration/edit-profile?/update-profile"
	use:enhance={handleSubmit}
	novalidate
	class="flex h-full w-full flex-1 flex-col justify-between"
>
	<input type="hidden" name="username" value={username} />
	<input type="hidden" name="profileLink" value={profileLink} />
	<input type="hidden" name="yearOfBirth" value={yearOfBirth} />
	<div class="flex flex-1 flex-col items-center justify-center gap-4 px-5 pt-5 xxs:px-10">
		<MyInput
			name="pin"
			label={t_edit_profile_modal_pin_label(locale)}
			placeholder={t_edit_profile_modal_pin_placeholder(locale)}
			bind:value={pin}
			error={response?.data?.pin}
			autocomplete="one-time-code"
			inputmode="numeric"
			maxlength={6}
		/>
	</div>
	<div
		class="header-based-h bg-gradient-header flex w-full shrink-0 items-center justify-center border-t border-t-primary"
	>
		<MyButton
			type="button"
			onclick={onBack}
			variant="icon"
			size="icon-md"
			class="absolute left-5"
			disabled={isLoading}
			title="Back"
		>
			<ArrowLeftIcon />
		</MyButton>
		<MyButton
			type="submit"
			disabled={isLoading || pin.length !== 6}
			title={t_edit_profile_modal_verify_button(locale)}
			class="min-w-[160px]"
		>
			{#if isLoading}
				<LoaderCircleIcon class="animate-spin" />
			{:else}
				{t_edit_profile_modal_verify_button(locale)}
			{/if}
		</MyButton>
	</div>
</form>
