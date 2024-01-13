import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load = (async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) {
        return {
            posts: await prisma.post.findMany({ select: { id: true, title: true, body: true, warning: true, User: { select: { id: true, username: true } }, Reply: { select: { id: true } } }, orderBy: { createdAt: "desc" } }),
            similar_users: null,
        }
    };
    // TODO: CONNECT SIMILAR_USERS TO THE VECTOR DB
    return {
        posts: await prisma.post.findMany({ select: { id: true, title: true, body: true, warning: true, User: { select: { id: true, username: true } }, Reply: { select: { id: true } } }, orderBy: { createdAt: "desc" } }),
        similar_users: await prisma.user.findMany(),
    };
}) satisfies PageServerLoad;