import { Document, Schema, Types, model } from "mongoose";

// (first_name, last_name, email, phone)

// user interface
export interface ICompanyAddress extends Document {
  address: Types.ObjectId;
  company: Types.ObjectId;
}

// user schema
const CompanyAddressSchema = new Schema<ICompanyAddress>(
  {
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
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

// create and export user model
export const CompanyAddressModel = model<ICompanyAddress>("CompanyAddress", CompanyAddressSchema);
