<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import MyInput from '$lib/components/Input/MyInput.svelte';
	import NavLink from '$lib/components/Link/NavLink.svelte';
	import {
		t_registration_form_submit_button,
		t_registration_form_email_label,
		t_registration_form_email_placeholder,
		t_registration_form_skip_button
	} from '$lib/i18n/messages/t-registration';
	import type { LocaleType } from '$lib/types/locale-type';
	import { type FormResultResponse, handleFormResult } from '$lib/utils/form-utils';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { LoaderCircle } from '@lucide/svelte';

	const locale: LocaleType = $derived(page.data.locale);
	let response = $state<FormResultResponse<{ email?: string; message?: string }>>();
	let loading = $state(false);
	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			if (result.type === 'redirect') {
				goto(result.location, { invalidateAll: true });
			} else {
				response = await handleFormResult(result);
				await update({ reset: false });
			}
			loading = false;
		};
	};
</script>

<form
	method="POST"
	action="/auth?/registration"
	use:enhance={handleSubmit}
	class="flex flex-col items-center gap-10"
>
	<MyInput
		label={t_registration_form_email_label(locale)}
		name="email"
		type="email"
		autocomplete="email"
		placeholder={t_registration_form_email_placeholder(locale)}
		error={response?.data?.email}
	/>
	<MyButton
		type="submit"
		title={t_registration_form_submit_button(locale)}
		class="w-[160px]"
		disabled={loading}
	>
		{#if loading}
			<LoaderCircle class="animate-spin" />
		{:else}
			{t_registration_form_submit_button(locale)}
		{/if}
	</MyButton>
	<NavLink
		title={t_registration_form_skip_button(locale)}
		href="/verify-account"
		class="ml-auto text-secondary hover:underline"
		>{t_registration_form_skip_button(locale)}</NavLink
	>
</form>
