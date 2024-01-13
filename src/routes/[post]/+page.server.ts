import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const id = parseInt(params.post)
    return {
        post: await prisma.post.findUniqueOrThrow({ where: { id: id }, select: { title: true, body: true, createdAt: true, User: { select: { username: true } }, Reply: { select: { body: true, createdAt: true, User: { select: { username: true } } } } } })
    };
}) satisfies PageServerLoad;