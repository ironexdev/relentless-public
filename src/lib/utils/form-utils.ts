import type { ActionResult } from '@sveltejs/kit';
import { toast } from 'svelte-sonner';

type GenericError = { message: string };

const defaultUnknownError: GenericError = {
	message: 'Something went wrong. Please refresh the page and try again later'
};

export type FormResultResponse<T> = {
	status: number;
	data?: T;
	error?: GenericError;
};

/**
 * Processes a SvelteKit form action result to determine the error state and show a toast.
 * @template T - The expected shape of the validation error data object.
 * @param {ActionResult} result - The result object from the SvelteKit form action.
 * @param {GenericError} [unknownError] - Optional fallback error object for unhandled server errors.
 * @returns {FormResultResponse<T>} An object containing the status code and the data payload.
 */
export async function handleFormResult<T extends Record<string, unknown>>(
	result: ActionResult,
	unknownError: GenericError = defaultUnknownError
): Promise<FormResultResponse<T>> {
	switch (result.type) {
		case 'success': {
			const data = (result.data as T) ?? {};
			const message = data.message as string | undefined;

			if (message) {
				toast.success(message);
			}

			return { status: result.status, data };
		}
		case 'failure': {
			const data = result.data as T;
			const message = data.message as string | undefined;

			if (message) {
				toast.error(message);
			}

			return { status: result.status, data };
		}
		case 'error': {
			toast.error(unknownError.message);

			return { status: result.status ?? 500, error: unknownError };
		}
		case 'redirect': {
			return { status: 303 };
		}
	}
}
