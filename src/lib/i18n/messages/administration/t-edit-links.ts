import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';
import { APP_TITLE } from '$lib/config.ts';

export function t_edit_links_title(locale: LocaleType): string {
	const messages = {
		en: 'Edit Links',
		cs: 'Upravit odkazy'
	};

	return t(messages, locale);
}

export function t_edit_links_page_title(locale: LocaleType) {
	const messages = {
		en: 'Edit Links | {appTitle}',
		cs: 'Upravit odkazy | {appTitle}'
	};

	return t(messages, locale, 1, { appTitle: APP_TITLE });
}

export function t_edit_links_meta_description(locale: LocaleType): string {
	const messages = {
		en: 'Manage the links you want to share on your profile.',
		cs: 'Spravujte odkazy, které chcete sdílet na svém profilu.'
	};

	return t(messages, locale);
}
