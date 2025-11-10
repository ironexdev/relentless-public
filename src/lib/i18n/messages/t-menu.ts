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

export function t_menu_title(locale: LocaleType): string {
	const messages = {
		en: 'Main Menu',
		cs: 'Hlavní menu'
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

export function t_menu_item_profile(locale: LocaleType): string {
	const messages = {
		en: 'Profile',
		cs: 'Profil'
	};

	return t(messages, locale);
}

export function t_menu_item_settings(locale: LocaleType): string {
	const messages = {
		en: 'Settings',
		cs: 'Nastavení'
	};

	return t(messages, locale);
}
