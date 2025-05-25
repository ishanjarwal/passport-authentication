import { Schema, model, Document, Types } from "mongoose";

export interface PasswordResetTokenValues extends Document {
  userId: Types.ObjectId;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

const PasswordResetTokenSchema = new Schema<PasswordResetTokenValues>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

PasswordResetTokenSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 10 } // auto delete after 10 minutes
);
export const PasswordResetToken = model<PasswordResetTokenValues>(
  "password_reset_tokens",
  PasswordResetTokenSchema
);
