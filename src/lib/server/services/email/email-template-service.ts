import { APP_TITLE, SECURITY_EMAIL } from '$lib/config';
import {
	t_email_goodbye,
	t_email_greeting,
	t_email_login_attempt_subject,
	t_email_login_attempt_sentence1,
	t_email_login_attempt_sentence2,
	t_email_login_attempt_sentence3,
	t_email_login_subject,
	t_email_login_sentence1,
	t_email_login_sentence2,
	t_email_registration_attempt_subject,
	t_email_registration_attempt_sentence1,
	t_email_registration_attempt_sentence2,
	t_email_registration_subject,
	t_email_registration_sentence1,
	t_email_registration_sentence2,
	t_email_verification_subject,
	t_email_verification_sentence1,
	t_email_verification_sentence2,
	t_email_change_email_attempt_subject,
	t_email_change_email_attempt_sentence1,
	t_email_change_email_attempt_sentence2,
	t_email_change_email_attempt_sentence3
} from '$lib/i18n/messages/t-email';
import type { LocaleType } from '$lib/types/locale-type';
import TemplateService from '../template-service';
import loginEmailTemplate from '$lib/server/email-templates/login-email.hbs?raw';
import loginAttemptEmailTemplate from '$lib/server/email-templates/login-attempt-email.hbs?raw';
import registrationEmailTemplate from '$lib/server/email-templates/registration-email.hbs?raw';
import registrationAttemptEmailTemplate from '$lib/server/email-templates/registration-attempt-email.hbs?raw';
import verificationEmailTemplate from '$lib/server/email-templates/verification-email.hbs?raw';
import changeEmailAttemptEmailTemplate from '$lib/server/email-templates/change-email-attempt-email.hbs?raw';

export type CompiledTemplateResultType = {
	text: string;
	html: string;
};

export default class EmailTemplateService {
	static async getLoginAttemptTemplate(
		locale: LocaleType,
		registrationLink: string
	): Promise<CompiledTemplateResultType> {
		return await TemplateService.compileTemplate(
			loginAttemptEmailTemplate,
			{
				siteName: APP_TITLE,
				subject: t_email_login_attempt_subject(locale),
				greeting: t_email_greeting(locale),
				sentence1: t_email_login_attempt_sentence1(locale),
				sentence2: t_email_login_attempt_sentence2(locale, registrationLink),
				sentence3: t_email_login_attempt_sentence3(locale, SECURITY_EMAIL),
				goodbye: t_email_goodbye(locale)
			},
			locale
		);
	}

	static async getRegistrationAttemptTemplate(
		locale: LocaleType,
		loginLink: string
	): Promise<CompiledTemplateResultType> {
		return await TemplateService.compileTemplate(
			registrationAttemptEmailTemplate,
			{
				siteName: APP_TITLE,
				subject: t_email_registration_attempt_subject(locale),
				greeting: t_email_greeting(locale),
				sentence1: t_email_registration_attempt_sentence1(locale),
				sentence2: t_email_registration_attempt_sentence2(locale, loginLink),
				sentence3: t_email_login_attempt_sentence3(locale, SECURITY_EMAIL),
				goodbye: t_email_goodbye(locale)
			},
			locale
		);
	}

	static async getChangeEmailAttemptTemplate(
		locale: LocaleType,
		loginLink: string
	): Promise<CompiledTemplateResultType> {
		return await TemplateService.compileTemplate(
			changeEmailAttemptEmailTemplate,
			{
				siteName: APP_TITLE,
				subject: t_email_change_email_attempt_subject(locale),
				greeting: t_email_greeting(locale),
				sentence1: t_email_change_email_attempt_sentence1(locale),
				sentence2: t_email_change_email_attempt_sentence2(locale, loginLink),
				sentence3: t_email_change_email_attempt_sentence3(locale, SECURITY_EMAIL),
				goodbye: t_email_goodbye(locale)
			},
			locale
		);
	}

	static async getLoginTemplate(
		locale: LocaleType,
		data: {
			pin: string;
		}
	): Promise<CompiledTemplateResultType> {
		return await TemplateService.compileTemplate(
			loginEmailTemplate,
			{
				siteName: APP_TITLE,
				subject: t_email_login_subject(locale),
				greeting: t_email_greeting(locale),
				sentence1: t_email_login_sentence1(locale, data.pin),
				sentence2: t_email_login_sentence2(locale, SECURITY_EMAIL),
				goodbye: t_email_goodbye(locale)
			},
			locale
		);
	}

	static async getRegistrationTemplate(
		locale: LocaleType,
		data: {
			pin: string;
		}
	): Promise<CompiledTemplateResultType> {
		return await TemplateService.compileTemplate(
			registrationEmailTemplate,
			{
				siteName: APP_TITLE,
				subject: t_email_registration_subject(locale),
				greeting: t_email_greeting(locale),
				sentence1: t_email_registration_sentence1(locale, data.pin),
				sentence2: t_email_registration_sentence2(locale, SECURITY_EMAIL),
				goodbye: t_email_goodbye(locale)
			},
			locale
		);
	}

	static async getVerificationTemplate(
		locale: LocaleType,
		data: {
			pin: string;
		}
	): Promise<CompiledTemplateResultType> {
		return await TemplateService.compileTemplate(
			verificationEmailTemplate,
			{
				siteName: APP_TITLE,
				subject: t_email_verification_subject(locale),
				greeting: t_email_greeting(locale),
				sentence1: t_email_verification_sentence1(locale, data.pin),
				sentence2: t_email_verification_sentence2(locale, SECURITY_EMAIL),
				goodbye: t_email_goodbye(locale)
			},
			locale
		);
	}
}
