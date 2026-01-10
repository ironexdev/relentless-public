import { t_announcement_activate_profile } from '$lib/i18n/messages/t-announcement';
import type { LocaleType } from '$lib/types/locale-type';

type User = {
	username: string | null;
	profileLink: string | null;
	yearOfBirth: number | null;
} | null;

export default class AnnouncementService {
	static getMessage(user: User, locale: LocaleType): string | undefined {
		if (user && (!user.username || !user.profileLink || !user.yearOfBirth)) {
			return t_announcement_activate_profile(locale);
		}

		return undefined;
	}
}
