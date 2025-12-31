import type { ToastType } from '$lib/types/ToastType';
import type { LocaleType } from '$lib/types/locale-type';

declare global {
	namespace App {
		interface Locals {
			locale: LocaleType;
			user: {
				userId: string;
				email: string;
				createdAt: Date;
			} | null;
			canonicalPath: string;
			toast?: {
				type: ToastType;
				message: string;
			};
		}

		interface PageData {
			user: Locals['user'];
		}
	}
}

export {};
