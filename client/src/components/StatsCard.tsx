interface Props {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}

export default function StatsCard({ label, value, sub, color = 'bg-white dark:bg-slate-800' }: Props) {
  return (
    <div className={`${color} rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm`}>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
      {sub && <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}
