import { Document, Schema, Types, model } from "mongoose";

// (first_name, last_name, email, phone)

// user interface
export interface IUserBranch extends Document {
  user: Types.ObjectId;
  address: Types.ObjectId;
}

// user schema
const UserBranchSchema = new Schema<IUserBranch>(
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
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

// create and export user model
export const UserBranchModel = model<IUserBranch>("UserBranch", UserBranchSchema);
