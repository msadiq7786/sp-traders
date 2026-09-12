import { Schema, model, type InferSchemaType } from "mongoose";

export type OrderStatus =
	| "pending"
	| "accepted"
	| "dispatched"
	| "delivered"
	| "rejected";

const orderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},

		grade: {
			type: String,
			required: true,
			trim: true,
			minlength: 1,
			maxlength: 50,
			lowercase: true,
		},

		quantity: {
			type: Number,
			required: true,
			min: 1,
			max: 100000,
		},

		date: {
			type: Date,
			required: true,
		},

		address: {
			type: String,
			required: true,
			trim: true,
			minlength: 10,
			maxlength: 500,
		},

		status: {
			type: String,
			enum: ["pending", "accepted", "dispatched", "delivered", "rejected"],
			default: "pending",
			index: true,
		},
	},
	{
		timestamps: true,
	},
);

export type Order = InferSchemaType<typeof orderSchema>;

export const Order = model<Order>("Order", orderSchema);
