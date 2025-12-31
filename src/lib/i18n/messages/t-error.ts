import { APP_TITLE } from '$lib/config';
import type { LocaleType } from '$lib/types/locale-type.ts';
import { t } from '$lib/t.ts';

const appTitle = APP_TITLE;

export function t_error_not_found_page_title(locale: LocaleType) {
	const messages = {
		en: '{appTitle} | Page Not Found',
		cs: '{appTitle} | Stránka Nenalezena'
	};

	return t(messages, locale, 1, { appTitle });
}

export function t_error_not_found_title(locale: LocaleType): string {
	const messages = {
		en: 'Page Not Found',
		cs: 'Stránka Nenalezena'
	};

	return t(messages, locale);
}
