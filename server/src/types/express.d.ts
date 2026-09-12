import { User } from "better-auth";
import type { AuthSession } from "../features/auth/auth.ts";

declare global {
	namespace Express {
		interface Request {
			auth?: AuthSession;
			user: User;
		}
	}
}

export {};
