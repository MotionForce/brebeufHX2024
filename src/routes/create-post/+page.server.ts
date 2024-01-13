import { redirect, type Actions, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) throw redirect(302, "/login");;
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({ request, locals }) => {
        const data = await request.formData();
        const post_title = await data.get("post_title")?.toString();
        const post_body = await data.get("post_body")?.toString();
        const session = await locals.auth.validate();
        if (post_title === undefined || post_body === undefined || session === null) error(400, "The title or the body of the post, or the user information, was not processed correctly");
        const res = await prisma.post.create({ data: { title: post_title, body: post_body, User: { connect: { id: session.user.userId } } } })
        throw redirect(302, "/");
    }
};