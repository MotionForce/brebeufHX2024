import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { get_personalised_posts } from "$lib/server/get_personalised_posts";

export const load = (async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) {
        return {
            posts: await prisma.post.findMany({ select: { id: true, title: true, body: true, warning: true, User: { select: { id: true, username: true } }, Reply: { select: { id: true } } }, orderBy: { createdAt: "desc" } }),
            similar_users: null,
        }
    };
    // TODO: CONNECT SIMILAR_USERS TO THE VECTOR DB
    const user_id = session.user.userId;
    const interest_query = await prisma.user.findUnique({
        where: {
            id: user_id
        }
    });
    const interests = interest_query.interest;
    let final_interest_query = "";
    for (let i in interests){
        final_interest_query += interests[i] + ", ";
    }
    const similar_users_id = await get_personalised_posts(final_interest_query);
    let similar_users_objects: any = [];
    for (let i in similar_users_id){
        const user = await prisma.user.findFirst({
            where:{
                id: similar_users_id[i]
            },
            select: {
                id: true,
                username: true,
            }
        });
        if (user !== null){
            similar_users_objects.push(user);
        }
    }
    console.log(similar_users_objects);
    return {
        posts: await prisma.post.findMany({ select: { id: true, title: true, body: true, warning: true, User: { select: { id: true, username: true } }, Reply: { select: { id: true } } }, orderBy: { createdAt: "desc" } }),
        similar_users: similar_users_objects,
    };
}) satisfies PageServerLoad;
