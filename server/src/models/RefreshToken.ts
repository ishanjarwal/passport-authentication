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
  { timestamps: true }
);

refreshTokenSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 7 } // auto delete after 7 days
);

const RefreshTokenModel = mongoose.model<RefreshTokenValues>(
  "refresh_token",
  refreshTokenSchema
);
export default RefreshTokenModel;
