import { type LocaleType, t } from '$lib/t';

export function t_theme_toggle_dark_mode(locale: LocaleType): string {
	const messages = {
		en: 'Use dark mode',
		cs: 'Použít tmavý režim'
	};

	return t(messages, locale);
}

export function t_theme_toggle_light_mode(locale: LocaleType): string {
	const messages = {
		en: 'Use light mode',
		cs: 'Použít světlý režim'
	};

	return t(messages, locale);
}
