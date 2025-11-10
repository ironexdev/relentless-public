import { APP_TITLE } from '$lib/config';
import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

const appTitle = APP_TITLE;

export function t_logout_button_title(locale: LocaleType) {
	const messages = {
		en: 'Logout',
		cs: 'Odhlásit se'
	};

	return t(messages, locale, 1, { appTitle });
}
