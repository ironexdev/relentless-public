import { routeMap } from '$lib/routes';
import { type Reroute } from '@sveltejs/kit';

export const reroute: Reroute = ({ url }) => {
	return routeMap[url.pathname] ?? url.pathname;
};
