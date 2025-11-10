import type { LocaleEnum } from '$lib/enums/locale-enum';
import type { LocaleType } from '$lib/types/locale-type';
import { IntlMessageFormat } from 'intl-messageformat';

export type MessagesType = {
	[key in LocaleEnum]: string;
};

export function t(
	messages: MessagesType,
	lang: LocaleType,
	count = 1,
	variables: Record<string, unknown> = {}
): string {
	const finalVariables = {
		...variables,
		count
	};

	const msg = new IntlMessageFormat(messages[lang], lang, undefined, {
		ignoreTag: true
	});

	return msg.format(finalVariables) as string;
}
