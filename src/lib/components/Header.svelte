<script lang="ts">
	import NavLink from '$lib/components/Link/NavLink.svelte';
	import Menu from '$lib/components/Menu/Menu.svelte';
	import MenuToggleButton from '$lib/components/Menu/MenuToggleButton.svelte';
	import { t_header_login_button } from '$lib/i18n/messages/t-header.ts';
	import { t_header_registration_button } from '$lib/i18n/messages/t-header.ts';
	import type { LocaleType } from '$lib/types/locale-type';
	import { UserRoundCheckIcon, UserRoundPlusIcon } from '@lucide/svelte';
	import { page } from '$app/state';
	import Logo from '$lib/components/Logo.svelte';

	type Props = {
		class?: string;
	};

	const { class: className = 'ntw-header' }: Props = $props();
	const user = $derived(page.data.user);
	const locale: LocaleType = $derived(page.data.locale);
</script>

<header class={className}>
	<div class="mx-auto flex size-full max-w-[1440px] items-center gap-5 px-5 2xl:px-0">
		<MenuToggleButton />
		<Logo class="absolute inset-0 m-auto" />
		<div class="ml-auto flex items-center">
			{#if user}
				<div class="mx-auto size-[48px] rounded-full border border-secondary">
					<img class="size-full rounded-full" src="/media/user-photo.webp" />
				</div>
			{:else}
				<div class="flex items-center justify-center gap-5">
					<NavLink
						href="/login"
						class="flex size-10 items-center gap-3 rounded-full px-0 text-sm hover:bg-quaternary lg:size-9 lg:w-auto lg:px-5"
						activeClass="bg-quaternary"
						title={t_header_login_button(locale)}
						size="blank"
					>
						<UserRoundCheckIcon class="size-5" />
						<span class="hidden lg:block">{t_header_login_button(locale)}</span>
					</NavLink>
					<NavLink
						href="/create-account"
						class="flex size-10 items-center gap-3 rounded-full px-0 text-sm hover:bg-quaternary lg:size-9 lg:w-auto lg:px-5"
						activeClass="bg-quaternary"
						title={t_header_registration_button(locale)}
						size="blank"
					>
						<UserRoundPlusIcon class="size-5" />
						<span class="hidden lg:block">{t_header_registration_button(locale)}</span>
					</NavLink>
				</div>
			{/if}
		</div>
	</div>
	<Menu />
</header>
