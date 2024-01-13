import { redirect, type Actions, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import fetch from "node-fetch";
import { query_llm } from '$lib/server/llm';

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
        const res = await prisma.post.create({ data: { title: post_title, body: post_body, User: { connect: { id: session.user.userId } } } });
        query_llm(post_body).then(async (warning_level) => {
            const update_warning = await prisma.post.update({
                where: {
                    id: res.id,
                },
                data: {
                    warning: warning_level,
                },
            });
        });
        throw redirect(302, "/");
    }
};
