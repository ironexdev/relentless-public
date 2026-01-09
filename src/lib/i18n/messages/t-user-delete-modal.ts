import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

export function t_user_delete_modal_title(locale: LocaleType): string {
	const messages = {
		en: 'Delete My Account',
		cs: 'Smazat můj účet'
	};

	return t(messages, locale);
}

export function t_user_delete_modal_close(locale: LocaleType): string {
	const messages = {
		en: 'Close',
		cs: 'Zavřít'
	};

	return t(messages, locale);
}

export function t_user_delete_description_step_one(locale: LocaleType): string {
	const messages = {
		en: '1/ Confirm account deletion. A verification PIN will be sent to your email to complete the process.',
		cs: '1/ Potvrď smazání účtu. Ověřovací PIN bude odeslán na tvůj email pro dokončení procesu.'
	};

	return t(messages, locale);
}

export function t_user_delete_warning(locale: LocaleType): string {
	const messages = {
		en: 'This action is permanent and cannot be undone. All your data will be deleted.',
		cs: 'Tato akce je trvalá a nelze ji vrátit zpět. Všechna tvá data budou smazána.'
	};

	return t(messages, locale);
}

export function t_user_delete_pin_sent_to(locale: LocaleType): string {
	const messages = {
		en: 'Submit to send a verification PIN to:',
		cs: 'Po potvrzení bude PIN zaslán na:'
	};

	return t(messages, locale);
}

export function t_user_delete_step_one_submit(locale: LocaleType): string {
	const messages = {
		en: 'Send PIN',
		cs: 'Odeslat PIN'
	};

	return t(messages, locale);
}

export function t_user_delete_step_one_success(locale: LocaleType): string {
	const messages = {
		en: 'A verification PIN has been sent to your email',
		cs: 'Ověřovací PIN byl odeslán na tvůj e-mail'
	};

	return t(messages, locale);
}

export function t_user_delete_description_step_two(locale: LocaleType): string {
	const messages = {
		en: '2/ Enter the verification PIN from your email to permanently delete your account. You will be logged out immediately.',
		cs: '2/ Zadej ověřovací PIN z tvého emailu pro trvalé smazání účtu. Budeš okamžitě odhlášen/a.'
	};

	return t(messages, locale);
}

export function t_user_delete_step_two_pin_label(locale: LocaleType): string {
	const messages = {
		en: 'VERIFICATION PIN',
		cs: 'OVĚŘOVACÍ PIN'
	};

	return t(messages, locale);
}

export function t_user_delete_step_two_pin_placeholder(locale: LocaleType): string {
	const messages = {
		en: '* * * * * *',
		cs: '* * * * * *'
	};

	return t(messages, locale);
}

export function t_user_delete_step_two_info(locale: LocaleType): string {
	const messages = {
		en: 'This action cannot be undone. Your account and all associated data will be permanently deleted.',
		cs: 'Tuto akci nelze vrátit zpět. Tvůj účet a všechna související data budou trvale smazána.'
	};

	return t(messages, locale);
}

export function t_user_delete_step_two_submit(locale: LocaleType): string {
	const messages = {
		en: 'Delete Account',
		cs: 'Smazat účet'
	};

	return t(messages, locale);
}

export function t_user_delete_success(locale: LocaleType): string {
	const messages = {
		en: 'Your account has been successfully deleted',
		cs: 'Tvůj účet byl úspěšně smazán'
	};

	return t(messages, locale);
}

export function t_user_delete_invalid_or_expired_pin(locale: LocaleType): string {
	const messages = {
		en: 'Invalid or expired PIN',
		cs: 'Neplatný nebo expirovaný PIN'
	};

	return t(messages, locale);
}
