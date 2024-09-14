import { hash, compare } from "bcrypt";
import { Document, Schema, model } from "mongoose";

// User interface
export interface IOtp extends Document {
  isValidPassword(password: string): unknown;
  user_id: Schema.Types.ObjectId;
  otp: string;
  used: boolean;
}

// User schema
const OtpSchema = new Schema<IOtp>(
  {
    user_id: {
      type: Schema.ObjectId,
      ref: "User"
    },
    otp: {
      type: String,
    },
    used: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: { virtuals: true }, // Enable virtuals to be included in JSON output
    toObject: { virtuals: true }, // Enable virtuals to be included when converting to objects
  }
);


// Create and export user model
export const OtpModel = model<IOtp>("Otp", OtpSchema);
