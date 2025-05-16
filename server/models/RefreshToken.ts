import mongoose, { Document } from "mongoose";

export type RefreshTokenValues = Document & {
  userId: string;
  token: string;
};

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    token: { type: String, required: true },
  },
  { timestamps: true, expires: "7d" }
);

const RefreshTokenModel = mongoose.model<RefreshTokenValues>(
  "refresh_token",
  refreshTokenSchema
);
export default RefreshTokenModel;
