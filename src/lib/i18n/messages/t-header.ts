import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

export function t_header_login_button(locale: LocaleType): string {
	const messages = {
		en: 'Login',
		cs: 'Přihlásit se'
	};

	return t(messages, locale);
}

export function t_header_registration_button(locale: LocaleType): string {
	const messages = {
		en: 'Create Account',
		cs: 'Vytvořit účet'
	};

	return t(messages, locale);
}
