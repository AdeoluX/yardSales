import { Document, Schema, model } from "mongoose";

// tier interface
export interface ITier extends Document {
  name: string;
  minEmployees: number;
  maxEmployees: number;
  price: number;
}

// tier schema
const TierSchema = new Schema<ITier>(
  {
    name: {
      type: String,
      required: true,
      enum: ["free", "silver", "premium"],
    },
    minEmployees: {
      type: Number,
      required: true,
    },
    maxEmployees: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

// create and export tier model
export const TierModel = model<ITier>("Tier", TierSchema);
