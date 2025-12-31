import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

export function t_settings_title(locale: LocaleType): string {
	const messages = {
		en: 'Settings',
		cs: 'Nastavení'
	};

	return t(messages, locale);
}

export function t_settings_email_label(locale: LocaleType): string {
	const messages = {
		en: 'Email',
		cs: 'Email'
	};

	return t(messages, locale);
}

export function t_settings_email_button_title(locale: LocaleType): string {
	const messages = {
		en: 'Change My Email',
		cs: 'Změnit můj email'
	};

	return t(messages, locale);
}

export function t_settings_delete_account_label(locale: LocaleType): string {
	const messages = {
		en: 'Delete My Account',
		cs: 'Smazat můj účet'
	};

	return t(messages, locale);
}

export function t_settings_delete_account_description(locale: LocaleType, date: Date): string {
	const messages = {
		en: 'Member since {date, date, short}',
		cs: 'Členem od {date, date, short}'
	};

	return t(messages, locale, 1, { date });
}

export function t_settings_delete_account_button_title(locale: LocaleType): string {
	const messages = {
		en: 'Delete My Account',
		cs: 'Smazat můj účet'
	};

	return t(messages, locale);
}

export function t_settings_verification_pin_sent(locale: LocaleType): string {
	const messages = {
		en: 'A verification PIN has been sent to your email',
		cs: 'Ověřovací PIN byl odeslán na tvůj e-mail'
	};

	return t(messages, locale);
}
