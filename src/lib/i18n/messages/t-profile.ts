import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

export function t_profile_title(locale: LocaleType): string {
	const messages = {
		en: 'Profile',
		cs: 'Profil'
	};

	return t(messages, locale);
}
