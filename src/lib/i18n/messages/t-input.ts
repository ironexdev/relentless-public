import type { LocaleType } from '$lib/types/locale-type.ts';
import { t } from '$lib/t.ts';

export function t_input_clear(locale: LocaleType) {
	const messages = {
		en: 'Clear Input',
		cs: 'Smazat'
	};

	return t(messages, locale);
}
