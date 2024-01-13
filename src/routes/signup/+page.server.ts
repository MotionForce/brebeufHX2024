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
        // basic check
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
        try {
            const user = await auth.createUser({
                key: {
                    providerId: "username", // auth method
                    providerUserId: username.toLowerCase(), // unique id when using "username" auth method
                    password // hashed by Lucia
                },
                attributes: {
                    username,
                }
            });
            const session = await auth.createSession({
                userId: user.userId,
                attributes: {}
            });
            locals.auth.setSession(session); // set session cookie
        } catch (e) {
            // this part depends on the database you're using
            // check for unique constraint error in user table
            if (
                e instanceof PrismaClientKnownRequestError &&
                e.code === "P2002"
            ) {
                error(400, "Username already taken");
            }
            error(500, "An unknown error occurred");
        }
        // redirect to
        // make sure you don't throw inside a try/catch block!
        throw redirect(302, "/");
    }
};