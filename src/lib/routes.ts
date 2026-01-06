import { LocaleEnum } from '$lib/enums/locale-enum';
import { defaultLocale, locales } from '$lib/i18n';
import type { LocaleType } from '$lib/types/locale-type';

export type RoutesType = Record<string, RouteType>;

type RouteType = {
	pathnames: string | { [K in LocaleType]: string };
	protected: boolean;
	lastModified?: Date;
};

export const routes: RoutesType = {
	'/': {
		pathnames: '/',
		lastModified: new Date(),
		protected: false
	},
	'/login': {
		pathnames: {
			[LocaleEnum.EN]: '/login',
			[LocaleEnum.CS]: '/prihlaseni'
		},
		lastModified: new Date(),
		protected: false
	},
	'/verify-login': {
		pathnames: {
			[LocaleEnum.EN]: '/verify-login',
			[LocaleEnum.CS]: '/overit-prihlaseni'
		},
		lastModified: new Date(),
		protected: false
	},
	'/create-account': {
		pathnames: {
			[LocaleEnum.EN]: '/create-account',
			[LocaleEnum.CS]: '/vytvorit-ucet'
		},
		lastModified: new Date(),
		protected: false
	},
	'/verify-account': {
		pathnames: {
			[LocaleEnum.EN]: '/verify-account',
			[LocaleEnum.CS]: '/overit-ucet'
		},
		lastModified: new Date(),
		protected: false
	},
	'/profile': {
		pathnames: {
			[LocaleEnum.EN]: '/profile',
			[LocaleEnum.CS]: '/profil'
		},
		lastModified: new Date(),
		protected: true
	},
	'/administration/edit-profile': {
		pathnames: {
			[LocaleEnum.EN]: '/administration/edit-profile',
			[LocaleEnum.CS]: '/administrace/upravit-profil'
		},
		lastModified: new Date(),
		protected: true
	},
	'/administration/edit-games': {
		pathnames: {
			[LocaleEnum.EN]: '/administration/edit-games',
			[LocaleEnum.CS]: '/administrace/upravit-hry'
		},
		lastModified: new Date(),
		protected: true
	},
	'/administration/edit-links': {
		pathnames: {
			[LocaleEnum.EN]: '/administration/edit-links',
			[LocaleEnum.CS]: '/administrace/upravit-odkazy'
		},
		lastModified: new Date(),
		protected: true
	},
	'/administration/account-and-privacy': {
		pathnames: {
			[LocaleEnum.EN]: '/administration/account-and-privacy',
			[LocaleEnum.CS]: '/administrace/ucet-a-soukromi'
		},
		lastModified: new Date(),
		protected: true
	},
	'/debug': {
		pathnames: {
			[LocaleEnum.EN]: '/debug',
			[LocaleEnum.CS]: '/debug'
		},
		lastModified: new Date(),
		protected: false
	}
};

export const routeMap: Record<string, string> = {};

for (const canonicalPath in routes) {
	const route = routes[canonicalPath];

	if (typeof route.pathnames === 'string') {
		routeMap[route.pathnames] = canonicalPath;

		if (canonicalPath === '/') {
			for (const locale of locales) {
				if (locale !== defaultLocale) {
					routeMap[`/${locale}`] = canonicalPath;
				}
			}
		}
	} else {
		for (const locale in route.pathnames) {
			const typedLocale = locale as LocaleType;
			const localizedPath = route.pathnames[typedLocale];

			if (typedLocale === defaultLocale) {
				routeMap[localizedPath] = canonicalPath;
			} else {
				routeMap[`/${typedLocale}${localizedPath}`] = canonicalPath;
			}
		}
	}
}

export const getLocalizedUrl = (locale: LocaleType, canonicalPath: string): string => {
	const validLocale = locales.includes(locale) ? locale : defaultLocale;

	const route = routes[canonicalPath];
	const isDefaultLocale = validLocale === defaultLocale;

	if (!route) {
		return isDefaultLocale ? canonicalPath : `/${validLocale}${canonicalPath}`;
	}

	const pathnames = route.pathnames;
	let localizedPathSegment: string;

	if (typeof pathnames === 'string') {
		localizedPathSegment = pathnames;
	} else {
		localizedPathSegment = pathnames[validLocale] ?? pathnames[defaultLocale];
	}

	if (localizedPathSegment === '/') {
		return isDefaultLocale ? '/' : `/${validLocale}`;
	}

	return isDefaultLocale ? localizedPathSegment : `/${validLocale}${localizedPathSegment}`;
};
