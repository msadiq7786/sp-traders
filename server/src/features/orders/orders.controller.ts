import { asyncHandler } from "@/utils/async-handler.js";
import { Request, Response } from "express";
import { User } from "../auth/auth.schema.js";
import { Order, OrderStatus } from "./orders.schema.js";
import { ApiError } from "@/utils/api-error.js";
import { ApiResponse } from "@/utils/api-response.js";
import mongoose from "mongoose";
import { Product } from "../products/products.schema.js";
import { inngest } from "@/inngest/index.js";

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
	const { page = "1", limit = "10", period, status } = req.query;
	const { id: userId } = req.user;

	// Pagination
	const pageNumber = Math.max(Number(page), 1);
	const limitNumber = Math.min(Math.max(Number(limit), 1), 100);

	const skip = (pageNumber - 1) * limitNumber;

	const filter: Record<string, any> = {};

	if (period) {
		const now = new Date();
		const startDate = new Date(now);

		switch (period as OrderPeriod) {
			case "1day":
				startDate.setDate(now.getDate() - 1);
				break;

			case "1week":
				startDate.setDate(now.getDate() - 7);
				break;

			case "1month":
				startDate.setMonth(now.getMonth() - 1);
				break;

			case "6months":
				startDate.setMonth(now.getMonth() - 6);
				break;

			case "1year":
				startDate.setFullYear(now.getFullYear() - 1);
				break;

			default:
				throw new ApiError(
					400,
					"Invalid period. Use 1day, 1week, 1month, 6months or 1year",
				);
		}

		filter.createdAt = {
			$gte: startDate,
			$lte: now,
		};
	}

	if (status) {
		filter["status"] = status;
	}
	// Fetch orders
	const [orders, totalOrders] = await Promise.all([
		Order.find({
			user: userId,
			...filter,
		})
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limitNumber)
			.lean(),

		Order.countDocuments({ user: userId, ...filter }),
	]);

	const totalPages = Math.ceil(totalOrders / limitNumber);

	return res.status(200).json(
		new ApiResponse(
			200,
			{
				orders,
				pagination: {
					page: pageNumber,
					limit: limitNumber,
					totalOrders,
					totalPages,
					hasNextPage: pageNumber < totalPages,
					hasPreviousPage: pageNumber > 1,
				},
			},
			"Orders fetched successfully",
		),
	);
});

// Get order by ID
export const getOrderById = asyncHandler(
	async (req: Request, res: Response) => {
		const { orderId } = req.params;
		const { id: userId } = req.user;

		const order = await Order.findOne({
			_id: orderId,
			user: userId,
		});

		if (!order) {
			throw new ApiError(404, "Order not found");
		}

		return res
			.status(200)
			.json(new ApiResponse(200, order, "Order fetched successfully"));
	},
);

// Create order
export const createOrder = asyncHandler(async (req: Request, res: Response) => {
	const { id: userId } = req.user;

	const grade = req.body.grade;

	const invalidGrade = await Product.findOne({
		name: { $regex: `^${grade}$`, $options: "i" },
	});

	if (!invalidGrade) {
		throw new ApiError(400, "Invalid grade provided");
	}

	const order = await Order.create({
		...req.body,
		user: userId,
	});
	// TODO: Add Inngest Background Job for Email
	return res
		.status(200)
		.json(new ApiResponse(200, order, "Order created successfully"));
});

// Update order
export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
	const { orderId } = req.params;
	const { id: userId } = req.user;

	const orderExist = await Order.findOne({
		_id: orderId,
		user: userId,
	});

	if (!orderExist) {
		throw new ApiError(404, "Order not found");
	}

	const grade = req.body.grade;

	if (grade) {
		const product = await Product.findOne({ name: grade });

		if (!product) {
			throw new ApiError(400, "Invalid grade provided");
		}
	}

	const restrictedStatuses: OrderStatus[] = [
		"accepted",
		"dispatched",
		"delivered",
		"rejected",
	];
	if (restrictedStatuses.includes(orderExist.status)) {
		throw new ApiError(
			400,
			"You can't change or update this order. Please contact admin.",
		);
	}

	const order = await Order.findOneAndUpdate(
		{
			_id: orderId,
			user: userId,
		},
		{
			$set: req.body,
		},
		{
			new: true,
			runValidators: true,
		},
	);

	if (!order) {
		throw new ApiError(404, "Order not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, order, "Order updated successfully"));
});

type OrderPeriod = "1day" | "1week" | "1month" | "6months" | "1year";

// Fetch Orders (Admin)
export const getAdminOrders = asyncHandler(
	async (req: Request, res: Response) => {
		const { page = "1", limit = "10", period, userId } = req.query;

		// Pagination
		const pageNumber = Math.max(Number(page), 1);
		const limitNumber = Math.min(Math.max(Number(limit), 1), 100);

		const skip = (pageNumber - 1) * limitNumber;

		const filter: Record<string, any> = {};

		if (userId) {
			filter.user = userId;
		}

		if (period) {
			const now = new Date();
			const startDate = new Date(now);

			switch (period as OrderPeriod) {
				case "1day":
					startDate.setDate(now.getDate() - 1);
					break;

				case "1week":
					startDate.setDate(now.getDate() - 7);
					break;

				case "1month":
					startDate.setMonth(now.getMonth() - 1);
					break;

				case "6months":
					startDate.setMonth(now.getMonth() - 6);
					break;

				case "1year":
					startDate.setFullYear(now.getFullYear() - 1);
					break;

				default:
					throw new ApiError(
						400,
						"Invalid period. Use 1day, 1week, 1month, 6months or 1year",
					);
			}

			filter.createdAt = {
				$gte: startDate,
				$lte: now,
			};
		}

		// Fetch orders
		const [orders, totalOrders] = await Promise.all([
			Order.find(filter)
				.populate({
					path: "user",
					select: "name email",
				})
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limitNumber)
				.lean(),

			Order.countDocuments(filter),
		]);

		const totalPages = Math.ceil(totalOrders / limitNumber);

		return res.status(200).json(
			new ApiResponse(
				200,
				{
					orders,
					pagination: {
						page: pageNumber,
						limit: limitNumber,
						totalOrders,
						totalPages,
						hasNextPage: pageNumber < totalPages,
						hasPreviousPage: pageNumber > 1,
					},
				},
				"Orders fetched successfully",
			),
		);
	},
);

export const getAdminOrderById = asyncHandler(
	async (req: Request, res: Response) => {
		const { orderId } = req.params;

		const order = await Order.findById(orderId).populate({
			path: "user",
			select: "name email",
		});

		if (!order) {
			throw new ApiError(404, "Order not found");
		}

		return res
			.status(200)
			.json(new ApiResponse(200, order, "Order fetched successfully"));
	},
);

// Update Order Status
export const updateOrderStatus = asyncHandler(
	async (req: Request, res: Response) => {
		const { orderId } = req.params;

		// Validate request body
		const { status } = req.body;

		// Check if order exists
		const orderExist = await Order.findById(orderId);

		if (!orderExist) {
			throw new ApiError(404, "Order not found");
		}

		// Update order status
		const order = await Order.findByIdAndUpdate(
			orderId,
			{
				$set: {
					status,
				},
			},
			{
				new: true,
				runValidators: true,
			},
		);

		if (!order) {
			throw new ApiError(404, "Order not found");
		}

		const user = await User.findById({
			_id: order.user,
		});

		await inngest.send({
			name: "order/status.updated",
			data: {
				order: {
					_id: order._id.toString(),
					address: order.address,
					quantity: order.quantity,
					grade: order.grade,
					date: order.date,
					status: order.status,
				},
				user: { email: user.email },
			},
		});
		return res
			.status(200)
			.json(new ApiResponse(200, order, "Order status updated successfully"));
	},
);

// Delete order
export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
	const { orderId } = req.params;
	const { id: userId } = req.user;

	const order = await Order.findOneAndDelete({
		_id: orderId,
		user: userId,
	});

	if (!order) {
		throw new ApiError(404, "Order not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, null, "Order deleted successfully"));
});

export const getUserAnalytics = asyncHandler(
	async (req: Request, res: Response) => {
		const { id: userId } = req.user;

		const [
			totalOrders,
			pendingOrders,
			acceptedOrders,
			dispatchOrders,
			deliveredOrders,
			rejectedOrders,
			totalQuantity,
			recentOrders,
		] = await Promise.all([
			// Total orders
			Order.countDocuments({
				user: userId,
			}),

			// Pending orders
			Order.countDocuments({
				user: userId,
				status: "pending",
			}),

			// Accepted orders
			Order.countDocuments({
				user: userId,
				status: "accepted",
			}),

			// Dispatch orders
			Order.countDocuments({
				user: userId,
				status: "dispatched",
			}),

			// Delivered orders
			Order.countDocuments({
				user: userId,
				status: "delivered",
			}),

			// rejected orders
			Order.countDocuments({
				user: userId,
				status: "rejected",
			}),

			// Total quantity ordered
			Order.aggregate([
				{
					$match: {
						user: new mongoose.Types.ObjectId(userId),
					},
				},
				{
					$group: {
						_id: null,
						total: {
							$sum: "$quantity",
						},
					},
				},
			]),

			// Latest 10 orders
			Order.find({
				user: userId,
			})
				.sort({
					createdAt: -1,
				})
				.limit(10)
				.select("grade quantity status createdAt")
				.lean(),
		]);

		return res.status(200).json(
			new ApiResponse(
				200,
				{
					orders: {
						total: totalOrders,
						pending: pendingOrders,
						accepted: acceptedOrders,
						dispatch: dispatchOrders,
						delivered: deliveredOrders,
						rejected: rejectedOrders,
					},

					totalQuantity: totalQuantity[0]?.total ?? 0,

					recentOrders,
				},
				"User analytics fetched successfully",
			),
		);
	},
);

export const getAdminAnalytics = asyncHandler(
	async (_: Request, res: Response) => {
		const [
			totalOrders,
			pendingOrders,
			acceptedOrders,
			dispatchOrders,
			deliveredOrders,
			rejectedOrders,

			recentOrders,
		] = await Promise.all([
			// Total orders
			Order.countDocuments({}),

			// Pending orders
			Order.countDocuments({
				status: "pending",
			}),

			// Accepted orders
			Order.countDocuments({
				status: "accepted",
			}),

			// Dispatch orders
			Order.countDocuments({
				status: "dispatched",
			}),

			// Delivered orders
			Order.countDocuments({
				status: "delivered",
			}),

			// rejected orders
			Order.countDocuments({
				status: "rejected",
			}),

			// Latest 10 orders
			Order.find({})
				.sort({
					createdAt: -1,
				})
				.limit(10)
				.select("grade quantity status createdAt")
				.lean()
				.populate({
					path: "user",
					select: "name email",
				}),
		]);

		return res.status(200).json(
			new ApiResponse(
				200,
				{
					orders: {
						total: totalOrders,
						pending: pendingOrders,
						accepted: acceptedOrders,
						dispatch: dispatchOrders,
						delivered: deliveredOrders,
						rejected: rejectedOrders,
					},

					recentOrders,
				},
				"User analytics fetched successfully",
			),
		);
	},
);
