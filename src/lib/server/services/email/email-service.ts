import { APP_TITLE, SERVICE_EMAIL } from '$lib/config';
import EmailNotSentError from '$lib/errors/email-not-sent-error';
import {
	t_email_login_attempt_subject,
	t_email_login_subject,
	t_email_registration_attempt_subject,
	t_email_registration_subject,
	t_email_verification_subject,
	t_email_change_email_attempt_subject
} from '$lib/i18n/messages/t-email';
import EmailTemplateService from '$lib/server/services/email/email-template-service';
import type { CompiledTemplateResultType } from '$lib/server/services/template-service';
import type { LocaleType } from '$lib/types/locale-type';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

export default class EmailService {
	private static mailer: Resend | null;

	private static getMailer() {
		if (!this.mailer) {
			this.mailer = new Resend(env.RESEND_API_KEY);
		}

		return this.mailer;
	}

	private static async sendEmail(
		to: string,
		subject: string,
		text: string,
		html?: string
	): Promise<void> {
		const from = `${APP_TITLE} <${SERVICE_EMAIL}>`;

		const { error } = await this.getMailer().emails.send({
			from,
			to,
			subject,
			text,
			html
		});

		if (error) {
			throw new EmailNotSentError(
				`Failed to send login attempt email to ${to}`,
				error.name,
				error.message
			);
		}
	}

	static async sendLoginAttemptEmail(
		locale: LocaleType,
		to: string,
		registrationLink: string
	): Promise<CompiledTemplateResultType> {
		const subject = t_email_login_attempt_subject(locale);

		const template = await EmailTemplateService.getLoginAttemptTemplate(locale, registrationLink);

		const { text, html } = template;
		await this.sendEmail(to, subject, text, html);

		return { text, html };
	}

	static async sendRegistrationAttemptEmail(
		locale: LocaleType,
		to: string,
		loginLink: string
	): Promise<CompiledTemplateResultType> {
		const subject = t_email_registration_attempt_subject(locale);

		const template = await EmailTemplateService.getRegistrationAttemptTemplate(locale, loginLink);

		const { text, html } = template;

		await this.sendEmail(to, subject, text, html);

		return { text, html };
	}

	static async sendChangeEmailAttemptEmail(
		locale: LocaleType,
		to: string,
		loginLink: string
	): Promise<CompiledTemplateResultType> {
		const subject = t_email_change_email_attempt_subject(locale);

		const template = await EmailTemplateService.getChangeEmailAttemptTemplate(locale, loginLink);

		const { text, html } = template;

		await this.sendEmail(to, subject, text, html);

		return { text, html };
	}

	static async sendLoginEmail(
		locale: LocaleType,
		to: string,
		pin: string
	): Promise<CompiledTemplateResultType> {
		const subject = t_email_login_subject(locale);

		const template = await EmailTemplateService.getLoginTemplate(locale, {
			pin
		});

		const { text, html } = template;

		await this.sendEmail(to, subject, text, html);

		return { text, html };
	}

	static async sendRegistrationEmail(
		locale: LocaleType,
		to: string,
		pin: string
	): Promise<CompiledTemplateResultType> {
		const subject = t_email_registration_subject(locale);

		const template = await EmailTemplateService.getRegistrationTemplate(locale, { pin });

		const { text, html } = template;

		await this.sendEmail(to, subject, text, html);

		return { text, html };
	}

	static async sendVerificationEmail(
		locale: LocaleType,
		to: string,
		pin: string
	): Promise<CompiledTemplateResultType> {
		const subject = t_email_verification_subject(locale);

		const template = await EmailTemplateService.getVerificationTemplate(locale, { pin });

		const { text, html } = template;

		await this.sendEmail(to, subject, text, html);

		return { text, html };
	}
}
