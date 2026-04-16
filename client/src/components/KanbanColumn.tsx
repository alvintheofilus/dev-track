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
        isOver ? 'bg-blue-50 ring-2 ring-blue-200' : 'bg-slate-50'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-700">{label}</h3>
        <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
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
