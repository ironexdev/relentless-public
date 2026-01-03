import { APP_TITLE } from '$lib/config';
import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

export function t_verify_registration_page_title(locale: LocaleType) {
	const messages = {
		en: 'Verify Account | {appTitle}',
		cs: 'Ověřit Účet | {appTitle}'
	};

	return t(messages, locale, 1, { appTitle: APP_TITLE });
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

export function t_verify_registration_form_username_label(locale: LocaleType): string {
	const messages = {
		en: 'USERNAME',
		cs: 'UŽIVATELSKÉ JMÉNO'
	};

	return t(messages, locale);
}

export function t_verify_registration_form_username_placeholder(locale: LocaleType): string {
	const messages = {
		en: 'Enter your username',
		cs: 'Zadej své uživatelské jméno'
	};

	return t(messages, locale);
}

export function t_verify_registration_form_birth_year_label(locale: LocaleType): string {
	const messages = {
		en: 'BIRTH YEAR',
		cs: 'ROK NAROZENÍ'
	};

	return t(messages, locale);
}

export function t_verify_registration_form_birth_year_placeholder(locale: LocaleType): string {
	const messages = {
		en: 'Enter your birth year',
		cs: 'Zadej rok narození'
	};

	return t(messages, locale);
}

export function t_verify_registration_form_terms_label(locale: LocaleType): string {
	const messages = {
		en: 'I agree to the <a href="/terms" class="underline hover:text-primary">Terms & Conditions</a> and confirm I am at least 13 years old',
		cs: 'Souhlasím s <a href="/terms" class="underline hover:text-primary">Obchodními podmínkami</a> a potvrzuji, že mi je alespoň 13 let'
	};

	return t(messages, locale);
}

export function t_verify_registration_form_terms_required(locale: LocaleType): string {
	const messages = {
		en: 'You must agree to the Terms & Conditions',
		cs: 'Musíš souhlasit s Obchodními podmínkami'
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

export function t_verify_registration_form_age_error(locale: LocaleType): string {
	const messages = {
		en: 'You must be at least 13 years old',
		cs: 'Musí ti být alespoň 13 let'
	};

	return t(messages, locale);
}

export function t_verify_registration_form_birth_year_invalid(locale: LocaleType): string {
	const messages = {
		en: 'Please enter a valid birth year',
		cs: 'Zadej platný rok narození'
	};

	return t(messages, locale);
}

export function t_verify_registration_image_explanation(locale: LocaleType): string {
	const messages = {
		en: 'Your profile will contain a two-sided flippable image, first side is for your <b>avatar picture</b> and the second side is for your <b>real photo</b>. Second image is visible only to your connections (you can change this later in settings).',
		cs: 'Tvůj profil bude mít dvě tváře: <b>obrázek avatara</b> a <b>skutečnou fotku</b>. Druhá fotka se ukáže po otočení a uvidí ji jen tvoje spojení (toto můžeš změnit v nastavení).'
	};

	return t(messages, locale);
}
