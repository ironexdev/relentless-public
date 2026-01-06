import { t } from '$lib/t';
import type { LocaleType } from '$lib/types/locale-type';

export function t_menu_toggle(locale: LocaleType): string {
	const messages = {
		en: 'Toggle Menu',
		cs: 'Zobrazit/skrýt menu'
	};

	return t(messages, locale);
}

export function t_menu_close(locale: LocaleType): string {
	const messages = {
		en: 'Close Menu',
		cs: 'Zavřít menu'
	};

	return t(messages, locale);
}

export function t_menu_general_section_title(locale: LocaleType): string {
	const messages = {
		en: 'General',
		cs: 'Obecné'
	};

	return t(messages, locale);
}

export function t_menu_administration_section_title(locale: LocaleType): string {
	const messages = {
		en: 'Administration',
		cs: 'Administrace'
	};

	return t(messages, locale);
}

export function t_menu_language_switcher_section_title(locale: LocaleType): string {
	const messages = {
		en: 'Language',
		cs: 'Jazyk'
	};

	return t(messages, locale);
}

export function t_menu_item_home(locale: LocaleType): string {
	const messages = {
		en: 'Home',
		cs: 'Úvod'
	};

	return t(messages, locale);
}

export function t_menu_item_login(locale: LocaleType): string {
	const messages = {
		en: 'Login',
		cs: 'Přihlášení'
	};

	return t(messages, locale);
}

export function t_menu_item_registration(locale: LocaleType): string {
	const messages = {
		en: 'Create Account',
		cs: 'Vytvořit účet'
	};

	return t(messages, locale);
}

export function t_menu_item_public_profile(locale: LocaleType): string {
	const messages = {
		en: 'Public Profile',
		cs: 'Veřejný profil'
	};

	return t(messages, locale);
}

export function t_menu_item_edit_profile(locale: LocaleType): string {
	const messages = {
		en: 'Edit Profile',
		cs: 'Upravit profil'
	};

	return t(messages, locale);
}

export function t_menu_item_edit_games(locale: LocaleType): string {
	const messages = {
		en: 'Edit Games',
		cs: 'Upravit hry'
	};

	return t(messages, locale);
}

export function t_menu_item_edit_links(locale: LocaleType): string {
	const messages = {
		en: 'Edit Links',
		cs: 'Upravit odkazy'
	};

	return t(messages, locale);
}

export function t_menu_item_account_privacy(locale: LocaleType): string {
	const messages = {
		en: 'Account & Privacy',
		cs: 'Účet a soukromí'
	};

	return t(messages, locale);
}
