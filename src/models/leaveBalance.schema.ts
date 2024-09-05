import { Document, Schema, Types, model } from "mongoose";

// (first_name, last_name, email, phone)

// user interface
export interface ILeaveBalance extends Document {
  leaveType: Types.ObjectId; // Reference to LeaveType
  balance: number; // Number of days available
}

// user schema
export const LeaveBalanceSchema = new Schema<ILeaveBalance>({
  leaveType: { type: Schema.Types.ObjectId, ref: 'LeaveType', required: true },
  balance: { type: Number, required: true, default: 0 },
});

// create and export user model

export const LeaveBalanceModel = model<ILeaveBalance>("LeaveBalance", LeaveBalanceSchema);
