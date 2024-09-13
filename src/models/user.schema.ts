import { hash, compare } from "bcrypt";
import { Document, Schema, model } from "mongoose";

// User interface
export interface IUser extends Document {
  isValidPassword(password: string): unknown;
  firstName: string;
  lastName: string;
  middleName?: string;
  email?: string;
  phoneNumber: string;
  password: string;
  token: string;
  isComplete: boolean; // Add virtual field type
}

// User schema
const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    middleName: String,
    token: String,
    email: String,
    password: {
      type: String,
      // select: false,
    },
    phoneNumber: {
      type: String,
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

// Virtual field: isComplete
UserSchema.virtual("isComplete").get(function () {
  return !!(this.phoneNumber && this.firstName && this.lastName);
});

// Method to check if password is valid
UserSchema.method(
  "isValidPassword",
  async function (password: string): Promise<boolean> {
    const isValid = await compare(password, this.password);
    return isValid;
  }
);

// Pre-save hook to hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

// Create and export user model
export const UserModel = model<IUser>("User", UserSchema);
