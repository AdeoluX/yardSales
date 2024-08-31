import { Document, Schema, model, Types } from "mongoose";

// address interface
export interface IAddress extends Document {
  street: string;
  no: string;
  town: string;
  state: string;
  country: string;
  hq: boolean;
  coordinates: number[];
}

// address schema
const AddressSchema = new Schema<IAddress>(
  {
    street: {
      type: String,
      required: true,
    },
    no: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    hq: {
        type: Boolean,
        default: false,
        required: true,
    },
    coordinates: {
      type: [Number], // Longitude, Latitude
      index: '2dsphere' // Create a 2dsphere index
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

// create and export address model
export const AddressModel = model<IAddress>("Address", AddressSchema);
