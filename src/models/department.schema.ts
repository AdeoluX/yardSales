import mongoose, { Schema, Document } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  company: mongoose.Types.ObjectId;
  parentDepartment?: mongoose.Types.ObjectId; // Reference to the parent department
  headOfDepartment?: mongoose.Types.ObjectId; // Reference to the employee who heads this department
}

const DepartmentSchema = new Schema<IDepartment>({
  name: { type: String, required: true },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  parentDepartment: { type: Schema.Types.ObjectId, ref: 'Department' },
  headOfDepartment: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const DepartmentModel = mongoose.model<IDepartment>('Department', DepartmentSchema);
