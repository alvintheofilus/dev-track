import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Job, JobStatus } from '../types';
import { useJobs } from '../hooks/useJobs';
import KanbanColumn from './KanbanColumn';
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
  const { updateJob } = useJobs();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const activeJob = activeId ? jobs.find((j) => j._id === activeId) ?? null : null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const jobId = active.id as string;
    const newStatus = over.id as JobStatus;
    const job = jobs.find((j) => j._id === jobId);

    if (job && job.status !== newStatus) {
      updateJob(jobId, { status: newStatus });
    }
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map(({ status, label, color }) => (
          <KanbanColumn
            key={status}
            status={status}
            label={label}
            color={color}
            jobs={jobs.filter((j) => j.status === status)}
            onEdit={onEdit}
            activeId={activeId}
          />
        ))}
      </div>

      <DragOverlay>
        {activeJob && (
          <div className="rotate-2 opacity-90">
            <JobCard job={activeJob} onEdit={onEdit} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
