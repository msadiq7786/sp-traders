import mongoose from "mongoose";
import { z } from "zod";

export const mongooseIdSchema = z
	.string()
	.refine((id) => mongoose.Types.ObjectId.isValid(id), {
		message: "Invalid ObjectId",
	});
