import mongoose, { Schema, Document } from 'mongoose';
import { IJob, JobStatus } from '../types';

export interface JobDocument extends Omit<IJob, '_id'>, Document {}

const JOB_STATUSES: JobStatus[] = ['applied', 'interview', 'offer', 'rejected'];

const JobSchema = new Schema<JobDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    salary: { type: Number },
    jobUrl: { type: String, trim: true },
    status: { type: String, enum: JOB_STATUSES, default: 'applied' },
    appliedDate: { type: Date, default: Date.now },
    followUpDate: { type: Date },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

// Ensure users can only query their own jobs
JobSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<JobDocument>('Job', JobSchema);
