import { hash, compare } from "bcrypt";
import { Document, Schema, Types, model } from "mongoose";
import { ILeaveBalance, LeaveBalanceSchema } from "./leaveBalance.schema";

// (first_name, last_name, email, phone)

// user interface
export interface IUser extends Document {
  isValidPassword(password: string): unknown;
  firstName: string;
  lastName: string;
  middleName: string;
  email?: string;
  phoneNumber: string;
  password: string;
  status: string;
  role: string;
  rank: Types.ObjectId;
  department: Types.ObjectId; // Reference to the department this employee belongs to
  manager?: Types.ObjectId;
  no: string;
  leaveBalances: ILeaveBalance[];
}

// user schema
const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: String,
    email: String,
    password: {
      type: String,
      select: false
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    no: String,
    role: {
      type: String,
      enum: ["super-admin", "admin", "employee"]
    },
    rank: { type: Schema.Types.ObjectId, ref: 'Rank' },
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    manager: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    leaveBalances: { type: [LeaveBalanceSchema], default: [] }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

UserSchema.method(
  "isValidPassword",
  async function (password: string): Promise<boolean> {
    const isValid = await compare(password, this.password);
    return isValid;
  }
);

UserSchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// create and export user model
export const UserModel = model<IUser>("User", UserSchema);
