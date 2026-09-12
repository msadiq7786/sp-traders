import { Router } from "express";
import { adminRouter } from "./admin/admin.routes.js";
import { authRouter } from "./auth/auth.routes.js";
import { healthRouter } from "./health/health.routes.js";
import { orderRouter } from "./orders/orders.route.js";
import { productRouter } from "./products/products.route.js";

export const apiRouter = Router();

apiRouter.use("/admin", adminRouter);
apiRouter.use("/health", healthRouter);
apiRouter.use("/session", authRouter);
apiRouter.use("/orders", orderRouter);
apiRouter.use("/products", productRouter);
