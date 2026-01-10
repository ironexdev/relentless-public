<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import {
		t_edit_profile_meta_description,
		t_edit_profile_page_title,
		t_edit_profile_title,
		t_edit_profile_username_label,
		t_edit_profile_username_placeholder,
		t_edit_profile_profile_link_label,
		t_edit_profile_profile_link_placeholder,
		t_edit_profile_year_of_birth_label,
		t_edit_profile_year_of_birth_placeholder,
		t_edit_profile_save_button,
		t_edit_profile_update_button,
		t_edit_profile_success,
		t_edit_profile_activation_message
	} from '$lib/i18n/messages/administration/t-edit-profile';
	import type { LocaleType } from '$lib/types/locale-type';
	import type { PageData } from './$types';
	import MyInput from '$lib/components/Input/MyInput.svelte';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import UpdateProfileModal from '$lib/components/Modal/User/Profile/UpdateProfileModal.svelte';
	import { LoaderCircleIcon } from '@lucide/svelte';
	import { type FormResultResponse, handleFormResult } from '$lib/utils/form-utils';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	const locale: LocaleType = $derived(page.data.locale);
	const { data }: { data: PageData } = $props();
	const user = $derived(page.data.user!);

	const isFreshProfile = $derived(
		user.username === null && user.profileLink === null && user.yearOfBirth === null
	);

	let username = $state(data.user?.username ?? '');
	let profileLink = $state(data.user?.profileLink ?? '');
	let yearOfBirth = $state(data.user?.yearOfBirth?.toString() ?? '');
	let profileLinkManuallyEdited = $state(data.user?.username !== null);

	function sanitizeUsername(value: string): string {
		return value
			.replace(/[^A-Za-z0-9_]/g, '')
			.replace(/^_+/, '')
			.replace(/_{2,}/g, '_');
	}

	function usernameToProfileLink(value: string): string {
		return value
			.toLowerCase()
			.replace(/_/g, '-')
			.replace(/[^a-z0-9-]/g, '')
			.replace(/-+/g, '-')
			.replace(/^-|-$/g, '');
	}

	function sanitizeProfileLink(value: string): string {
		return value
			.toLowerCase()
			.replace(/[^a-z-]/g, '')
			.replace(/^-+/, '')
			.replace(/-+/g, '-');
	}

	function sanitizeYearOfBirth(value: string): string {
		return value
			.replace(/[^0-9]/g, '')
			.replace(/^0+/, '')
			.slice(0, 4);
	}

	function handleUsernameInput(e: Event) {
		const input = e.target as HTMLInputElement;
		const sanitized = sanitizeUsername(input.value);
		username = sanitized;
		input.value = sanitized;

		profileLinkManuallyEdited = false;
		profileLink = usernameToProfileLink(sanitized);
	}

	function handleUsernameBlur() {
		username = username.replace(/_+$/, '');
		if (!profileLinkManuallyEdited) {
			profileLink = usernameToProfileLink(username);
		}
	}

	function handleUsernameClear() {
		profileLink = '';
		profileLinkManuallyEdited = false;
	}

	function handleProfileLinkInput(e: Event) {
		const input = e.target as HTMLInputElement;
		const sanitized = sanitizeProfileLink(input.value);
		profileLink = sanitized;
		input.value = sanitized;
		profileLinkManuallyEdited = true;
	}

	function handleProfileLinkBlur() {
		profileLink = profileLink.replace(/-+$/, '');
	}

	function handleProfileLinkClear() {
		profileLinkManuallyEdited = false;
	}

	function handleYearOfBirthInput(e: Event) {
		const input = e.target as HTMLInputElement;
		const sanitized = sanitizeYearOfBirth(input.value);
		yearOfBirth = sanitized;
		input.value = sanitized;
	}

	let isLoading = $state(false);
	let showModal = $state(false);
	let response = $state<FormResultResponse<{
		username?: string;
		profileLink?: string;
		yearOfBirth?: string;
		message?: string;
	}> | null>(null);

	const hasChanges = $derived(
		username !== (user.username ?? '') ||
			profileLink !== (user.profileLink ?? '') ||
			yearOfBirth !== (user.yearOfBirth?.toString() ?? '')
	);

	const isFormValid = $derived(
		username.trim() !== '' && profileLink.trim() !== '' && yearOfBirth.trim() !== ''
	);

	function handleUpdateClick() {
		showModal = true;
	}

	function handleModalSuccess() {
		invalidateAll();
	}

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;
		return async ({ result, update }) => {
			response = await handleFormResult<{
				username?: string;
				profileLink?: string;
				yearOfBirth?: string;
				message?: string;
			}>(result);
			if (result.type === 'success') {
				toast.success(t_edit_profile_success(locale));
				await invalidateAll();
			} else {
				await update({ reset: false });
			}
			isLoading = false;
		};
	};
</script>

<svelte:head>
	<title>{t_edit_profile_page_title(locale)}</title>
	<meta name="description" content={t_edit_profile_meta_description(locale)} />
	<link rel="canonical" href={data.url} />
</svelte:head>

<section class="relative mx-auto flex min-h-full max-w-[800px] flex-1 flex-col px-5 py-10 lg:p-20">
	<div class="flex-1 pb-10">
		<div class="flex w-full flex-col gap-10">
			<h1 class="w-full pb-5 text-left text-xl text-primary sm:text-3xl">
				{t_edit_profile_title(locale)}
			</h1>

			{#if isFreshProfile}
				<div class="rounded bg-toast-success px-5 py-3 text-sm text-toast-success">
					{t_edit_profile_activation_message(locale)}
				</div>
				<form
					method="POST"
					action="/administration/edit-profile?/update-profile"
					use:enhance={handleSubmit}
					novalidate
					class="flex w-full flex-col gap-6"
				>
					<MyInput
						name="username"
						class="uppercase placeholder:normal-case"
						label={t_edit_profile_username_label(locale)}
						placeholder={t_edit_profile_username_placeholder(locale)}
						bind:value={username}
						oninput={handleUsernameInput}
						onblur={handleUsernameBlur}
						onclear={handleUsernameClear}
						error={response?.data?.username}
						maxlength={24}
						required
					/>
					<MyInput
						name="profileLink"
						label={t_edit_profile_profile_link_label(locale)}
						placeholder={t_edit_profile_profile_link_placeholder(locale)}
						bind:value={profileLink}
						oninput={handleProfileLinkInput}
						onblur={handleProfileLinkBlur}
						onclear={handleProfileLinkClear}
						error={response?.data?.profileLink}
						maxlength={24}
						required
					/>
					<MyInput
						name="yearOfBirth"
						label={t_edit_profile_year_of_birth_label(locale)}
						placeholder={t_edit_profile_year_of_birth_placeholder(locale)}
						bind:value={yearOfBirth}
						oninput={handleYearOfBirthInput}
						error={response?.data?.yearOfBirth}
						maxlength={4}
						required
					/>
					<div class="flex justify-center pt-4">
						<MyButton
							type="submit"
							disabled={isLoading || !isFormValid}
							title={t_edit_profile_save_button(locale)}
							class="w-[160px]"
						>
							{#if isLoading}
								<LoaderCircleIcon class="animate-spin" />
							{:else}
								{t_edit_profile_save_button(locale)}
							{/if}
						</MyButton>
					</div>
				</form>
			{:else}
				<div class="flex w-full flex-col gap-6">
					<MyInput
						name="username"
						class="uppercase placeholder:normal-case"
						label={t_edit_profile_username_label(locale)}
						placeholder={t_edit_profile_username_placeholder(locale)}
						bind:value={username}
						oninput={handleUsernameInput}
						onblur={handleUsernameBlur}
						onclear={handleUsernameClear}
						maxlength={24}
						required
					/>
					<MyInput
						name="profileLink"
						label={t_edit_profile_profile_link_label(locale)}
						placeholder={t_edit_profile_profile_link_placeholder(locale)}
						bind:value={profileLink}
						oninput={handleProfileLinkInput}
						onblur={handleProfileLinkBlur}
						onclear={handleProfileLinkClear}
						maxlength={24}
						required
					/>
					<MyInput
						name="yearOfBirth"
						label={t_edit_profile_year_of_birth_label(locale)}
						placeholder={t_edit_profile_year_of_birth_placeholder(locale)}
						bind:value={yearOfBirth}
						oninput={handleYearOfBirthInput}
						maxlength={4}
						required
					/>
					<div class="flex justify-center pt-4">
						<MyButton
							type="button"
							onclick={handleUpdateClick}
							disabled={!hasChanges || !isFormValid}
							title={t_edit_profile_update_button(locale)}
							class="w-[160px]"
						>
							{t_edit_profile_update_button(locale)}
						</MyButton>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<UpdateProfileModal
	bind:showModal
	email={user.email}
	{username}
	{profileLink}
	yearOfBirth={parseInt(yearOfBirth)}
	onSuccess={handleModalSuccess}
/>
