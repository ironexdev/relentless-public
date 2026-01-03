import { t } from '$lib/t';
import { type LocaleType } from '$lib/types/locale-type';

export function t_user_profile_image_flip_button(locale: LocaleType): string {
	const messages = {
		en: 'Flip to see the other side',
		cs: 'Otočit pro zobrazení druhé strany'
	};

	return t(messages, locale);
}

export function t_user_profile_image_change_picture(locale: LocaleType): string {
	const messages = {
		en: 'Change picture',
		cs: 'Změnit obrázek'
	};

	return t(messages, locale);
}

export function t_user_profile_image_change_photo(locale: LocaleType): string {
	const messages = {
		en: 'Change photo',
		cs: 'Změnit fotku'
	};

	return t(messages, locale);
}

export function t_user_profile_image_upload_picture(locale: LocaleType): string {
	const messages = {
		en: 'Upload picture',
		cs: 'Nahrát obrázek'
	};

	return t(messages, locale);
}

export function t_user_profile_image_upload_photo(locale: LocaleType): string {
	const messages = {
		en: 'Upload photo',
		cs: 'Nahrát fotku'
	};

	return t(messages, locale);
}

export function t_user_profile_image_remove_picture(locale: LocaleType): string {
	const messages = {
		en: 'Remove picture',
		cs: 'Odstranit obrázek'
	};

	return t(messages, locale);
}

export function t_user_profile_image_remove_photo(locale: LocaleType): string {
	const messages = {
		en: 'Remove photo',
		cs: 'Odstranit fotku'
	};

	return t(messages, locale);
}

export function t_user_profile_image_picture_title(locale: LocaleType): string {
	const messages = {
		en: 'Profile Picture',
		cs: 'Profilový obrázek'
	};

	return t(messages, locale);
}

export function t_user_profile_image_photo_title(locale: LocaleType): string {
	const messages = {
		en: 'Profile Photo',
		cs: 'Profilová fotka'
	};

	return t(messages, locale);
}

export function t_user_profile_image_upload_picture_hint(locale: LocaleType): string {
	const messages = {
		en: 'Upload your <b>avatar picture</b> (optional)',
		cs: 'Nahraj obrázek svého <b>avatara</b> (volitelné)'
	};

	return t(messages, locale);
}

export function t_user_profile_image_upload_photo_hint(locale: LocaleType): string {
	const messages = {
		en: 'Upload your <b>real photo</b> (optional)',
		cs: 'Nahraj svou <b>fotku</b> (volitelné)'
	};

	return t(messages, locale);
}
