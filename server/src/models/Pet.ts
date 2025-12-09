import mongoose, { Document, Schema } from 'mongoose';

export interface IPet extends Document {
  name: string;
  species: string;
  breed: string;
  age: number;
  description: string;
  status: 'available' | 'adopted' | 'pending';
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const petSchema = new Schema<IPet>({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['available', 'adopted', 'pending'], default: 'available' },
  imageUrl: { type: String },
}, {
  timestamps: true,
});

export default mongoose.model<IPet>('Pet', petSchema);
