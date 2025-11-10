<script lang="ts">
	import LogoutButton from '$lib/components/Auth/LogoutButton.svelte';
	import NavLink from '$lib/components/Link/NavLink.svelte';
	import Menu from '$lib/components/Menu/Menu.svelte';
	import MenuToggleButton from '$lib/components/Menu/MenuToggleButton.svelte';
	import ThemeSwitchButton from '$lib/components/ThemeSwitchButton.svelte';
	import { t_header_login_button } from '$lib/i18n/messages/t-header';
	import { t_header_registration_button } from '$lib/i18n/messages/t-header';
	import type { LocaleType } from '$lib/types/locale-type';
	import { UserRoundCheckIcon, UserRoundPlusIcon } from '@lucide/svelte';
	import { page } from '$app/state';

	type Props = {
		class?: string;
	};

	const { class: className = 'ntw-header' }: Props = $props();
	const user = $derived(page.data.user);
	const locale: LocaleType = $derived(page.data.locale);
</script>

<header class={className}>
	<div class="flex size-full items-center gap-5">
		<MenuToggleButton />
		<div class="ml-auto flex items-center">
			{#if user}
				<LogoutButton size="sm" />
				<div class="mx-3 h-[40px] w-0 border-fade-t-both-primary"></div>
			{:else}
				<NavLink
					href="/login"
					class="flex items-center gap-3 rounded-full hover:bg-quaternary"
					title={t_header_login_button(locale)}
					activeClass="bg-quaternary"
					size="sm"
				>
					<UserRoundCheckIcon class="size-5" />
					<span class="hidden lg:block">{t_header_login_button(locale)}</span>
				</NavLink>
				<div class="mx-3 h-[40px] w-0 border-fade-t-both-primary"></div>
				<NavLink
					href="/create-account"
					class="flex items-center gap-3 rounded-full hover:bg-quaternary "
					activeClass="bg-quaternary"
					title={t_header_registration_button(locale)}
					size="sm"
				>
					<UserRoundPlusIcon class="size-5" />
					<span class="hidden lg:block">{t_header_registration_button(locale)}</span>
				</NavLink>
				<div class="mx-3 h-[40px] w-0 border-fade-t-both-primary"></div>
			{/if}
			<ThemeSwitchButton />
		</div>
	</div>
	<Menu />
</header>
