import mongoose from "mongoose";
import { z } from "zod";

export const mongooseIdSchema = z
	.string()
	.refine((id) => mongoose.Types.ObjectId.isValid(id), {
		message: "Invalid MongoDB ObjectId",
	});

export const createProductSchema = z.object({
	body: z.object({
		name: z
			.string()
			.trim()
			.min(3, "Product name must be at least 3 characters")
			.max(100, "Product name cannot exceed 100 characters"),

		code: z
			.string()
			.trim()
			.min(3, "Product code must be at least 3 characters")
			.max(30, "Product code cannot exceed 30 characters")
			.regex(
				/^[A-Za-z0-9_-]+$/,
				"Product code can only contain letters, numbers, hyphens and underscores",
			),

		isActive: z.boolean().optional().default(true),
	}),
});

export const updateProductSchema = z.object({
	params: z.object({
		productId: mongooseIdSchema,
	}),
	body: z
		.object({
			name: z.string().trim().min(2).max(100).optional(),

			code: z
				.string()
				.trim()
				.min(2)
				.max(30)
				.regex(
					/^[A-Za-z0-9-_]+$/,
					"Product code can only contain letters, numbers, hyphens and underscores",
				)
				.optional(),

			isActive: z.boolean().optional(),
		})
		.refine((data) => Object.keys(data).length > 0, {
			message: "At least one field is required to update",
		}),
});

export const productIdSchema = z.object({
	params: z.object({
		productId: mongooseIdSchema,
	}),
});
