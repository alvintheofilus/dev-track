import { useDroppable } from '@dnd-kit/core';
import { Job, JobStatus } from '../types';
import JobCard from './JobCard';

interface Props {
  status: JobStatus;
  label: string;
  color: string;
  jobs: Job[];
  onEdit: (job: Job) => void;
  activeId: string | null;
}

export default function KanbanColumn({ status, label, color, jobs, onEdit, activeId }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-lg border-t-4 ${color} p-4 min-h-48 transition-colors ${
        isOver
          ? 'bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-700'
          : 'bg-slate-50 dark:bg-slate-900'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-700 dark:text-slate-300">{label}</h3>
        <span className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">
          {jobs.length}
        </span>
      </div>
      <div className="space-y-3">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onEdit={onEdit}
            isDragging={activeId === job._id}
          />
        ))}
      </div>
    </div>
  );
}
