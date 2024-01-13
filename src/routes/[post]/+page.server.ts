import { prisma } from '$lib/server/prisma';
import { redirect, type Actions, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const id = parseInt(params.post)
    return {
        post: await prisma.post.findUniqueOrThrow({ where: { id: id }, select: { id: true, title: true, body: true, createdAt: true, User: { select: { username: true } }, Reply: { select: { body: true, createdAt: true, User: { select: { username: true } } } } } })
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    reply: async ({ request, locals }) => {
        const data = await request.formData();
        const reply = await data.get("reply")?.toString();
        const id = parseInt(await data.get("post_id")?.toString());
        const session = await locals.auth.validate();
        if (reply === undefined || session === null) error(400, "The title or the body of the post, or the user information, was not processed correctly");
        const res = await prisma.reply.create({ data: { body: reply, User: { connect: { id: session.user.userId } }, Post: { connect: { id: id } } } })
        throw redirect(302, "#");
    }
}