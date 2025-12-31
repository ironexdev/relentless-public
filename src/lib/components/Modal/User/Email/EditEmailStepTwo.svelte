<script lang="ts">
	import { enhance } from '$app/forms';
	import { InfoIcon, LoaderCircle, ArrowLeftIcon, ArrowRightIcon } from '@lucide/svelte';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import MyInput from '$lib/components/Input/MyInput.svelte';
	import { page } from '$app/state';
	import type { LocaleType } from '$lib/types/locale-type';
	import {
		t_user_email_step_two_back,
		t_user_email_step_two_submit,
		t_user_email_step_two_info,
		t_user_email_step_two_email_label,
		t_user_email_step_two_email_placeholder,
		t_user_email_step_two_pin_label,
		t_user_email_step_two_pin_placeholder,
		t_user_email_step_two_skip,
		t_user_email_description_step_two,
		t_user_email_step_two_success
	} from '$lib/i18n/messages/t-user-modal';
	import { type FormResultResponse, handleFormResult } from '$lib/utils/form-utils';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { tick } from 'svelte';
	import { toast } from 'svelte-sonner';

	type Props = {
		currentEmail: string;
		isStepVisible: boolean;
		onSuccess: (email: string) => void;
		onBack: () => void;
		onSkip: (email: string) => void;
	};

	let { currentEmail, isStepVisible, onSuccess, onBack, onSkip }: Props = $props();

	const locale: LocaleType = $derived(page.data.locale);

	let email = $state('');
	let pin = $state('');
	let isLoading = $state(false);
	let formRef: HTMLFormElement | undefined = $state();
	let response =
		$state<FormResultResponse<{ newEmail?: string; pin?: string; message?: string }>>();

	let isDirty = $derived(email.length > 0 || pin.length > 0);

	$effect(() => {
		if (isStepVisible && formRef) {
			tick().then(() => {
				const input = formRef?.querySelector('input[type="email"]') as HTMLInputElement;
				input?.focus();
			});
		}
	});

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;
		response = undefined;
		return async ({ result, update }) => {
			if (result.type === 'success') {
				toast.success(t_user_email_step_two_success(locale));
				onSuccess(email);
			} else {
				response = await handleFormResult(result);
				await update({ reset: false });
			}
			isLoading = false;
		};
	};
</script>

<form
	bind:this={formRef}
	method="POST"
	action="/settings?/verify-change-email"
	use:enhance={handleSubmit}
	novalidate
	class="flex h-full w-full flex-1 flex-col justify-between"
>
	<input type="hidden" name="currentEmail" value={currentEmail} />
	<div class="flex flex-1 flex-col justify-between gap-5 px-5 pt-5 xxs:px-10">
		<div class="w-full text-sm text-secondary sm:text-base">
			{t_user_email_description_step_two(locale)}
		</div>

		<div class="flex w-full flex-1 flex-col items-center justify-center gap-5">
			<div class="flex w-full flex-col gap-5">
				<MyInput
					bind:value={email}
					label={t_user_email_step_two_email_label(locale)}
					name="newEmail"
					type="email"
					placeholder={t_user_email_step_two_email_placeholder(locale)}
					disabled={isLoading}
					error={response?.data?.newEmail}
				/>

				<MyInput
					bind:value={pin}
					label={t_user_email_step_two_pin_label(locale)}
					name="pin"
					type="text"
					placeholder={t_user_email_step_two_pin_placeholder(locale)}
					disabled={isLoading}
					error={response?.data?.pin}
				/>

				<div class="flex items-center gap-2.5 text-sm text-highlight">
					<InfoIcon class="shrink-0" size={20} />
					<span> {t_user_email_step_two_info(locale)}</span>
				</div>
			</div>
		</div>
	</div>

	<div
		class="flex footer-based-h w-full shrink-0 items-center justify-center border-t border-t-primary bg-gradient-footer"
	>
		<MyButton
			type="button"
			onclick={onBack}
			variant="icon"
			size="icon-md"
			class="absolute left-5 text-secondary hover:text-primary hover:underline"
			disabled={isLoading}
			title={t_user_email_step_two_back(locale)}
		>
			<ArrowLeftIcon />
		</MyButton>
		<MyButton
			type="submit"
			disabled={isLoading || !isDirty}
			title={t_user_email_step_two_submit(locale)}
			class="min-w-[160px]"
		>
			{#if isLoading}
				<LoaderCircle class="animate-spin" />
			{:else}
				{t_user_email_step_two_submit(locale)}
			{/if}
		</MyButton>
		<MyButton
			type="button"
			onclick={() => onSkip(email)}
			variant="icon"
			size="icon-md"
			class="absolute right-5 text-secondary hover:text-primary hover:underline"
			disabled={isLoading}
			title={t_user_email_step_two_skip(locale)}
		>
			<ArrowRightIcon />
		</MyButton>
	</div>
</form>
