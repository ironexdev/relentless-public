<script lang="ts">
	import { page } from '$app/state';
	import RegistrationForm from '$lib/components/Auth/RegistrationForm.svelte';
	import {
		t_registration_info,
		t_registration_meta_description,
		t_registration_page_title,
		t_registration_title
	} from '$lib/i18n/messages/t-registration';
	import type { LocaleType } from '$lib/types/locale-type';
	import type { PageData } from './$types';
	import Footer from '$lib/components/Footer.svelte';
	import Menu from '$lib/components/Menu/Menu.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import MenuToggleButton from '$lib/components/Menu/MenuToggleButton.svelte';

	const locale: LocaleType = $derived(page.data.locale);
	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{t_registration_page_title(locale)}</title>
	<meta name="description" content={t_registration_meta_description(locale)} />
	<link rel="canonical" href={data.url} />
</svelte:head>

<main class="ntw-main">
	<section
		class="relative mx-auto flex min-h-full w-full max-w-[640px] min-w-[320px] flex-1 flex-col"
	>
		<div class="flex h-[35vh] w-full items-center justify-center">
			<h1 class="w-full text-center text-3xl text-primary sm:text-4xl">
				{t_registration_title(locale)}
			</h1>
		</div>
		<div
			class="flex flex-1 flex-col gap-10 border-t border-primary bg-tertiary px-5 py-12 sm:border-x sm:px-10"
		>
			<p class="text-sm text-secondary">
				{t_registration_info(locale)}
			</p>
			<RegistrationForm />
		</div>
	</section>
</main>

<Footer>
	<MenuToggleButton />
	<Logo class="absolute inset-0 m-auto" /></Footer
>

<Menu />
