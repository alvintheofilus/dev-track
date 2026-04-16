import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import api from '../utils/api';
import { Stats } from '../types';

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Stats>('/jobs/stats')
      .then(({ data }) => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Stats</h1>

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse space-y-2">
                <div className="h-3 bg-slate-200 rounded w-1/2" />
                <div className="h-8 bg-slate-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatsCard label="Total Applied" value={stats.total} />
            <StatsCard label="Applied" value={stats.applied} />
            <StatsCard label="Interviews" value={stats.interview} />
            <StatsCard label="Offers" value={stats.offer} color="bg-green-50" />
            <StatsCard label="Rejected" value={stats.rejected} />
            <StatsCard
              label="Interview Rate"
              value={`${stats.interviewRate}%`}
              sub="interviews / total"
            />
            <StatsCard
              label="Offer Rate"
              value={`${stats.offerRate}%`}
              sub="offers / total"
              color="bg-green-50"
            />
          </div>
        )}
      </main>
    </div>
  );
}
