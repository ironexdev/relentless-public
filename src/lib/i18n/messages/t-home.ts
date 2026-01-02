import { APP_TITLE } from '$lib/config';
import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

export function t_home_page_title(locale: LocaleType) {
	const messages = {
		en: 'Home | {appTitle}',
		cs: 'Úvod | {appTitle}'
	};

	return t(messages, locale, 1, { appTitle: APP_TITLE });
}

export function t_home_meta_description(locale: LocaleType): string {
	const messages = {
		en: 'Welcome to {appTitle}',
		cs: 'Vítejte v {appTitle}'
	};

	return t(messages, locale, 1, { appTitle: APP_TITLE });
}

export function t_home_title(locale: LocaleType): string {
	const messages = {
		en: 'Home',
		cs: 'Úvod'
	};

	return t(messages, locale);
}
