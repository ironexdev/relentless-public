import { type LocaleType, t } from '$lib/t';

export function t_language_switcher_title(locale: LocaleType): string {
	const messages = {
		en: 'LANGUAGE',
		cs: 'JAZYK'
	};

	return t(messages, locale);
}
