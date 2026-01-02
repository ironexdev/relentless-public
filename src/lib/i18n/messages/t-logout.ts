import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

export function t_logout_button_title(locale: LocaleType) {
	const messages = {
		en: 'Logout',
		cs: 'Odhlásit se'
	};

	return t(messages, locale);
}
