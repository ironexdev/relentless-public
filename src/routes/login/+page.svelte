<script lang="ts">
	import { page } from '$app/state';
	import LoginForm from '$lib/components/Auth/LoginForm.svelte';
	import {
		t_login_meta_description,
		t_login_page_title,
		t_login_title
	} from '$lib/i18n/messages/t-login';
	import type { LocaleType } from '$lib/types/locale-type';
	import type { PageData } from '../../../.svelte-kit/types/src/routes/create-account/$types';
	import Footer from '$lib/components/Footer.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import MenuToggleButton from '$lib/components/Menu/MenuToggleButton.svelte';
	import Menu from '$lib/components/Menu/Menu.svelte';

	const locale: LocaleType = $derived(page.data.locale);
	const { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{t_login_page_title(locale)}</title>
	<meta name="description" content={t_login_meta_description(locale)} />
	<link rel="canonical" href={data.url} />
</svelte:head>

<main class="ntw-main">
	<section
		class="relative mx-auto flex min-h-full w-full max-w-[640px] min-w-[320px] flex-1 flex-col"
	>
		<div class="flex h-[35vh] w-full items-center justify-center">
			<h1 class="w-full text-center text-3xl text-primary sm:text-4xl">
				{t_login_title(locale)}
			</h1>
		</div>
		<div class="flex-1 border-x border-t border-primary bg-tertiary px-5 py-12 sm:px-10">
			<LoginForm />
		</div>
	</section>
</main>

<Footer>
	<MenuToggleButton />
	<Logo class="absolute inset-0 m-auto" /></Footer
>

<Menu />
