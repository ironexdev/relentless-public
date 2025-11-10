import { APP_TITLE } from '$lib/config';
import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

const appTitle = APP_TITLE;

export function t_verify_registration_page_title(locale: LocaleType) {
	const messages = {
		en: '{appTitle} | Verify Account',
		cs: '{appTitle} | Ověřit Účet'
	};

	return t(messages, locale, 1, { appTitle });
}

export function t_verify_registration_meta_description(locale: LocaleType): string {
	const messages = {
		en: 'Verify Account',
		cs: 'Ověřit Účet'
	};

	return t(messages, locale);
}

export function t_verify_registration_title(locale: LocaleType): string {
	const messages = {
		en: 'Verify Account',
		cs: 'Ověřit Účet'
	};

	return t(messages, locale);
}

export function t_verify_registration_form_email_label(locale: LocaleType): string {
	const messages = {
		en: 'EMAIL',
		cs: 'EMAIL'
	};

	return t(messages, locale);
}

export function t_verify_registration_form_email_placeholder(locale: LocaleType): string {
	const messages = {
		en: 'name@domain.com',
		cs: 'name@domain.com'
	};

	return t(messages, locale);
}

export function t_verify_registration_form_pin_label(locale: LocaleType): string {
	const messages = {
		en: 'PIN',
		cs: 'PIN'
	};

	return t(messages, locale);
}

export function t_verify_registration_form_pin_placeholder(locale: LocaleType): string {
	const messages = {
		en: 'Enter the PIN',
		cs: 'Zadej PIN'
	};

	return t(messages, locale);
}

export function t_verify_registration_form_submit_button(locale: LocaleType): string {
	const messages = {
		en: 'Create Account',
		cs: 'Vytvořit účet'
	};

	return t(messages, locale);
}

export function t_verify_registration_form_back_button(locale: LocaleType): string {
	const messages = {
		en: 'Go Back',
		cs: 'Jít zpět'
	};

	return t(messages, locale);
}

export function t_verify_registration_invalid_or_expired_pin(locale: LocaleType): string {
	const messages = {
		en: 'Invalid or expired PIN.',
		cs: 'Neplatný nebo expirovaný PIN.'
	};

	return t(messages, locale);
}

export function t_verify_registration_success(locale: LocaleType): string {
	const messages = {
		en: 'Welcome to your new account!',
		cs: 'Vítej ve svém novém ůčtu!'
	};

	return t(messages, locale);
}
