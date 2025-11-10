import { json } from '@sveltejs/kit';

export function GET() {
	const data = {
		foo: 'bar'
	};

	return json(data);
}
