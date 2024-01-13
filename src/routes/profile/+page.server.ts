import { auth } from "$lib/server/lucia";
import { error, redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals, url }) => {
    const id = url.searchParams.get("id") ?? "";
    if (id !== "") {
        let user = await prisma.user.findUnique({ where: { id: id }, select: { id: true, username: true, interest: true } })
        if (user !== null) {
            return {
                userId: user["id"],
                username: user["username"],
                interests: user["interest"],
                signout: false,
            };
        };
    }
    const session = await locals.auth.validate();
    if (!session) throw redirect(302, "/login");
    const user_id = session.user.userId;
    const interest = await prisma.user.findUnique({ where: { id: session.user.userId }, select: { interest: true } })
    const post = await prisma.user.findMany({ where: { id: user_id }, select: { Post: { select: { id: true, title: true, body: true, warning: true, User: { select: { id: true, username: true } }, Reply: { select: { id: true } } } } }, orderBy: { createdAt: "desc" } })
    return {
        userId: session.user.userId,
        username: session.user.username,
        interests: interest?.interest,
        post: post[0]["Post"],
        signout: true,
    };
};

export const actions: Actions = {
    logout: async ({ locals }) => {
        const session = await locals.auth.validate();
        if (!session) error(401);
        await auth.invalidateSession(session.sessionId);
        await auth.deleteDeadUserSessions(session.user.userId);
        locals.auth.setSession(null);
        throw redirect(302, "/login");
    }
};