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
	'/settings': {
		pathnames: {
			[LocaleEnum.EN]: '/settings',
			[LocaleEnum.CS]: '/nastaveni'
		},
		lastModified: new Date(),
		protected: true
	}
};

export const routeMap: Record<string, string> = {};

for (const canonicalPath in routes) {
	const route = routes[canonicalPath];

	if (typeof route.pathnames === 'string') {
		// Set the default mapping, e.g., '/' -> '/'
		routeMap[route.pathnames] = canonicalPath;

		// Add a special case ONLY for the index page to create localized routes.
		if (canonicalPath === '/') {
			for (const locale of locales) {
				if (locale !== defaultLocale) {
					// Creates the specific mapping for '/cs' -> '/'
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
	// Validate the incoming locale and fall back to the default if it's invalid.
	const validLocale = locales.includes(locale) ? locale : defaultLocale;

	const route = routes[canonicalPath];
	const isDefaultLocale = validLocale === defaultLocale;

	// Fallback for any path not defined in the routes configuration.
	if (!route) {
		return isDefaultLocale ? canonicalPath : `/${validLocale}${canonicalPath}`;
	}

	const pathnames = route.pathnames;
	let localizedPathSegment: string;

	if (typeof pathnames === 'string') {
		// Handles non-translated paths, primarily the homepage ('/').
		localizedPathSegment = pathnames;
	} else {
		// Handles translated paths (e.g., '/login' -> '/prihlaseni').
		localizedPathSegment = pathnames[validLocale] ?? pathnames[defaultLocale];
	}

	// The root path is a special case: '/cs' instead of '/cs/'.
	if (localizedPathSegment === '/') {
		return isDefaultLocale ? '/' : `/${validLocale}`;
	}

	// Constructs the final URL.
	return isDefaultLocale ? localizedPathSegment : `/${validLocale}${localizedPathSegment}`;
};
