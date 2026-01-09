import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

export function t_user_email_modal_title(locale: LocaleType): string {
	const messages = {
		en: 'Change email',
		cs: 'Změnit email'
	};

	return t(messages, locale);
}

export function t_user_email_modal_close(locale: LocaleType): string {
	const messages = {
		en: 'Close',
		cs: 'Zavřít'
	};

	return t(messages, locale);
}

export function t_user_email_invalid_or_expired_pin(locale: LocaleType): string {
	const messages = {
		en: 'Invalid or expired PIN.',
		cs: 'Neplatný nebo expirovaný PIN.'
	};

	return t(messages, locale);
}

export function t_user_email_invalid_email(locale: LocaleType): string {
	const messages = {
		en: 'Invalid email.',
		cs: 'Neplatný email.'
	};

	return t(messages, locale);
}

export function t_user_email_description_step_one(locale: LocaleType): string {
	const messages = {
		en: '1/ This is a 3-step process. In this first step, you will request a verification PIN to be sent to your current email.',
		cs: '1/ Změna emailu je 3-krokový proces. V tomto prvním kroku si vyžádáš ověřovací PIN, který bude zaslán na tvůj současný email.'
	};

	return t(messages, locale);
}

export function t_user_email_description_step_two(locale: LocaleType): string {
	const messages = {
		en: '2/ Enter your new email and paste the PIN from your current email inbox.',
		cs: '2/ Zadej svůj nový email a vlož PIN z tvého původního emailu.'
	};

	return t(messages, locale);
}

export function t_user_email_description_step_three(locale: LocaleType): string {
	const messages = {
		en: '3/ Paste the PIN from your new email inbox and submit the form. After this, you will be logged out and then you can login with your new email.',
		cs: '3/ Vlož PIN z nového emailu a odešli formulář. Následně budeš odhlášen/a a můžeš se přihlásit s novým emailem.'
	};

	return t(messages, locale);
}

export function t_user_email_pin_sent_to(locale: LocaleType): string {
	const messages = {
		en: 'Submit to send a verification PIN to:',
		cs: 'Po potvrzení bude PIN zaslán na:'
	};

	return t(messages, locale);
}

export function t_user_email_step_one_success(locale: LocaleType): string {
	const messages = {
		en: 'A verification PIN has been sent to your current email',
		cs: 'Ověřovací PIN byl odeslán na tvůj současný e-mail'
	};

	return t(messages, locale);
}

export function t_user_email_step_two_success(locale: LocaleType): string {
	const messages = {
		en: 'A verification PIN has been sent to your new email',
		cs: 'Ověřovací PIN byl odeslán na tvůj nový e-mail'
	};

	return t(messages, locale);
}

export function t_user_email_step_one_skip(locale: LocaleType): string {
	const messages = {
		en: 'Skip to step 2',
		cs: 'Přejít na krok 2'
	};

	return t(messages, locale);
}

export function t_user_email_step_one_submit(locale: LocaleType): string {
	const messages = {
		en: 'Send PIN',
		cs: 'Odeslat PIN'
	};

	return t(messages, locale);
}

export function t_user_email_step_two_email_label(locale: LocaleType): string {
	const messages = {
		en: 'NEW E-MAIL',
		cs: 'NOVÝ E-MAIL'
	};

	return t(messages, locale);
}

export function t_user_email_step_two_email_placeholder(locale: LocaleType): string {
	const messages = {
		en: 'name@domain.com',
		cs: 'jmeno@domena.cz'
	};

	return t(messages, locale);
}

export function t_user_email_step_two_pin_label(locale: LocaleType): string {
	const messages = {
		en: 'PIN FROM OLD E-MAIL',
		cs: 'PIN ZE PŮVODNÍHO E-MAILU'
	};

	return t(messages, locale);
}

export function t_user_email_step_two_pin_placeholder(locale: LocaleType): string {
	const messages = {
		en: '* * * * * *',
		cs: '* * * * * *'
	};

	return t(messages, locale);
}

export function t_user_email_step_two_info(locale: LocaleType): string {
	const messages = {
		en: 'Now, the second verification PIN will be sent to your new email. Your account email will not be changed yet.',
		cs: 'Druhý ověřovací PIN bude odeslán na tvůj nový email. Email tvého účtu zatím nebude změněn.'
	};

	return t(messages, locale);
}

export function t_user_email_step_two_skip(locale: LocaleType): string {
	const messages = {
		en: 'Skip to step 3/3',
		cs: 'Přejít na krok 3/3'
	};

	return t(messages, locale);
}

export function t_user_email_step_two_back(locale: LocaleType): string {
	const messages = {
		en: 'Go Back',
		cs: 'Zpět'
	};

	return t(messages, locale);
}

export function t_user_email_step_two_submit(locale: LocaleType): string {
	const messages = {
		en: 'Verify',
		cs: 'Ověřit'
	};

	return t(messages, locale);
}

export function t_user_email_step_three_pin_label(locale: LocaleType): string {
	const messages = {
		en: 'PIN FROM NEW E-MAIL',
		cs: 'PIN Z NOVÉHO E-MAILU'
	};

	return t(messages, locale);
}

export function t_user_email_step_three_pin_placeholder(locale: LocaleType): string {
	const messages = {
		en: '* * * * * *',
		cs: '* * * * * *'
	};

	return t(messages, locale);
}

export function t_user_email_step_three_info(locale: LocaleType): string {
	const messages = {
		en: 'After submitting this last form, your e-mail will be finally changed and you will be redirected to login.',
		cs: 'Tvůj e-mail bude po potvrzení změněn a budeš přesměrován/a na login.'
	};

	return t(messages, locale);
}

export function t_user_email_step_three_back(locale: LocaleType): string {
	const messages = {
		en: 'Go Back',
		cs: 'Zpět'
	};

	return t(messages, locale);
}

export function t_user_email_step_three_submit(locale: LocaleType): string {
	const messages = {
		en: 'Change E-mail',
		cs: 'Změnit E-mail'
	};

	return t(messages, locale);
}

export function t_user_email_change_success(locale: LocaleType): string {
	const messages = {
		en: 'Email changed successfully. Please login with your new email.',
		cs: 'Email byl úspěšně změněn. Přihlaš se s novým emailem.'
	};

	return t(messages, locale);
}
