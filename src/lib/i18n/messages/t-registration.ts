import { APP_TITLE } from '$lib/config';
import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

export function t_registration_page_title(locale: LocaleType) {
	const messages = {
		en: 'Create Account | {appTitle}',
		cs: 'Vytvořit Účet | {appTitle}'
	};

	return t(messages, locale, 1, { appTitle: APP_TITLE });
}

export function t_registration_meta_description(locale: LocaleType): string {
	const messages = {
		en: 'Create your new account.',
		cs: 'Vytvoř si svůj nový účet.'
	};

	return t(messages, locale);
}

export function t_registration_title(locale: LocaleType): string {
	const messages = {
		en: 'Create Account',
		cs: 'Vytvořit Účet'
	};

	return t(messages, locale);
}

export function t_registration_form_email_label(locale: LocaleType): string {
	const messages = {
		en: 'EMAIL',
		cs: 'EMAIL'
	};

	return t(messages, locale);
}

export function t_registration_form_email_placeholder(locale: LocaleType): string {
	const messages = {
		en: 'name@domain.com',
		cs: 'name@domain.com'
	};

	return t(messages, locale);
}

export function t_registration_form_submit_button(locale: LocaleType): string {
	const messages = {
		en: 'Send PIN',
		cs: 'Odeslat PIN'
	};

	return t(messages, locale);
}

export function t_registration_form_skip_button(locale: LocaleType): string {
	const messages = {
		en: 'Already have the PIN?',
		cs: 'Už máš PIN?'
	};

	return t(messages, locale);
}

export function t_registration_verification_pin_sent(locale: LocaleType): string {
	const messages = {
		en: 'A verification PIN has been sent to your email',
		cs: 'Ověřovací PIN byl odeslán na tvůj e-mail'
	};

	return t(messages, locale);
}

export function t_registration_info(locale: LocaleType): string {
	const messages = {
		en: 'We use passwordless authentication. Enter your email address, and we will send you a verification PIN that you can use in the next step to create an account.',
		cs: 'Používáme ověřování bez hesla. Zadej svou e-mailovou adresu a zašleme ti ověřovací PIN, který můžeš použít v dalším kroku k vytvoření účtu.'
	};

	return t(messages, locale);
}
