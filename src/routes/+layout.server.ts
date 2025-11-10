import { routeMap } from '$lib/routes';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const canonicalPath = routeMap[url.pathname] ?? '/';

	return {
		locale: locals.locale,
		url: url.href,
		user: locals.user,
		toast: locals.toast,
		canonicalPath
	};
};
