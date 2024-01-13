import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) return { session_status: false };
    return {
        session_status: true,
        userId: session.user.userId,
        username: session.user.username
    };
};