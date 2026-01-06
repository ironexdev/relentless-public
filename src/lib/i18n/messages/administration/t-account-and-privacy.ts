import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';
import { APP_TITLE } from '$lib/config.ts';

export function t_account_and_privacy_title(locale: LocaleType): string {
	const messages = {
		en: 'Account & Privacy',
		cs: 'Účet a soukromí'
	};

	return t(messages, locale);
}

export function t_account_and_privacy_username_label(locale: LocaleType): string {
	const messages = {
		en: 'Username',
		cs: 'Username'
	};

	return t(messages, locale);
}

export function t_account_and_privacy_email_label(locale: LocaleType): string {
	const messages = {
		en: 'Email',
		cs: 'Email'
	};

	return t(messages, locale);
}

export function t_account_and_privacy_email_button_title(locale: LocaleType): string {
	const messages = {
		en: 'Change My Email',
		cs: 'Změnit můj email'
	};

	return t(messages, locale);
}

export function t_account_and_privacy_delete_account_label(locale: LocaleType): string {
	const messages = {
		en: 'Delete My Account',
		cs: 'Smazat můj účet'
	};

	return t(messages, locale);
}

export function t_account_and_privacy_delete_account_description(
	locale: LocaleType,
	date: Date
): string {
	const messages = {
		en: 'Member since {date, date, short}',
		cs: 'Členem od {date, date, short}'
	};

	return t(messages, locale, 1, { date });
}

export function t_account_and_privacy_delete_account_button_title(locale: LocaleType): string {
	const messages = {
		en: 'Delete My Account',
		cs: 'Smazat můj účet'
	};

	return t(messages, locale);
}

export function t_account_and_privacy_page_title(locale: LocaleType) {
	const messages = {
		en: 'Account & Privacy | {appTitle}',
		cs: 'Účet a soukromí | {appTitle}'
	};

	return t(messages, locale, 1, { appTitle: APP_TITLE });
}

export function t_account_and_privacy_meta_description(locale: LocaleType): string {
	const messages = {
		en: 'Manage your account settings and privacy preferences.',
		cs: 'Spravujte nastavení svého účtu a soukromí.'
	};

	return t(messages, locale);
}
