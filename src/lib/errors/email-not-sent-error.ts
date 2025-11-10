import AbstractError from '$lib/errors/abstract-error';

export default class EmailNotSentError extends AbstractError {
	constructor(message: string, originalErrorName: string, originalErrorMessage: string) {
		super(
			`${message}; Mailer error code: ${originalErrorName}; Mailer error message: ${originalErrorMessage}`,
			'EmailNotSentError'
		);
	}
}
