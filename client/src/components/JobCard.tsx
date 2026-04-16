import { Job, JobStatus } from '../types';
import { useJobs } from '../hooks/useJobs';

const STATUS_COLORS: Record<JobStatus, string> = {
  applied: 'bg-blue-100 text-blue-700',
  interview: 'bg-yellow-100 text-yellow-700',
  offer: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

interface Props {
  job: Job;
  onEdit: (job: Job) => void;
}

export default function JobCard({ job, onEdit }: Props) {
  const { deleteJob } = useJobs();

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-slate-900">{job.company}</p>
          <p className="text-sm text-slate-600">{job.role}</p>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${STATUS_COLORS[job.status]}`}>
          {job.status}
        </span>
      </div>

      {job.salary && (
        <p className="text-sm text-slate-500">${job.salary.toLocaleString()}</p>
      )}

      <p className="text-xs text-slate-400">
        Applied {new Date(job.appliedDate).toLocaleDateString()}
      </p>

      {job.notes && (
        <p className="text-xs text-slate-500 line-clamp-2">{job.notes}</p>
      )}

      <div className="flex gap-2 pt-1">
        <button
          onClick={() => onEdit(job)}
          className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => deleteJob(job._id)}
          className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
