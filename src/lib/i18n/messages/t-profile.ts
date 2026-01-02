import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';
import { APP_TITLE } from '$lib/config.ts';

export function t_profile_title(locale: LocaleType): string {
	const messages = {
		en: 'My Profile',
		cs: 'Můj Profil'
	};

	return t(messages, locale);
}

export function t_profile_page_title(locale: LocaleType) {
	const messages = {
		en: 'My Profile | {appTitle}',
		cs: 'Můj Profil | {appTitle}'
	};

	return t(messages, locale, 1, { appTitle: APP_TITLE });
}

export function t_profile_meta_description(locale: LocaleType): string {
	const messages = {
		en: 'View and manage your personal profile, account settings, and preferences.',
		cs: 'Zobrazte a spravujte svůj osobní profil, nastavení účtu a předvolby.'
	};

	return t(messages, locale);
}
