// models/LeaveRequest.js
import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user.schema';
import { ILeaveType } from './leaveType.schema';

export interface ILeaveRequest extends Document {
  user: IUser['_id'];
  leaveType: ILeaveType['_id'];
  startDate: Date;
  endDate: Date;
  reason: string;
  status: string; // e.g., 'pending', 'approved', 'rejected'
}

const LeaveRequestSchema = new Schema<ILeaveRequest>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  leaveType: { type: Schema.Types.ObjectId, ref: 'LeaveType', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
});

export const LeaveRequestModel = mongoose.model<ILeaveRequest>('LeaveRequest', LeaveRequestSchema);
