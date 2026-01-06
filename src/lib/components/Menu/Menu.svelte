<script lang="ts">
	import { page } from '$app/state';
	import LogoutButton from '$lib/components/Auth/LogoutButton.svelte';
	import NavLink from '$lib/components/Link/NavLink.svelte';
	import MySelect from '$lib/components/Select/MySelect.svelte';
	import { localeEnumAsArray, localeEnumAsLanguages } from '$lib/enums/locale-enum';
	import {
		t_menu_close,
		t_menu_general_section_title,
		t_menu_administration_section_title,
		t_menu_language_switcher_section_title,
		t_menu_item_home,
		t_menu_item_login,
		t_menu_item_registration,
		t_menu_item_public_profile,
		t_menu_item_edit_profile,
		t_menu_item_edit_games,
		t_menu_item_edit_links,
		t_menu_item_account_privacy
	} from '$lib/i18n/messages/t-menu';
	import { closeMenu, menuState } from '$lib/state/menu-state.svelte';
	import { cn } from '$lib/utils/string-utils';
	import MyButton from '$lib/components/Button/MyButton.svelte';
	import {
		Gamepad2Icon,
		HouseIcon,
		LinkIcon,
		ShieldIcon,
		SquarePenIcon,
		UserRoundCheckIcon,
		UserRoundIcon,
		UserRoundPlusIcon,
		XIcon
	} from '@lucide/svelte';
	import { getLocalizedUrl } from '$lib/routes';
	import type { LocaleType } from '$lib/types/locale-type';

	type Props = {
		alwaysVisible?: boolean;
		class?: string;
		overlayClass?: string;
	};

	const { alwaysVisible = false, class: className, overlayClass }: Props = $props();
	const locale: LocaleType = $derived(page.data.locale);
	const canonicalPath: string = $derived(page.data.canonicalPath);
	const user = $derived(page.data.user);

	const menuClass = $derived(
		cn(
			'bg-tertiary flex flex-col gap-10 pb-[120px] pt-10',
			alwaysVisible
				? 'relative'
				: cn(
						'fixed inset-y-0 left-0 z-menu w-full max-w-[420px] origin-left [transform:translate3d(-100%,0,0)] overflow-y-auto transition-transform duration-xs ease-in-out',
						menuState.isOpen && '[transform:translate3d(0,0,0)]'
					),
			className
		)
	);

	$effect(() => {
		if (alwaysVisible) return;

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

{#if !alwaysVisible}
	<button
		type="button"
		aria-label={t_menu_close(locale)}
		class={cn(
			'invisible fixed inset-0 z-menu-overlay w-full cursor-pointer bg-overlay opacity-0 transition-all duration-xs ease-in-out',
			menuState.isOpen && 'visible opacity-100',
			overlayClass
		)}
		onclick={() => closeMenu()}
		onkeydown={handleOverlayKeydown}
	></button>
{/if}

<menu data-testid="menu" class={menuClass}>
	<!-- General Section -->
	<li class="flex flex-col gap-2.5 px-3 lg:px-5">
		<div class="flex items-center justify-between pb-2.5 text-sm text-secondary uppercase">
			{t_menu_general_section_title(locale)}
			<MyButton
				variant="icon"
				size="icon-md"
				data-testid="menu-close"
				onclick={() => closeMenu()}
				title={t_menu_close(locale)}
				class={alwaysVisible ? 'lg:hidden' : ''}
			>
				<XIcon class="size-6" />
			</MyButton>
		</div>
		<!-- Home -->
		<NavLink
			href="/"
			onclick={() => closeMenu()}
			variant="menu"
			size="md"
			activeClass="bg-quaternary"
			title={t_menu_item_home(locale)}
		>
			<HouseIcon class="size-5" />
			<span class="ml-3">{t_menu_item_home(locale)}</span>
		</NavLink>
		{#if !user}
			<!-- Login -->
			<NavLink
				href="/login"
				onclick={() => closeMenu()}
				variant="menu"
				size="md"
				activeClass="bg-quaternary"
				title={t_menu_item_login(locale)}
			>
				<UserRoundCheckIcon class="size-5" />
				<span class="ml-3">{t_menu_item_login(locale)}</span>
			</NavLink>
			<!-- Create Account -->
			<NavLink
				href="/create-account"
				onclick={() => closeMenu()}
				variant="menu"
				size="md"
				activeClass="bg-quaternary"
				title={t_menu_item_registration(locale)}
			>
				<UserRoundPlusIcon class="size-5" />
				<span class="ml-3">{t_menu_item_registration(locale)}</span>
			</NavLink>
		{:else}
			<!-- Public Profile -->
			<NavLink
				href="/profile"
				onclick={() => closeMenu()}
				variant="menu"
				size="md"
				activeClass="bg-quaternary"
				title={t_menu_item_public_profile(locale)}
			>
				<UserRoundIcon class="size-5" />
				<span class="ml-3">{t_menu_item_public_profile(locale)}</span>
			</NavLink>
		{/if}
	</li>

	{#if user}
		<!-- Administration Section -->
		<li class="flex flex-col gap-2.5 px-3 lg:px-5">
			<div class="pb-2.5 text-sm text-secondary uppercase">
				{t_menu_administration_section_title(locale)}
			</div>
			<!-- Edit Profile -->
			<NavLink
				href="/administration/edit-profile"
				onclick={() => closeMenu()}
				variant="menu"
				size="md"
				activeClass="bg-quaternary"
				title={t_menu_item_edit_profile(locale)}
			>
				<SquarePenIcon class="size-5" />
				<span class="ml-3">{t_menu_item_edit_profile(locale)}</span>
			</NavLink>
			<!-- Edit Games -->
			<NavLink
				href="/administration/edit-games"
				onclick={() => closeMenu()}
				variant="menu"
				size="md"
				activeClass="bg-quaternary"
				title={t_menu_item_edit_games(locale)}
			>
				<Gamepad2Icon class="size-5" />
				<span class="ml-3">{t_menu_item_edit_games(locale)}</span>
			</NavLink>
			<!-- Edit Links -->
			<NavLink
				href="/administration/edit-links"
				onclick={() => closeMenu()}
				variant="menu"
				size="md"
				activeClass="bg-quaternary"
				title={t_menu_item_edit_links(locale)}
			>
				<LinkIcon class="size-5" />
				<span class="ml-3">{t_menu_item_edit_links(locale)}</span>
			</NavLink>
			<!-- Account & Privacy -->
			<NavLink
				href="/administration/account-and-privacy"
				onclick={() => closeMenu()}
				variant="menu"
				size="md"
				activeClass="bg-quaternary"
				title={t_menu_item_account_privacy(locale)}
			>
				<ShieldIcon class="size-5" />
				<span class="ml-3">{t_menu_item_account_privacy(locale)}</span>
			</NavLink>
			<!-- Logout -->
			<LogoutButton />
		</li>
	{/if}

	<!-- Language Section -->
	<li class="flex flex-col gap-2.5 px-3 lg:px-5">
		<div class="pb-2.5 text-sm text-secondary uppercase">
			{t_menu_language_switcher_section_title(locale)}
		</div>
		<!-- Language Switcher -->
		<MySelect
			title={t_menu_language_switcher_section_title(locale)}
			value={locale}
			onchange={handleLocaleChange}
		>
			{#each localeEnumAsArray as locale (locale)}
				<option value={locale}>{localeEnumAsLanguages[locale]}</option>
			{/each}
		</MySelect>
	</li>
</menu>
