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
		cs: 'Username'
	};

	return t(messages, locale);
}
