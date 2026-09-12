import { Router } from "express";
import {
	createOrder,
	getOrderById,
	getOrders,
	getUserAnalytics,
	updateOrder,
} from "./orders.controller.js";
import { requireAuth } from "../auth/auth.middleware.js";
import { validateData } from "@/middleware/validate.js";
import {
	createOrderSchema,
	getOrdersSchema,
	orderIdSchema,
	updateOrderSchema,
} from "./orders.validate.js";

export const orderRouter = Router();

orderRouter.use(requireAuth);

// Get Orders with Pagination
orderRouter.get("/", validateData(getOrdersSchema), getOrders);

// Order Analytics
orderRouter.get("/analytics", getUserAnalytics);

// Get Order By ID
orderRouter.get("/:orderId", validateData(orderIdSchema), getOrderById);

// Create Order
orderRouter.post("/", validateData(createOrderSchema), createOrder);

// Update Order
orderRouter.put("/:orderId", validateData(updateOrderSchema), updateOrder);
