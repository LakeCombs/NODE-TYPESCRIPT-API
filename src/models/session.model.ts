import { UserDocument } from "./user.model";
import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { boolean } from "zod";

export interface SessionDocument extends Document {
	user: UserDocument["_id"];
	valid: boolean;
	userAgent: string;
	createdAt: Date;
	updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		valid: { type: Boolean, default: true },
		userAgent: { type: String },
	},
	{ timestamps: true }
);

const Session = mongoose.model<SessionDocument>("Session", sessionSchema);

export default Session;
