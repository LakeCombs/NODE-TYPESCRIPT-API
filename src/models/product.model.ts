import { UserDocument } from "./user.model";
import mongoose, { Document } from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abdcefghijklmnopqrstuvwxyz1234567890");

export interface ProductDocument extends Document {
	user: UserDocument["_id"];
	title: string;
	description: string;
	price: number;
	image: string;
	createdAt: Date;
	updatedAt: Date;
}

const productSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		title: { type: String, required: true },
		productId: {
			type: String,
			required: true,
			unique: true,
			default: () => `product_${nanoid}`,
		},
		description: {
			type: String,
			required: true,
		},
		image: { type: String },
		price: { type: Number, required: true },
	},
	{ timestamps: true }
);

const Product = mongoose.model<ProductDocument>("Product", productSchema);

export default Product;
