import { z } from 'zod';
import { t_validation_invalid_email, t_validation_invalid_pin } from './i18n/messages/t-validation';
import type { LocaleType } from './types/locale-type';

export const loginSchema = (locale: LocaleType) =>
	z.object({
		email: z.email(t_validation_invalid_email(locale))
	});

export const registrationSchema = (locale: LocaleType) =>
	z.object({
		email: z.email(t_validation_invalid_email(locale))
	});

export const verifySchema = (locale: LocaleType) =>
	z.object({
		email: z.email(t_validation_invalid_email(locale)),
		pin: z
			.string()
			.min(6, t_validation_invalid_pin(locale))
			.max(6, t_validation_invalid_pin(locale))
	});

export const verifyChangeEmailSchema = (locale: LocaleType) =>
	z.object({
		currentEmail: z.email(t_validation_invalid_email(locale)),
		newEmail: z.email(t_validation_invalid_email(locale)),
		pin: z
			.string()
			.min(6, t_validation_invalid_pin(locale))
			.max(6, t_validation_invalid_pin(locale))
	});
