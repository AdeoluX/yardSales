import { hash, compare } from "bcrypt";
import { Document, Schema, model } from "mongoose";

// User interface
export interface ITransaction extends Document {
  order: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  amount: number;
  status: string;
  currency: string;
  reference: string;
}

// User schema
const TransactionSchema = new Schema<ITransaction>(
  {
    order: {
      type: Schema.ObjectId,
      ref: "Order"
    },
    user: {
      type: Schema.ObjectId,
      ref: "Order"
    },
    status: {
      type: String,
      enum: ["processing", "failed", "success", "abadoned"],
      default: "processing"
    },
    currency: {
      type: String,
      enum: ["NGN", "USD"],
      default: "NGN"
    },
    reference: String,
    amount: Number
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
export const TransactionModel = model<ITransaction>("Transaction", TransactionSchema);
