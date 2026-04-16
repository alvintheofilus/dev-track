import { Request } from 'express';
import { Types } from 'mongoose';

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export type JobStatus = 'applied' | 'interview' | 'offer' | 'rejected';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface IJob {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  company: string;
  role: string;
  salary?: number;
  jobUrl?: string;
  status: JobStatus;
  appliedDate: Date;
  followUpDate?: Date;
  notes?: string;
  createdAt: Date;
}

export interface JwtPayload {
  id: string;
}
