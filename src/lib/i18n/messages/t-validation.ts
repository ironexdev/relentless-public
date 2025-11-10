import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

export function t_validation_invalid_email(locale: LocaleType) {
	const messages = {
		en: 'Invalid email address',
		cs: 'Neplatná e-mailová adresa'
	};

	return t(messages, locale);
}

export function t_validation_invalid_pin(locale: LocaleType) {
	const messages = {
		en: 'Invalid PIN code',
		cs: 'Neplatný PIN kód'
	};
	return t(messages, locale);
}
