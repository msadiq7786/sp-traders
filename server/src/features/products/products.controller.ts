import { asyncHandler } from "@/utils/async-handler.js";
import { Request, Response } from "express";
import { Product } from "./products.schema.js";
import { ApiError } from "@/utils/api-error.js";

export const getProducts = asyncHandler(async (_: Request, res: Response) => {
	const [products, totalProducts] = await Promise.all([
		Product.find().sort({ createdAt: -1 }),
		Product.countDocuments(),
	]);

	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "Product fetched successfully",
		data: {
			products,
			totalProducts,
		},
	});
});

export const createProduct = asyncHandler(
	async (req: Request, res: Response) => {
		const data = req.body;

		const existingProduct = await Product.findOne({
			$or: [{ name: data.name }, { code: data.code.toUpperCase() }],
		});

		if (existingProduct) {
			throw new ApiError(409, "Product already exists");
		}

		const product = await Product.create({
			...data,
			code: data.code.toUpperCase(),
		});

		res.status(201).json({
			success: true,
			statusCode: 201,
			message: "Product created successfully",
			data: {
				product,
			},
		});
	},
);

export const updateProduct = asyncHandler(
	async (req: Request, res: Response) => {
		const { productId } = req.params;

		const data = req.body;

		const product = await Product.findById(productId);

		if (!product) {
			throw new ApiError(404, "Product not found");
		}

		// Check duplicate name/code
		if (data.name || data.code) {
			const duplicateProduct = await Product.findOne({
				_id: { $ne: productId },
				$or: [
					...(data.name ? [{ name: data.name }] : []),
					...(data.code ? [{ code: data.code.toUpperCase() }] : []),
				],
			});

			if (duplicateProduct) {
				throw new ApiError(
					409,
					"Another product with the same name or code already exists",
				);
			}
		}

		Object.assign(product, {
			...data,
			...(data.code && {
				code: data.code.toUpperCase(),
			}),
		});

		await product.save();

		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Product updated successfully",
			data: {
				product,
			},
		});
	},
);

export const deleteProduct = asyncHandler(
	async (req: Request, res: Response) => {
		const { productId } = req.params;

		const product = await Product.findByIdAndDelete(productId);

		if (!product) {
			throw new ApiError(404, "Product not found");
		}

		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Product deleted successfully",
		});
	},
);
