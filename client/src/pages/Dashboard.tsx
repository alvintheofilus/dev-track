import { useEffect, useState, useMemo } from 'react';
import { useJobs } from '../hooks/useJobs';
import KanbanBoard from '../components/KanbanBoard';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import FilterBar, { SortOption } from '../components/FilterBar';
import { Job } from '../types';

const exportToCSV = (jobs: Job[]) => {
  const headers = ['Company', 'Role', 'Status', 'Salary', 'Applied Date', 'Follow-up Date', 'URL', 'Notes'];
  const rows = jobs.map((j) => [
    j.company,
    j.role,
    j.status,
    j.salary ?? '',
    new Date(j.appliedDate).toLocaleDateString(),
    j.followUpDate ? new Date(j.followUpDate).toLocaleDateString() : '',
    j.jobUrl ?? '',
    j.notes ?? '',
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `devtrack-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export default function Dashboard() {
  const { jobs, loading, error, fetchJobs } = useJobs();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  useEffect(() => {
    fetchJobs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const displayJobs = useMemo(() => {
    let result = [...jobs];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) => j.company.toLowerCase().includes(q) || j.role.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime());
        break;
      case 'company-az':
        result.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case 'company-za':
        result.sort((a, b) => b.company.localeCompare(a.company));
        break;
    }

    return result;
  }, [jobs, search, sortBy]);

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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Applications</h1>
            <p className="text-sm text-slate-500">
              {displayJobs.length !== jobs.length
                ? `${displayJobs.length} of ${jobs.length}`
                : `${jobs.length} total`}
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            + Add Job
          </button>
        </div>

        <FilterBar
          search={search}
          onSearchChange={setSearch}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onExportCSV={() => exportToCSV(displayJobs)}
        />

        {loading && <p className="text-slate-500 text-sm">Loading...</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {!loading && <KanbanBoard jobs={displayJobs} onEdit={openEditModal} />}
      </main>

      {modalOpen && <Modal job={editingJob} onClose={closeModal} />}
    </div>
  );
}
