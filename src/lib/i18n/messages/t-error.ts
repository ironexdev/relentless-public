import { APP_TITLE } from '$lib/config';
import type { LocaleType } from '$lib/types/locale-type.ts';
import { t } from '$lib/t.ts';

export function t_error_not_found_page_title(locale: LocaleType) {
	const messages = {
		en: 'Page Not Found | {appTitle}',
		cs: 'Stránka Nenalezena | {appTitle}'
	};

	return t(messages, locale, 1, { appTitle: APP_TITLE });
}

export function t_error_not_found_title(locale: LocaleType): string {
	const messages = {
		en: 'Page Not Found',
		cs: 'Stránka Nenalezena'
	};

	return t(messages, locale);
}
