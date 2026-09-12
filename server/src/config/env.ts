import "dotenv/config";
import { z } from "zod";

const csv = (value: string | undefined) =>
	value
		?.split(",")
		.map((item) => item.trim())
		.filter(Boolean) ?? [];

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	PORT: z.coerce.number().int().positive().default(5000),
	CORS_ORIGINS: z.string().default("http://localhost:3000"),
	BETTER_AUTH_SECRET: z.string().min(1),
	BETTER_AUTH_URL: z.string().url(),
	MONGODB_URI: z.string().min(1),
	MONGODB_DB_NAME: z.string().min(1).default("sp-traders"),
	ADMIN_USER_IDS: z.string().optional(),
	RESEND_API: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	const details = parsedEnv.error.issues
		.map((issue) => `${issue.path.join(".")}: ${issue.message}`)
		.join("; ");

	throw new Error(`Invalid environment configuration: ${details}`);
}

export const env = {
	...parsedEnv.data,
	corsOrigins: csv(parsedEnv.data.CORS_ORIGINS),
	adminUserIds: csv(parsedEnv.data.ADMIN_USER_IDS),
};
