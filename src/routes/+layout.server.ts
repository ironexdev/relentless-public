import { NODE_ENV } from '$env/static/private';
import { routeMap } from '$lib/routes';
import AnnouncementService from '$lib/server/services/announcement-service';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const canonicalPath = routeMap[url.pathname] ?? '/';

	return {
		locale: locals.locale,
		url: url.href,
		user: locals.user,
		toast: locals.toast,
		canonicalPath,
		env: NODE_ENV,
		announcementMessage: AnnouncementService.getMessage(locals.user, locals.locale)
	};
};
