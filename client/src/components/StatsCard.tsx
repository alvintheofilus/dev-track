interface Props {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}

export default function StatsCard({ label, value, sub, color = 'bg-white' }: Props) {
  return (
    <div className={`${color} rounded-xl border border-slate-200 p-5 shadow-sm`}>
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      {sub && <p className="text-sm text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}
