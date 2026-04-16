export type JobStatus = 'applied' | 'interview' | 'offer' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Job {
  _id: string;
  userId: string;
  company: string;
  role: string;
  salary?: number;
  jobUrl?: string;
  status: JobStatus;
  appliedDate: string;
  followUpDate?: string;
  notes?: string;
  createdAt: string;
}

export interface JobFormData {
  company: string;
  role: string;
  salary?: number;
  jobUrl?: string;
  status: JobStatus;
  appliedDate: string;
  followUpDate?: string;
  notes?: string;
}

export interface Stats {
  total: number;
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
  interviewRate: number;
  offerRate: number;
}
