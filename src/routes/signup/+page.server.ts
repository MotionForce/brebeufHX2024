import { auth } from "$lib/server/lucia";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad, Actions } from "./$types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (session) throw redirect(302, "/");
    return {};
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const username = formData.get("username");
        const password = formData.get("password");
        const interests = formData.get("interest")?.toString().split("|&%&|");
        if (
            typeof username !== "string" ||
            username.length < 4 ||
            username.length > 31
        ) {
            error(400, "Invalid username");
        }
        if (
            typeof password !== "string" ||
            password.length < 6 ||
            password.length > 255
        ) {
            error(400, "Invalid password");
        }
        if (typeof interests !== "object" || interests.length < 1) {
            error(400, "Error reading interests.")
        }
        try {
            const user = await auth.createUser({
                key: {
                    providerId: "username",
                    providerUserId: username.toLowerCase(),
                    password
                },
                attributes: {
                    username,
                    interest: interests,
                }
            });
            const session = await auth.createSession({
                userId: user.userId,
                attributes: {}
            });
            locals.auth.setSession(session);
        } catch (e) {
            if (
                e instanceof PrismaClientKnownRequestError &&
                e.code === "P2002"
            ) {
                error(400, "Username already taken");
            }
            error(500, "An unknown error occurred");
        }
        throw redirect(302, "/");
    }
};