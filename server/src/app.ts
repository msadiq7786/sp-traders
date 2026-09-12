import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { toNodeHandler } from "better-auth/node";
import { env } from "./config/env.js";
import { auth } from "./features/auth/auth.js";
import { apiRouter } from "./features/index.js";
import { errorHandler } from "./middleware/error.js";
import { logger } from "./utils/logger.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

export const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
);
app.use(
	morgan(env.NODE_ENV === "production" ? "combined" : "dev", {
		stream: {
			write: (message) => logger.info(message.trim()),
		},
	}),
);

app.all("/api/auth/{*auth}", toNodeHandler(auth));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use(
	"/api",
	rateLimit({
		windowMs: 15 * 60 * 1000,
		limit: 100,
		standardHeaders: true,
		legacyHeaders: false,
	}),
	apiRouter,
);

app.use((_req, res) => {
	res.status(404).json({ error: "Not found" });
});

app.use(errorHandler);
