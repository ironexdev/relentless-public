import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

export function t_announcement_activate_profile(locale: LocaleType): string {
	const messages = {
		en: `Your profile is not public yet. Fill in the necessary info in "Edit Profile" section to activate it.`,
		cs: `Tvůj profil ještě není veřejný. Pro aktivaci musíš vyplnit nezbytné info na stránce "Upravit Profil".`
	};

	return t(messages, locale);
}
