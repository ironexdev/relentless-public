<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { page } from '$app/state';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import MyInput from '$lib/components/Input/MyInput.svelte';
	import MyCheckbox from '$lib/components/Input/MyCheckbox.svelte';
	import UserProfileImage from '$lib/components/User/UserProfileImage.svelte';
	import NavLink from '$lib/components/Link/NavLink.svelte';
	import type { LocaleType } from '$lib/types/locale-type';
	import { ArrowLeftIcon, LoaderCircle } from '@lucide/svelte';
	import {
		t_verify_registration_form_submit_button,
		t_verify_registration_form_email_label,
		t_verify_registration_form_email_placeholder,
		t_verify_registration_form_pin_label,
		t_verify_registration_form_pin_placeholder,
		t_verify_registration_form_back_button,
		t_verify_registration_form_birth_year_label,
		t_verify_registration_form_birth_year_placeholder,
		t_verify_registration_form_terms_label,
		t_verify_registration_form_terms_required,
		t_verify_registration_image_explanation
	} from '$lib/i18n/messages/t-verify-registration';
	import { type FormResultResponse, handleFormResult } from '$lib/utils/form-utils';
	import type { SubmitFunction } from '@sveltejs/kit';

	type Props = {
		email: string;
	};

	type FormErrors = {
		email?: string;
		pin?: string;
		birthYear?: string;
		terms?: string;
	};

	let { email }: Props = $props();
	const locale: LocaleType = $derived(page.data.locale);
	let response = $state<FormResultResponse<FormErrors>>();
	let loading = $state(false);

	let pictureFile = $state<File | null>(null);
	let photoFile = $state<File | null>(null);
	let picturePreviewUrl = $state<string | null>(null);
	let photoPreviewUrl = $state<string | null>(null);

	let termsAccepted = $state(false);
	let termsError = $state<string | undefined>(undefined);

	const handleSubmit: SubmitFunction = ({ formData }) => {
		termsError = undefined;

		if (!termsAccepted) {
			termsError = t_verify_registration_form_terms_required(locale);
			return async () => {};
		}

		if (pictureFile) {
			formData.append('picture', pictureFile);
		}

		if (photoFile) {
			formData.append('photo', photoFile);
		}

		loading = true;
		return async ({ result }) => {
			if (result.type === 'redirect') {
				window.location.href = result.location;
				return;
			}

			response = await handleFormResult(result);

			if (result.type === 'error') {
				loading = false;
				return;
			}

			await applyAction(result);
			loading = false;
		};
	};
</script>

<form
	method="POST"
	action="/?/verify-registration"
	use:enhance={handleSubmit}
	enctype="multipart/form-data"
	class="flex flex-col items-center gap-10"
>
	<MyInput
		label={t_verify_registration_form_email_label(locale)}
		name="email"
		type="email"
		autocomplete="email"
		placeholder={t_verify_registration_form_email_placeholder(locale)}
		error={response?.data?.email}
		bind:value={email}
	/>

	<MyInput
		label={t_verify_registration_form_pin_label(locale)}
		name="pin"
		type="text"
		placeholder={t_verify_registration_form_pin_placeholder(locale)}
		error={response?.data?.pin}
	/>

	<MyCheckbox name="terms" bind:checked={termsAccepted} error={termsError}>
		{@html t_verify_registration_form_terms_label(locale)}
	</MyCheckbox>

	<div class="relative mt-10 flex w-full justify-center">
		<MyButton
			type="button"
			variant="icon"
			size="icon-md"
			class="absolute left-0 ml-[-10px] text-secondary hover:text-primary"
			title={t_verify_registration_form_back_button(locale)}
		>
			<NavLink title={t_verify_registration_form_back_button(locale)} href="/create-account">
				<ArrowLeftIcon />
			</NavLink>
		</MyButton>
		<MyButton
			type="submit"
			title={t_verify_registration_form_submit_button(locale)}
			class="w-[160px]"
			disabled={loading}
		>
			{#if loading}
				<LoaderCircle class="animate-spin" />
			{:else}
				{t_verify_registration_form_submit_button(locale)}
			{/if}
		</MyButton>
	</div>
</form>
