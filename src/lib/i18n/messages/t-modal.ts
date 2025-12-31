import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

export function t_modal_close(locale: LocaleType): string {
	const messages = {
		en: 'Close',
		cs: 'Zavřít'
	};

	return t(messages, locale);
}
