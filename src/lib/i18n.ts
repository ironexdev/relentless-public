import { LocaleEnum, localeEnumAsArray } from '$lib/enums/locale-enum';
import type { LocaleType } from '$lib/types/locale-type';

export const defaultLocale: LocaleType = LocaleEnum.EN;
export const locales: LocaleType[] = localeEnumAsArray;
