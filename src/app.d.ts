// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type DatabaseSessionAttributes = {};

		type UserSchema = {
			id: string;
		} & Lucia.DatabaseUserAttributes;

		type SessionSchema = {
			id: string;
			active_expires: number;
			idle_expires: number;
			user_id: string;
		} & Lucia.DatabaseSessionAttributes;

		type KeySchema = {
			id: string;
			user_id: string;
			hashed_password: string | null;
		};

		type DatabaseUserAttributes = {
			// required fields (i.e. id) should not be defined here
			username: string;
			Post: post[];
			Reply: reply[];
		};
	}
	namespace App {
		interface Locals {
			auth: import("lucia").AuthRequest;
		}
	}
}


// THIS IS IMPORTANT!!!
export { };