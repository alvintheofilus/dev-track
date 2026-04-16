import { useState, useEffect } from 'react';
import { Job, JobFormData } from '../types';
import { useJobs } from '../hooks/useJobs';
import axios from 'axios';

interface Props {
  job?: Job | null;
  onClose: () => void;
}

const EMPTY_FORM: JobFormData = {
  company: '',
  role: '',
  salary: undefined,
  jobUrl: '',
  status: 'applied',
  appliedDate: new Date().toISOString().split('T')[0],
  followUpDate: '',
  notes: '',
};

export default function Modal({ job, onClose }: Props) {
  const { addJob, updateJob } = useJobs();
  const [form, setForm] = useState<JobFormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (job) {
      setForm({
        company: job.company,
        role: job.role,
        salary: job.salary,
        jobUrl: job.jobUrl ?? '',
        status: job.status,
        appliedDate: job.appliedDate.split('T')[0],
        followUpDate: job.followUpDate?.split('T')[0] ?? '',
        notes: job.notes ?? '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [job]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const payload: JobFormData = {
        ...form,
        salary: form.salary ? Number(form.salary) : undefined,
        followUpDate: form.followUpDate || undefined,
        jobUrl: form.jobUrl || undefined,
        notes: form.notes || undefined,
      };
      if (job) {
        await updateJob(job._id, payload);
      } else {
        await addJob(payload);
      }
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? 'Failed to save job');
      } else {
        setError('Failed to save job');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
          <h2 className="text-lg font-semibold">{job ? 'Edit Job' : 'Add Job'}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">{error}</p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company *</label>
              <input name="company" value={form.company} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Role *</label>
              <input name="role" value={form.role} onChange={handleChange} required className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Salary</label>
              <input name="salary" type="number" value={form.salary ?? ''} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Job URL</label>
            <input name="jobUrl" type="url" value={form.jobUrl} onChange={handleChange} className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Applied Date *</label>
              <input name="appliedDate" type="date" value={form.appliedDate} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Follow-up Date</label>
              <input name="followUpDate" type="date" value={form.followUpDate} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : job ? 'Save Changes' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
