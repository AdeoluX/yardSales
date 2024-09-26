import { hash, compare } from "bcrypt";
import { Document, Schema, model } from "mongoose";

// User interface
export interface IReview extends Document {
  product: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  comment: string;
  rating: number;
}

// User schema
const ReviewSchema = new Schema<IReview>(
  {
    product: {
      type: Schema.ObjectId,
      ref: "Product"
    },
    user: {
      type: Schema.ObjectId,
      ref: "User"
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
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
export const ReviewModel = model<IReview>("Review", ReviewSchema);
