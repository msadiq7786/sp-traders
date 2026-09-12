import { Router } from "express";
import { requireAdmin, requireAuth } from "../auth/auth.middleware.js";
import {
	deleteOrder,
	getAdminAnalytics,
	getAdminOrderById,
	getAdminOrders,
	updateOrderStatus,
} from "../orders/orders.controller.js";
import { validateData } from "@/middleware/validate.js";
import {
	getOrdersSchema,
	orderIdSchema,
	updateOrderStatusSchema,
} from "../orders/orders.validate.js";
import {
	createProduct,
	deleteProduct,
	updateProduct,
} from "../products/products.controller.js";
import {
	createProductSchema,
	productIdSchema,
	updateProductSchema,
} from "../products/products.validation.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireAdmin);

adminRouter.get("/dashboard", (req, res) => {
	res.json({
		message: "Admin access granted",
		user: req.auth?.user,
	});
});

adminRouter.get("/orders", validateData(getOrdersSchema), getAdminOrders);
adminRouter.get(
	"/orders/:orderId",
	validateData(orderIdSchema),
	getAdminOrderById,
);
adminRouter.put(
	"/orders/:orderId",
	validateData(updateOrderStatusSchema),
	updateOrderStatus,
);
adminRouter.delete(
	"/orders/:orderId",
	validateData(orderIdSchema),
	deleteOrder,
);

adminRouter.post("/products", validateData(createProductSchema), createProduct);

adminRouter.put(
	"/products/:productId",
	validateData(updateProductSchema),
	updateProduct,
);

adminRouter.delete(
	"/products/:productId",
	validateData(productIdSchema),
	deleteProduct,
);

// Order Analytics
adminRouter.get("/analytics", getAdminAnalytics);
