import AbstractError from '$lib/errors/abstract-error';

export default class DuplicateValueError extends AbstractError {
	constructor(message?: string) {
		super(message ?? 'Found duplicate value.', 'DuplicateValueError');
	}
}
