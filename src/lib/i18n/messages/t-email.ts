import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

export function t_email_greeting(locale: LocaleType): string {
	const messages = {
		en: 'Hello',
		cs: 'Ahoj'
	};

	return t(messages, locale);
}

export function t_email_goodbye(locale: LocaleType): string {
	const messages = {
		en: 'Have a nice day',
		cs: 'Měj se'
	};

	return t(messages, locale);
}

export function t_email_login_subject(locale: LocaleType): string {
	const messages = {
		en: 'Login',
		cs: 'Přihlášení'
	};

	return t(messages, locale);
}

export function t_email_login_sentence1(locale: LocaleType, pin: string): string {
	const messages = {
		en: `Here is the requested verification PIN <b>{pin}</b>, use it for login.`,
		cs: `Tady je požadovaný ověřovací PIN <b>{pin}</b>, použij ho pro přihlášení.`
	};

	return t(messages, locale, 1, { pin });
}

export function t_email_login_sentence2(locale: LocaleType, securityEmail: string): string {
	const messages = {
		en: `If this wasn't you, and this happened multiple times, then please let us know at <a href="mailto:{securityEmail}">{securityEmail}</a>.`,
		cs: `Pokud to nebyl/a ty a to se stalo vícekrát, tak nám dej vědět na <a href="mailto:{securityEmail}">{securityEmail}</a>.`
	};

	return t(messages, locale, 1, { securityEmail });
}

export function t_email_login_attempt_subject(locale: LocaleType): string {
	const messages = {
		en: 'Login Attempt Detected',
		cs: 'Zjištěn pokus o přihlášení'
	};

	return t(messages, locale);
}

export function t_email_login_attempt_sentence1(locale: LocaleType): string {
	const messages = {
		en: "A login attempt was made on your profile even though you don't have an profile on your site yet.",
		cs: 'Někdo se pokusil přihlásit s tvojí e-mailovou adresou i když u nás ještě nemáš profil.'
	};

	return t(messages, locale);
}

export function t_email_login_attempt_sentence2(
	locale: LocaleType,
	registrationLink: string
): string {
	const messages = {
		en: `If this was you, then you can use the following <a href="{registrationLink}">link</a> to create a new account.`,
		cs: `Pokud jsi to byl/a ty, tak použij následující <a href="{registrationLink}">odkaz</a> a vytvoř si nový účet.`
	};

	return t(messages, locale, 1, { registrationLink });
}

export function t_email_login_attempt_sentence3(locale: LocaleType, securityEmail: string): string {
	const messages = {
		en: `If this wasn't you, and this happened multiple times, then please let us know at <a href="mailto:{securityEmail}">{securityEmail}</a>.`,
		cs: `Pokud to nebyl/a ty a to se stalo vícekrát, tak nám dej vědět na <a href="mailto:{securityEmail}">{securityEmail}</a>.`
	};

	return t(messages, locale, 1, { securityEmail });
}

export function t_email_registration_subject(locale: LocaleType): string {
	const messages = {
		en: 'Welcome to Relentless!',
		cs: 'Vítej na Relentless!'
	};

	return t(messages, locale);
}

export function t_email_registration_sentence1(locale: LocaleType, pin: string): string {
	const messages = {
		en: `Here is the requested verification PIN <b>{pin}</b>, use it to veriry your new account`,
		cs: `Tady je požadovaný ověřovací PIN <b>{pin}</b>, použij ho k ověření svého nového účtu.`
	};

	return t(messages, locale, 1, { pin });
}

export function t_email_registration_sentence2(locale: LocaleType, securityEmail: string): string {
	const messages = {
		en: `If this wasn't you, and this happened multiple times, then please let us know at <a href="mailto:{securityEmail}">{securityEmail}</a>.`,
		cs: `Pokud to nebyl/a ty a to se stalo vícekrát, tak nám dej vědět na <a href="mailto:{securityEmail}">{securityEmail}</a>.`
	};

	return t(messages, locale, 1, { securityEmail });
}

export function t_email_registration_attempt_subject(locale: LocaleType): string {
	const messages = {
		en: 'Account Creation Attempt Detected',
		cs: 'Zjištěn pokus o vytvoření účtu'
	};

	return t(messages, locale);
}

export function t_email_registration_attempt_sentence1(locale: LocaleType): string {
	const messages = {
		en: 'Someone has tried to create a new account using your email, even though you already have an account on our site.',
		cs: 'Někdo se pokusil vytvořit nový účet s tvojí e-mailovou adresou i když u nás už máš účet.'
	};

	return t(messages, locale);
}

export function t_email_registration_attempt_sentence2(
	locale: LocaleType,
	loginLink: string
): string {
	const messages = {
		en: `If this was you, then you can use the following <a href="{loginLink}">link</a> to login.`,
		cs: `Pokud jsi to byl/a ty, tak použij následující <a href="{loginLink}">odkaz</a> pro přihlášení.`
	};

	return t(messages, locale, 1, { loginLink });
}
