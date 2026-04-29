import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Job, JobStatus } from '../types';
import { useJobs } from '../hooks/useJobs';

const STATUS_COLORS: Record<JobStatus, string> = {
  applied: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  interview: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  offer: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

interface Props {
  job: Job;
  onEdit: (job: Job) => void;
  isDragging?: boolean;
}

export default function JobCard({ job, onEdit, isDragging = false }: Props) {
  const { deleteJob } = useJobs();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: job._id });

  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 shadow-sm space-y-2 ${
        isDragging ? 'opacity-40' : ''
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 cursor-grab active:cursor-grabbing mt-0.5 shrink-0 select-none"
          aria-label="Drag to move"
        >
          ⠿
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 dark:text-white truncate">{job.company}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{job.role}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${STATUS_COLORS[job.status]}`}>
              {job.status}
            </span>
          </div>

          {job.salary && (
            <p className="text-sm text-slate-500 dark:text-slate-400">${job.salary.toLocaleString()}</p>
          )}

          <p className="text-xs text-slate-400 dark:text-slate-500">
            Applied {new Date(job.appliedDate).toLocaleDateString()}
          </p>

          {job.notes && (
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{job.notes}</p>
          )}

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => onEdit(job)}
              className="text-xs bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteJob(job._id)}
              className="text-xs bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
