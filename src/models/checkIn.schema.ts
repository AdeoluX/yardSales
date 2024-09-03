import { Document, Schema, model, Types } from "mongoose";

// Interface for CheckIn
export interface ICheckIn extends Document {
  user: Types.ObjectId;
  address: Types.ObjectId;
  company: Types.ObjectId;
  qrString: string;
  coordinates: number[];
  proximity: boolean; 
  createdAt?: Date;
  updatedAt?: Date; 
}

// Schema for CheckIn
const CheckInSchema = new Schema<ICheckIn>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    qrString: {
      type: String,
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: "2dsphere", // Geospatial index for location-based queries
      required: true,
    },
    proximity: {
      type: Boolean,
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

// Create and export the CheckIn model
export const CheckInModel = model<ICheckIn>("CheckIn", CheckInSchema);
