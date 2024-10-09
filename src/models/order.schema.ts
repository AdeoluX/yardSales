import { hash, compare } from "bcrypt";
import { Document, Schema, model } from "mongoose";

// User interface
export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  quantity: number;
  status: string;
}

// User schema
const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User"
    },
    product: {
      type: Schema.ObjectId,
      ref: "Product"
    },
    status: {
      type: String,
      enum: ["processing", "dilivered"],
      default: "processing"
    },
    quantity: Number
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
export const OrderModel = model<IOrder>("Order", OrderSchema);
