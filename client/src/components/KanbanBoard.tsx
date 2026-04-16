import { Job, JobStatus } from '../types';
import JobCard from './JobCard';

const COLUMNS: { status: JobStatus; label: string; color: string }[] = [
  { status: 'applied', label: 'Applied', color: 'border-t-blue-500' },
  { status: 'interview', label: 'Interview', color: 'border-t-yellow-500' },
  { status: 'offer', label: 'Offer', color: 'border-t-green-500' },
  { status: 'rejected', label: 'Rejected', color: 'border-t-red-500' },
];

interface Props {
  jobs: Job[];
  onEdit: (job: Job) => void;
}

export default function KanbanBoard({ jobs, onEdit }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {COLUMNS.map(({ status, label, color }) => {
        const columnJobs = jobs.filter((j) => j.status === status);
        return (
          <div
            key={status}
            className={`bg-slate-50 rounded-lg border-t-4 ${color} p-4 min-h-48`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-700">{label}</h3>
              <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                {columnJobs.length}
              </span>
            </div>
            <div className="space-y-3">
              {columnJobs.map((job) => (
                <JobCard key={job._id} job={job} onEdit={onEdit} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
