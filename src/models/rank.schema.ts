import mongoose, { Schema, Document } from 'mongoose';

export interface IRank extends Document {
  name: string;
  company: mongoose.Types.ObjectId;
}

const RankSchema = new Schema<IRank>({
  name: { type: String, required: true, unique: true },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true }
});

export const RankModel = mongoose.model<IRank>('Rank', RankSchema);
