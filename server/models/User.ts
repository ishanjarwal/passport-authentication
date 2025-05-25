import mongoose, { Document, Schema } from "mongoose";

export interface UserValues extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  is_verified: boolean;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    is_verified: { type: Boolean, default: false },
    bio: { type: String, required: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<UserValues>("user", userSchema);
export default UserModel;
