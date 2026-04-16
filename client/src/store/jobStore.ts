import { create } from 'zustand';
import { Job, JobFormData } from '../types';
import api from '../utils/api';

interface JobState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  addJob: (data: JobFormData) => Promise<void>;
  updateJob: (id: string, data: Partial<JobFormData>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  loading: false,
  error: null,

  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get<Job[]>('/jobs');
      set({ jobs: data, loading: false });
    } catch {
      set({ error: 'Failed to load jobs', loading: false });
    }
  },

  addJob: async (jobData) => {
    const { data } = await api.post<Job>('/jobs', jobData);
    set((state) => ({ jobs: [data, ...state.jobs] }));
  },

  updateJob: async (id, jobData) => {
    const { data } = await api.put<Job>(`/jobs/${id}`, jobData);
    set((state) => ({
      jobs: state.jobs.map((j) => (j._id === id ? data : j)),
    }));
  },

  deleteJob: async (id) => {
    await api.delete(`/jobs/${id}`);
    set((state) => ({ jobs: state.jobs.filter((j) => j._id !== id) }));
  },
}));
