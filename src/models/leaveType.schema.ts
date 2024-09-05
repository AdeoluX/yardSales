// models/LeaveType.js
import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaveType extends Document {
  name: string;
  description: string;
  company: mongoose.Types.ObjectId;
}

const LeaveTypeSchema = new Schema<ILeaveType>({
  name: { type: String, required: true },
  description: { type: String },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true }
});

export const LeaveTypeModel = mongoose.model<ILeaveType>('LeaveType', LeaveTypeSchema);
