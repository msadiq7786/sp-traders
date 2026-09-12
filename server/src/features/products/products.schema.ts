import { Schema, model, type InferSchemaType } from "mongoose";

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},

		code: {
			type: String,
			required: true,
			trim: true,
			uppercase: true,
			unique: true,
		},

		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);

export type Product = InferSchemaType<typeof productSchema>;

export const Product = model<Product>("Product", productSchema);
