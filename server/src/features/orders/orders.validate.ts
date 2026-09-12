import mongoose from "mongoose";
import { z } from "zod";

export const mongooseIdSchema = z
	.string()
	.refine((id) => mongoose.Types.ObjectId.isValid(id), {
		message: "Invalid MongoDB ObjectId",
	});

// Create
export const createOrderSchema = z.object({
	body: z.object({
		grade: z
			.string()
			.trim()
			.toLowerCase()
			.min(1, "Grade is required")
			.max(50, "Grade must be at most 50 characters"),

		quantity: z.coerce
			.number()
			.min(1, "Quantity must be at least 1")
			.max(100000, "Quantity cannot exceed 100,000"),

		date: z.string(),

		address: z
			.string()
			.min(10, "Address must be at least 10 characters")
			.max(500, "Address must be at most 500 characters"),
	}),
});

// Update
export const updateOrderSchema = z.object({
	params: z.object({
		orderId: mongooseIdSchema,
	}),

	body: z
		.object({
			grade: z
				.string()
				.trim()
				.toLowerCase()
				.min(1, "Grade is required")
				.max(50, "Grade must be at most 50 characters")
				.optional(),

			quantity: z.coerce
				.number()
				.min(1, "Quantity must be at least 1")
				.max(100000, "Quantity cannot exceed 100,000")
				.optional(),

			date: z.coerce.date().optional(),

			address: z
				.string()
				.min(10, "Address must be at least 10 characters")
				.max(500, "Address must be at most 500 characters")
				.optional(),
		})
		.refine(
			(data) => Object.values(data).some((value) => value !== undefined),
			{ message: "At least one field must be provided to update the order" },
		),
});

// Update Order schema
export const updateOrderStatusSchema = z.object({
	params: z.object({
		orderId: mongooseIdSchema,
	}),
	body: z.object({
		status: z.enum([
			"pending",
			"accepted",
			"dispatched",
			"delivered",
			"rejected",
		]),
	}),
});

// Delete
export const orderIdSchema = z.object({
	params: z.object({
		orderId: mongooseIdSchema,
	}),
});

export const getOrdersSchema = z
	.object({
		query: z.object({
			page: z.coerce.number().int().default(0),

			limit: z.coerce
				.number()
				.int()
				.min(1, "Limit must be at least 1")
				.max(100, "Limit cannot exceed 100")
				.default(10),
			period: z
				.preprocess(
					(val) => (val === "" ? undefined : val),
					z.enum(["1day", "1week", "1month", "6months", "1year"]),
				)
				.default("1month"),

			userId: mongooseIdSchema.optional(),
			status: z
				.enum(["", "pending", "accepted", "dispatch", "delivered", "rejected"])
				.default(""),
		}),
		body: z.any().optional(),
		params: z.any().optional(),
	})
	.strict();
