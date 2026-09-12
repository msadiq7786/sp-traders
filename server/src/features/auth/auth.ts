import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import { admin } from "better-auth/plugins";

import { env } from "@/config/env.js";

const client = new MongoClient(env.MONGODB_URI);
const db = client.db(env.MONGODB_DB_NAME);

export const auth = betterAuth({
	appName: "SP Traders",

	baseURL: env.BETTER_AUTH_URL,

	secret: env.BETTER_AUTH_SECRET,

	trustedOrigins: env.corsOrigins,

	database: mongodbAdapter(db),

	emailAndPassword: {
		enabled: true,
	},

	plugins: [
		admin({
			defaultRole: "user",
			adminRoles: ["admin"],
			adminUserIds: env.adminUserIds,
		}),
	],
});

export type AuthSession = typeof auth.$Infer.Session;
