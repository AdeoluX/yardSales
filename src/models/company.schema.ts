import { Document, Schema, Types, model } from "mongoose";
import { hash, compare } from "bcrypt";

// user interface
export interface ICompany extends Document {
  isValidPassword(password: string): unknown;
  name: string;
  addresses: Types.ObjectId[];
  email?: string;
  password: string;
  phoneNumber: string;
  status: string;
  tier: Types.ObjectId; // reference to Tier
}

// user schema
const CompanySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
    },
    addresses: [{
      type: Schema.Types.ObjectId,
      ref: "Address",
    },],
    email: String,
    password: String,
    phoneNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    tier: {
      type: Schema.Types.ObjectId,
      ref: "Tier",
      required: true,
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

CompanySchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

CompanySchema.method(
  "isValidPassword",
  async function (password: string): Promise<boolean> {
    const isValid = await compare(password, this.password);
    return isValid;
  }
);


// create and export user model
export const CompanyModel = model<ICompany>("Company", CompanySchema);
