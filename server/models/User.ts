import mongoose, { Document, Schema } from "mongoose";

export interface UserValues extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  is_verified: boolean;
  login_provider: "google" | null;
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
    login_provider: { type: String, default: null },
    bio: { type: String, required: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<UserValues>("user", userSchema);
export default UserModel;
