<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { InfoIcon, LoaderCircle, ArrowLeftIcon } from '@lucide/svelte';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import MyInput from '$lib/components/Input/MyInput.svelte';
	import { page } from '$app/state';
	import type { LocaleType } from '$lib/types/locale-type';
	import {
		t_user_email_step_three_back,
		t_user_email_step_three_submit,
		t_user_email_step_three_info,
		t_user_email_step_three_pin_label,
		t_user_email_step_three_pin_placeholder,
		t_user_email_description_step_three
	} from '$lib/i18n/messages/t-user-modal';
	import { type FormResultResponse, handleFormResult } from '$lib/utils/form-utils';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { tick } from 'svelte';

	type Props = {
		newEmail: string;
		isModalVisible: boolean;
		onBack: () => void;
	};

	let { newEmail, isModalVisible, onBack }: Props = $props();

	const locale: LocaleType = $derived(page.data.locale);

	let pin = $state('');
	let isLoading = $state(false);
	let formRef: HTMLFormElement | undefined = $state();
	let response = $state<FormResultResponse<{ email?: string; pin?: string; message?: string }>>();

	let isDirty = $derived(pin.length > 0);

	$effect(() => {
		if (isModalVisible && formRef) {
			tick().then(() => {
				const input = formRef?.querySelector('input[name="pin"]') as HTMLInputElement;
				input?.focus();
			});
		}
	});

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;
		response = undefined;
		return async ({ result, update }) => {
			if (result.type === 'redirect') {
				await goto(result.location, { invalidateAll: true });
			} else if (result.type === 'failure') {
				response = await handleFormResult(result);
				await update({ reset: false });
				isLoading = false;
			}
		};
	};
</script>

<form
	bind:this={formRef}
	method="POST"
	action="/settings?/change-email"
	use:enhance={handleSubmit}
	novalidate
	class="flex h-full w-full flex-1 flex-col justify-between"
>
	<input type="hidden" name="email" value={newEmail} />
	<div class="flex flex-1 flex-col justify-between gap-5 px-5 pt-5 xxs:px-10">
		<div class="w-full text-sm text-primary sm:text-base">
			{t_user_email_description_step_three(locale)}
		</div>

		<div class="flex w-full flex-1 flex-col items-center justify-center gap-5">
			<div class="flex w-full flex-col gap-5">
				<MyInput
					bind:value={pin}
					label={t_user_email_step_three_pin_label(locale)}
					name="pin"
					type="text"
					placeholder={t_user_email_step_three_pin_placeholder(locale)}
					disabled={isLoading}
					error={response?.data?.pin}
				/>

				<div class="flex items-center gap-2.5 text-sm text-primary">
					<InfoIcon class="shrink-0" size={20} />
					<span>{t_user_email_step_three_info(locale)}</span>
				</div>
			</div>
		</div>
	</div>

	<div
		class="flex header-based-h w-full shrink-0 items-center justify-center border-t border-t-primary bg-gradient-header"
	>
		<MyButton
			type="button"
			onclick={onBack}
			variant="icon"
			size="icon-md"
			class="absolute left-5 text-secondary hover:text-primary hover:underline"
			disabled={isLoading}
			title={t_user_email_step_three_back(locale)}
		>
			<ArrowLeftIcon />
		</MyButton>
		<MyButton
			type="submit"
			disabled={isLoading || !isDirty}
			title={t_user_email_step_three_submit(locale)}
			class="min-w-[160px]"
		>
			{#if isLoading}
				<LoaderCircle class="animate-spin" />
			{:else}
				{t_user_email_step_three_submit(locale)}
			{/if}
		</MyButton>
	</div>
</form>
