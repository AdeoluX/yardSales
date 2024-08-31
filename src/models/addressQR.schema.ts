import { Document, Schema, Types, model } from "mongoose";

// Interface for individual QR code entries in the addressQr array
interface IAddressQRItem {
  address: Types.ObjectId;
  qrString: string;
}

// User interface extending Document
export interface IAddressQR extends Document {
  addressQr: IAddressQRItem[];
  company: Types.ObjectId;
}

// Sub-schema for addressQr array
const AddressQRItemSchema = new Schema<IAddressQRItem>({
  address: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  qrString: {
    type: String,
    required: true,
  },
});

// Main schema for AddressQR
const AddressQRSchema = new Schema<IAddressQR>(
  {
    addressQr: {
      type: [AddressQRItemSchema],
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
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

// Create and export AddressQR model
export const AddressQRModel = model<IAddressQR>("AddressQR", AddressQRSchema);
