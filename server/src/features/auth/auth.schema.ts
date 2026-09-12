import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
	{
		id: String,
		name: String,
		email: String,
		username: String,
	},
	{
		collection: "user",
	},
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
