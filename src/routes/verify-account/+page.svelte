<script lang="ts">
	import { page } from '$app/state';
	import VerifyRegistrationForm from '$lib/components/Auth/VerifyRegistrationForm.svelte';
	import {
		t_verify_registration_meta_description,
		t_verify_registration_page_title,
		t_verify_registration_title
	} from '$lib/i18n/messages/t-verify-registration';
	import type { LocaleType } from '$lib/types/locale-type';
	import type { PageData } from '../../../.svelte-kit/types/src/routes/create-account/$types';
	import Header from '$lib/components/Header.svelte';

	const locale: LocaleType = $derived(page.data.locale);
	const { data }: { data: PageData } = $props();
	const email = $derived(page.data.email);
</script>

<svelte:head>
	<title>{t_verify_registration_page_title(locale)}</title>
	<meta name="description" content={t_verify_registration_meta_description(locale)} />
	<link rel="canonical" href={data.url} />
</svelte:head>

<main class="ntw-main">
	<div class="relative mx-auto flex min-h-full w-full max-w-[640px] min-w-[320px] flex-1 flex-col">
		<div class="flex h-[35vh] w-full items-center justify-center">
			<h1 class="w-full text-center text-3xl text-primary sm:text-4xl">
				{t_verify_registration_title(locale)}
			</h1>
		</div>
		<div
			class="flex flex-1 flex-col gap-10 border-t border-primary bg-tertiary px-5 py-12 sm:border-x sm:px-10"
		>
			<VerifyRegistrationForm {email} />
		</div>
	</div>
</main>

<Header />
