import AbstractError from '$lib/errors/abstract-error';

export default class ReadFileError extends AbstractError {
	constructor(
		message: string,
		public previous?: Error
	) {
		super(message, 'ReadFileError', previous);
	}
}
