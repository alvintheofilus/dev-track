import { useEffect, useState } from 'react';
import { useJobs } from '../hooks/useJobs';
import KanbanBoard from '../components/KanbanBoard';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import { Job } from '../types';

export default function Dashboard() {
  const { jobs, loading, error, fetchJobs } = useJobs();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openAddModal = () => {
    setEditingJob(null);
    setModalOpen(true);
  };

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingJob(null);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Applications</h1>
            <p className="text-sm text-slate-500">{jobs.length} total</p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            + Add Job
          </button>
        </div>

        {loading && <p className="text-slate-500 text-sm">Loading...</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {!loading && <KanbanBoard jobs={jobs} onEdit={openEditModal} />}
      </main>

      {modalOpen && <Modal job={editingJob} onClose={closeModal} />}
    </div>
  );
}
