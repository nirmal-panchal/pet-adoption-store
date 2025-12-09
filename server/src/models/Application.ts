import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  user: mongoose.Types.ObjectId;
  pet: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pet: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  message: { type: String },
}, {
  timestamps: true,
});

// Ensure one application per user per pet
applicationSchema.index({ user: 1, pet: 1 }, { unique: true });

export default mongoose.model<IApplication>('Application', applicationSchema);
