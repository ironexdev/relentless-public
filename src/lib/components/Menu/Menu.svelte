<script lang="ts">
	import { page } from '$app/state';
	import LogoutButton from '$lib/components/Auth/LogoutButton.svelte';
	import NavLink from '$lib/components/Link/NavLink.svelte';
	import MySelect from '$lib/components/Select/MySelect.svelte';
	import { localeEnumAsArray, localeEnumAsLanguages } from '$lib/enums/locale-enum';
	import { t_language_switcher_title } from '$lib/i18n/messages/t-language-switcher';
	import {
		t_menu_close,
		t_menu_item_home,
		t_menu_item_login,
		t_menu_item_profile,
		t_menu_item_registration,
		t_menu_item_settings,
		t_menu_title
	} from '$lib/i18n/messages/t-menu';
	import { closeMenu, menuState } from '$lib/state/menu-state.svelte';
	import { cn } from '$lib/utils/string-utils';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import {
		HouseIcon,
		UserRoundCheckIcon,
		UserRoundCogIcon,
		UserRoundIcon,
		UserRoundPlusIcon,
		XIcon
	} from '@lucide/svelte';
	import { getLocalizedUrl } from '$lib/routes';
	import type { LocaleType } from '$lib/types/locale-type';

	const locale: LocaleType = $derived(page.data.locale);
	const canonicalPath: string = $derived(page.data.canonicalPath);
	const user = $derived(page.data.user);

	$effect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeMenu();
			}
		};

		if (menuState.isOpen) {
			document.body.style.overflow = 'hidden';
			document.addEventListener('keydown', handleKeyPress);
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
			document.body.style.overflow = '';
		};
	});

	function handleLocaleChange(event: Event) {
		const selectElement = event.currentTarget as HTMLSelectElement;
		const newLocale = selectElement.value as LocaleType;
		window.location.href = getLocalizedUrl(newLocale, canonicalPath);
	}

	function handleOverlayKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			close();
		}
	}
</script>

<button
	type="button"
	aria-label={t_menu_close(locale)}
	class={cn(
		'invisible fixed inset-0 z-menu-overlay w-full cursor-pointer bg-overlay opacity-0 transition-all duration-xs ease-in-out',
		menuState.isOpen && 'visible opacity-100'
	)}
	onclick={() => closeMenu()}
	onkeydown={handleOverlayKeydown}
></button>

<menu
	data-testid="menu"
	class={cn(
		'fixed inset-x-0 bottom-0 z-menu mx-auto max-w-[480px] origin-bottom [transform:translate3d(0,100%,0)] overflow-y-auto bg-primary bg-tertiary pb-[120px] transition-transform duration-xs ease-in-out',
		menuState.isOpen && '[transform:translate3d(0,0,0)]'
	)}
>
	<li class="flex header-based-h items-center justify-between px-5">
		<div class="text-sm text-secondary uppercase">{t_menu_title(locale)}</div>
		<MyButton
			variant="icon"
			size="icon-md"
			data-testid="menu-close"
			onclick={() => closeMenu()}
			title={t_menu_close(locale)}
		>
			<XIcon class="size-6" />
		</MyButton>
	</li>
	<li class="px-3 lg:px-5">
		<NavLink
			href="/"
			onclick={() => closeMenu()}
			variant="menu"
			size="md"
			activeClass="bg-quaternary"
			title={t_menu_item_home(locale)}
		>
			<HouseIcon class="size-5" />
			<span class="ml-3">
				{t_menu_item_home(locale)}
			</span>
		</NavLink>

		{#if !user}
			<NavLink
				href="/login"
				onclick={() => closeMenu()}
				size="md"
				variant="menu"
				class="mt-2.5"
				activeClass="bg-quaternary"
				title={t_menu_item_login(locale)}
			>
				<UserRoundCheckIcon class="size-5" />
				<span class="ml-3">
					{t_menu_item_login(locale)}
				</span>
			</NavLink>
			<NavLink
				href="/create-account"
				onclick={() => closeMenu()}
				size="md"
				variant="menu"
				class="mt-2.5"
				activeClass="bg-quaternary"
				title={t_menu_item_registration(locale)}
			>
				<UserRoundPlusIcon class="size-5" />
				<span class="ml-3">
					{t_menu_item_registration(locale)}
				</span>
			</NavLink>
		{:else}
			<NavLink
				href="/profile"
				onclick={() => closeMenu()}
				class="mt-2.5 w-full justify-start"
				size="md"
				variant="menu"
				activeClass="bg-quaternary"
				title={t_menu_item_profile(locale)}
			>
				<UserRoundIcon class="size-5" />
				<span class="ml-3">
					{t_menu_item_profile(locale)}
				</span>
			</NavLink>
			<NavLink
				href="/settings"
				onclick={() => closeMenu()}
				class="mt-2.5 w-full justify-start"
				size="md"
				variant="menu"
				activeClass="bg-quaternary"
				title={t_menu_item_settings(locale)}
			>
				<UserRoundCogIcon class="size-5" />
				<span class="ml-3">
					{t_menu_item_settings(locale)}
				</span>
			</NavLink>
			<LogoutButton class="mt-2.5" />
		{/if}
	</li>
	<li class="mt-8">
		<div class="border-fade-t-both-primary"></div>
	</li>
	<li class="px-3 lg:px-5">
		<div class="flex header-based-h items-center text-sm text-secondary uppercase">
			{t_language_switcher_title(locale)}
		</div>
		<MySelect
			title={t_language_switcher_title(locale)}
			value={locale}
			onchange={handleLocaleChange}
		>
			{#each localeEnumAsArray as locale (locale)}
				<option value={locale}>{localeEnumAsLanguages[locale]}</option>
			{/each}
		</MySelect>
	</li>
</menu>
