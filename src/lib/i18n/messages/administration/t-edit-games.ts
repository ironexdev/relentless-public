import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';
import { APP_TITLE } from '$lib/config.ts';

export function t_edit_games_title(locale: LocaleType): string {
	const messages = {
		en: 'Edit Games',
		cs: 'Upravit hry'
	};

	return t(messages, locale);
}

export function t_edit_games_page_title(locale: LocaleType) {
	const messages = {
		en: 'Edit Games | {appTitle}',
		cs: 'Upravit hry | {appTitle}'
	};

	return t(messages, locale, 1, { appTitle: APP_TITLE });
}

export function t_edit_games_meta_description(locale: LocaleType): string {
	const messages = {
		en: 'Manage the games you play and want to share on your profile.',
		cs: 'Spravujte hry, které hrajete a chcete sdílet na svém profilu.'
	};

	return t(messages, locale);
}
