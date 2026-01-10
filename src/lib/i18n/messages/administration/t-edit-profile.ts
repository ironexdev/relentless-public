import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';
import { APP_TITLE } from '$lib/config.ts';

export function t_edit_profile_title(locale: LocaleType): string {
	const messages = {
		en: 'Edit Profile',
		cs: 'Upravit profil'
	};

	return t(messages, locale);
}

export function t_edit_profile_page_title(locale: LocaleType) {
	const messages = {
		en: 'Edit Profile | {appTitle}',
		cs: 'Upravit profil | {appTitle}'
	};

	return t(messages, locale, 1, { appTitle: APP_TITLE });
}

export function t_edit_profile_meta_description(locale: LocaleType): string {
	const messages = {
		en: 'Edit your profile information including picture and about me.',
		cs: 'Upravte informace o svém profilu včetně obrázku a sekce o mně.'
	};

	return t(messages, locale);
}

export function t_edit_profile_username_label(locale: LocaleType): string {
	const messages = {
		en: 'Username',
		cs: 'Uživatelské jméno'
	};

	return t(messages, locale);
}

export function t_edit_profile_username_placeholder(locale: LocaleType): string {
	const messages = {
		en: 'Enter your username',
		cs: 'Zadejte uživatelské jméno'
	};

	return t(messages, locale);
}

export function t_edit_profile_profile_link_label(locale: LocaleType): string {
	const messages = {
		en: 'Profile Link',
		cs: 'Odkaz na profil'
	};

	return t(messages, locale);
}

export function t_edit_profile_profile_link_placeholder(locale: LocaleType): string {
	const messages = {
		en: 'your-unique-link',
		cs: 'vas-jedinecny-odkaz'
	};

	return t(messages, locale);
}

export function t_edit_profile_year_of_birth_label(locale: LocaleType): string {
	const messages = {
		en: 'Year of Birth',
		cs: 'Rok narození'
	};

	return t(messages, locale);
}

export function t_edit_profile_year_of_birth_placeholder(locale: LocaleType): string {
	const messages = {
		en: 'Enter your year of birth',
		cs: 'Zadejte rok narození'
	};

	return t(messages, locale);
}

export function t_edit_profile_save_button(locale: LocaleType): string {
	const messages = {
		en: 'Save',
		cs: 'Uložit'
	};

	return t(messages, locale);
}

export function t_edit_profile_update_button(locale: LocaleType): string {
	const messages = {
		en: 'Update',
		cs: 'Aktualizovat'
	};

	return t(messages, locale);
}

export function t_edit_profile_success(locale: LocaleType): string {
	const messages = {
		en: 'Profile updated successfully',
		cs: 'Profil byl úspěšně aktualizován'
	};

	return t(messages, locale);
}

export function t_edit_profile_modal_title(locale: LocaleType): string {
	const messages = {
		en: 'Verify Profile Update',
		cs: 'Ověřit aktualizaci profilu'
	};

	return t(messages, locale);
}

export function t_edit_profile_modal_close(locale: LocaleType): string {
	const messages = {
		en: 'Close',
		cs: 'Zavřít'
	};

	return t(messages, locale);
}

export function t_edit_profile_modal_description(locale: LocaleType): string {
	const messages = {
		en: 'To update your profile, we need to verify your identity. A PIN will be sent to your email.',
		cs: 'Pro aktualizaci profilu potřebujeme ověřit vaši identitu. PIN bude zaslán na váš email.'
	};

	return t(messages, locale);
}

export function t_edit_profile_modal_send_pin(locale: LocaleType): string {
	const messages = {
		en: 'Send PIN',
		cs: 'Odeslat PIN'
	};

	return t(messages, locale);
}

export function t_edit_profile_modal_pin_sent(locale: LocaleType): string {
	const messages = {
		en: 'PIN has been sent to your email',
		cs: 'PIN byl odeslán na váš email'
	};

	return t(messages, locale);
}

export function t_edit_profile_modal_pin_label(locale: LocaleType): string {
	const messages = {
		en: 'PIN',
		cs: 'PIN'
	};

	return t(messages, locale);
}

export function t_edit_profile_modal_pin_placeholder(locale: LocaleType): string {
	const messages = {
		en: '* * * * * *',
		cs: '* * * * * *'
	};

	return t(messages, locale);
}

export function t_edit_profile_modal_verify_button(locale: LocaleType): string {
	const messages = {
		en: 'Verify & Save',
		cs: 'Ověřit a uložit'
	};

	return t(messages, locale);
}

export function t_edit_profile_activation_message(locale: LocaleType): string {
	const messages = {
		en: 'Fill-in username, profile link and year of birth to activate your profile and make it public.',
		cs: 'Aktivuj a zvěřejní svůj profil tím, že vyplňíš uživatelské jméno, odkaz na profil a rok narození.'
	};

	return t(messages, locale);
}
