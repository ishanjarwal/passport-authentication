import mongoose, { InferSchemaType, Schema } from "mongoose";

const verificationSchema: Schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: { type: String, required: true },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 10 * 60 * 1000),
  },
  createdAt: { type: Date, default: Date.now, expires: "10m" },
});

const VerificationModel = mongoose.model("verification", verificationSchema);
export default VerificationModel;
