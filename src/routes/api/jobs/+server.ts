import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    return json({ jobs: ['job1', 'job2'] });
}