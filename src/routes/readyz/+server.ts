import { json } from '@sveltejs/kit';

export async function GET() {
	try {
		return json({ status: 'ok' }, { status: 200 });
	} catch {
		return json({ status: 'not ready' }, { status: 503 });
	}
}
