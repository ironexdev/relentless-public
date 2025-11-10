import type { LocaleType } from '$lib/types/locale-type';
import Handlebars from 'handlebars';
import { convert } from 'html-to-text';

export type CompiledTemplateResultType = {
	text: string;
	html: string;
};

export default class TemplateService {
	// Throws an error if the file does not exist or if the template is invalid
	static async compileTemplate(
		source: string,
		context: object,
		locale: LocaleType | null
	): Promise<CompiledTemplateResultType> {
		const template = Handlebars.compile(source);

		const html = template({ ...context, locale });

		const text = Handlebars.compile(convert(html))({
			...context,
			locale
		});

		return { text, html };
	}
}
