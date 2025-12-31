<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/state';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import MyInput from '$lib/components/Input/MyInput.svelte';
	import NavLink from '$lib/components/Link/NavLink.svelte';
	import type { LocaleType } from '$lib/types/locale-type';
	import { ArrowLeft, LoaderCircle } from '@lucide/svelte';
	import {
		t_verify_login_form_submit_button,
		t_verify_login_form_email_label,
		t_verify_login_form_email_placeholder,
		t_verify_login_form_pin_label,
		t_verify_login_form_pin_placeholder,
		t_verify_login_form_back_button
	} from '$lib/i18n/messages/t-verify-login';
	import { type FormResultResponse, handleFormResult } from '$lib/utils/form-utils';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { t_login_form_skip_button } from '$lib/i18n/messages/t-login.ts';

	type Props = {
		email: string;
	};

	let { email }: Props = $props();
	const locale: LocaleType = $derived(page.data.locale);
	let response = $state<FormResultResponse<{ email?: string; pin?: string }>>();
	let loading = $state(false);
	const handleSubmit: SubmitFunction = () => {
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
	action="/auth?/verify-login"
	use:enhance={handleSubmit}
	class="flex flex-col items-center gap-10"
>
	<MyInput
		label={t_verify_login_form_email_label(locale)}
		name="email"
		type="email"
		autocomplete="email"
		placeholder={t_verify_login_form_email_placeholder(locale)}
		error={response?.data?.email}
		bind:value={email}
	/>

	<MyInput
		label={t_verify_login_form_pin_label(locale)}
		name="pin"
		type="text"
		autofocus={true}
		placeholder={t_verify_login_form_pin_placeholder(locale)}
		error={response?.data?.pin}
	/>
	<div class="relative flex w-full justify-center">
		<MyButton
			type="submit"
			title={t_verify_login_form_submit_button(locale)}
			class="w-[160px]"
			disabled={loading}
		>
			{#if loading}
				<LoaderCircle class="animate-spin" />
			{:else}
				{t_verify_login_form_submit_button(locale)}
			{/if}
		</MyButton>
	</div>
	<NavLink
		title={t_verify_login_form_back_button(locale)}
		href="/login"
		class="mr-auto text-sm text-secondary hover:underline"
	>
		{t_verify_login_form_back_button(locale)}
	</NavLink>
</form>
