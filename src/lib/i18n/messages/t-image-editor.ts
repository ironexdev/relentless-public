import { t } from '$lib/t';
import type { LocaleType } from '$lib/types/locale-type';

export function t_image_editor_title(locale: LocaleType): string {
	const messages = {
		en: 'Edit Image',
		cs: 'Upravit obrázek'
	};

	return t(messages, locale);
}

export function t_image_editor_loading(locale: LocaleType): string {
	const messages = {
		en: 'Loading...',
		cs: 'Načítání...'
	};

	return t(messages, locale);
}

export function t_image_editor_saving(locale: LocaleType): string {
	const messages = {
		en: 'Saving...',
		cs: 'Ukládání...'
	};

	return t(messages, locale);
}

export function t_image_editor_client_error(locale: LocaleType): string {
	const messages = {
		en: 'An error occurred while processing the image.',
		cs: 'Při zpracování obrázku došlo k chybě.'
	};

	return t(messages, locale);
}

export function t_image_editor_close_button(locale: LocaleType): string {
	const messages = {
		en: 'Close editor',
		cs: 'Zavřít editor'
	};

	return t(messages, locale);
}

export function t_image_editor_info_toast(locale: LocaleType): string {
	const messages = {
		en: 'Drag to reposition, scroll or pinch to zoom. Use the buttons below to rotate or center the image.',
		cs: 'Táhněte pro změnu pozice, scrollujte nebo uštípněte pro zoom. Použijte tlačítka níže pro otočení nebo vycentrování obrázku.'
	};

	return t(messages, locale);
}

export function t_image_editor_preview_button(locale: LocaleType): string {
	const messages = {
		en: 'Toggle preview',
		cs: 'Přepnout náhled'
	};

	return t(messages, locale);
}

export function t_image_editor_preview_label(locale: LocaleType): string {
	const messages = {
		en: 'Preview',
		cs: 'Náhled'
	};

	return t(messages, locale);
}

export function t_image_editor_center_x_button(locale: LocaleType): string {
	const messages = {
		en: 'Center horizontally',
		cs: 'Vycentrovat horizontálně'
	};

	return t(messages, locale);
}

export function t_image_editor_center_x_label(locale: LocaleType): string {
	const messages = {
		en: 'Center X',
		cs: 'Střed X'
	};

	return t(messages, locale);
}

export function t_image_editor_center_y_button(locale: LocaleType): string {
	const messages = {
		en: 'Center vertically',
		cs: 'Vycentrovat vertikálně'
	};

	return t(messages, locale);
}

export function t_image_editor_center_y_label(locale: LocaleType): string {
	const messages = {
		en: 'Center Y',
		cs: 'Střed Y'
	};

	return t(messages, locale);
}

export function t_image_editor_rotate_button(locale: LocaleType): string {
	const messages = {
		en: 'Rotate 90°',
		cs: 'Otočit o 90°'
	};

	return t(messages, locale);
}

export function t_image_editor_rotate_label(locale: LocaleType): string {
	const messages = {
		en: 'Rotate',
		cs: 'Otočit'
	};

	return t(messages, locale);
}

export function t_image_editor_save_button(locale: LocaleType): string {
	const messages = {
		en: 'Save image',
		cs: 'Uložit obrázek'
	};

	return t(messages, locale);
}

export function t_image_editor_save_label(locale: LocaleType): string {
	const messages = {
		en: 'Save',
		cs: 'Uložit'
	};

	return t(messages, locale);
}
