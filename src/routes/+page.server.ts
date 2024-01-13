import type { PageServerLoad } from "./$types";
import { get_personalised_posts } from "$lib/server/get_personalised_posts";
import { prisma } from "$lib/server/prisma";

export const load = (async ({ locals }) => {
    const session = await locals.auth.validate();
    // if (!session) {
    return {
        posts: await prisma.post.findMany({ select: { id: true, title: true, body: true, warning: true, User: { select: { id: true, username: true } }, Reply: { select: { id: true } } } }),
        personalised: false,
    }
    // };
    // return {
    //     posts: await get_personalised_posts(),
    //     personalised: true,
    // };
}) satisfies PageServerLoad;