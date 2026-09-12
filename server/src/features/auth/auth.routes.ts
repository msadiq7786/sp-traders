import { Router } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth.js";

export const authRouter = Router();

authRouter.get("/me", async (req, res, next) => {
	try {
		const session = await auth.api.getSession({
			headers: fromNodeHeaders(req.headers),
		});

		res.json({ session });
	} catch (error) {
		next(error);
	}
});
