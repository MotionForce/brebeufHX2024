import { auth } from "$lib/server/lucia";
import { error, redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) throw redirect(302, "/login");
    return {
        userId: session.user.userId,
        username: session.user.username
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