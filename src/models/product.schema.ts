import { hash, compare } from "bcrypt";
import { Document, Schema, model } from "mongoose";

// User interface
export interface IProduct extends Document {
  user_id: Schema.Types.ObjectId;
  name: string;
  price: number;
  currency: string;
  image: string | string[];
  category: string;
}

// User schema
const ProductSchema = new Schema<IProduct>(
  {
    user_id: {
      type: Schema.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
    },
    currency: {
      type: String,
    },
    image: {
      type: Schema.Types.Mixed, // Allow image to be a string or an array of strings
      validate: {
        validator: function (value: any) {
          return typeof value === "string" || (Array.isArray(value) && value.every(item => typeof item === "string"));
        },
        message: "Image must be a string or an array of strings",
      },
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
      enum: ["gift", "gadget", "fashion", "food", "others"], // Enum for product categories
      required: true,
    }
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
export const ProductModel = model<IProduct>("Product", ProductSchema);
