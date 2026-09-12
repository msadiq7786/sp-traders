import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth.js";

export async function requireAuth(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const session = await auth.api.getSession({
			headers: fromNodeHeaders(req.headers),
		});

		if (!session) {
			return res.status(401).json({ error: "Authentication required" });
		}

		req.auth = session;
		req.user = session.user;
		return next();
	} catch (error) {
		return next(error);
	}
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
	const role = req.auth?.user.role;
	const roles =
		typeof role === "string" ? role.split(",").map((item) => item.trim()) : [];

	if (!roles.includes("admin")) {
		return res.status(403).json({ error: "Admin access required" });
	}

	return next();
}
