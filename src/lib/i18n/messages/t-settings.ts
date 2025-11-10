import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

export function t_settings_title(locale: LocaleType): string {
	const messages = {
		en: 'Settings',
		cs: 'Nastavení'
	};

	return t(messages, locale);
}
