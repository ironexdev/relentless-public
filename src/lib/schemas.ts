import { z } from 'zod';
import {
	t_validation_invalid_email,
	t_validation_invalid_pin,
	t_validation_invalid_username,
	t_validation_invalid_profile_link,
	t_validation_invalid_year_of_birth
} from './i18n/messages/t-validation';
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

export const updateProfileSchema = (locale: LocaleType) => {
	const currentYear = new Date().getFullYear();
	return z.object({
		username: z
			.string()
			.min(2, t_validation_invalid_username(locale))
			.max(24, t_validation_invalid_username(locale))
			.regex(/^[A-Za-z0-9]+(_[A-Za-z0-9]+)*$/, t_validation_invalid_username(locale)),
		profileLink: z
			.string()
			.min(2, t_validation_invalid_profile_link(locale))
			.max(24, t_validation_invalid_profile_link(locale))
			.regex(/^[a-z]+(-[a-z]+)*$/, t_validation_invalid_profile_link(locale)),
		yearOfBirth: z.coerce
			.number()
			.int()
			.min(1900, t_validation_invalid_year_of_birth(locale))
			.max(currentYear, t_validation_invalid_year_of_birth(locale))
	});
};

export const updateProfileWithPinSchema = (locale: LocaleType) => {
	return updateProfileSchema(locale).extend({
		pin: z
			.string()
			.min(6, t_validation_invalid_pin(locale))
			.max(6, t_validation_invalid_pin(locale))
	});
};
