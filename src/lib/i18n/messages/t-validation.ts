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

export function t_validation_invalid_username(locale: LocaleType) {
	const messages = {
		en: 'Username must be 2-24 characters, letters, numbers, and underscores only',
		cs: 'Uživatelské jméno musí mít 2-24 znaků, pouze písmena, čísla a podtržítka'
	};
	return t(messages, locale);
}

export function t_validation_invalid_profile_link(locale: LocaleType) {
	const messages = {
		en: 'Profile link must be 2-24 characters, lowercase letters and dashes only',
		cs: 'Odkaz na profil musí mít 2-24 znaků, pouze malá písmena a pomlčky'
	};
	return t(messages, locale);
}

export function t_validation_invalid_year_of_birth(locale: LocaleType) {
	const messages = {
		en: 'Please enter a valid year of birth',
		cs: 'Zadejte platný rok narození'
	};
	return t(messages, locale);
}

export function t_validation_profile_link_taken(locale: LocaleType) {
	const messages = {
		en: 'This profile link is already taken',
		cs: 'Tento odkaz na profil je již obsazený'
	};
	return t(messages, locale);
}
