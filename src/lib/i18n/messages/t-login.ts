import { APP_TITLE } from '$lib/config';
import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

const appTitle = APP_TITLE;

export function t_login_page_title(locale: LocaleType) {
	const messages = {
		en: '{appTitle} | Login',
		cs: '{appTitle} | Přihlášení'
	};

	return t(messages, locale, 1, { appTitle });
}

export function t_login_meta_description(locale: LocaleType): string {
	const messages = {
		en: 'Login to access your account.',
		cs: 'Přihlaš se pro přístup ke svému účtu.'
	};

	return t(messages, locale);
}

export function t_login_title(locale: LocaleType): string {
	const messages = {
		en: 'Login',
		cs: 'Přihlášení'
	};

	return t(messages, locale);
}

export function t_login_form_email_label(locale: LocaleType): string {
	const messages = {
		en: 'EMAIL',
		cs: 'EMAIL'
	};

	return t(messages, locale);
}

export function t_login_form_email_placeholder(locale: LocaleType): string {
	const messages = {
		en: 'name@domain.com',
		cs: 'name@domain.com'
	};

	return t(messages, locale);
}

export function t_login_form_submit_button(locale: LocaleType): string {
	const messages = {
		en: 'Send PIN',
		cs: 'Odeslat PIN'
	};

	return t(messages, locale);
}

export function t_login_form_skip_button(locale: LocaleType): string {
	const messages = {
		en: 'Already have the PIN?',
		cs: 'Už máš PIN?'
	};

	return t(messages, locale);
}

export function t_login_verification_pin_sent(locale: LocaleType): string {
	const messages = {
		en: 'A verification PIN has been sent to your email',
		cs: 'Ověřovací PIN byl odeslán na tvůj e-mail'
	};

	return t(messages, locale);
}
