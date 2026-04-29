export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 space-y-3 animate-pulse">
      <div className="flex items-start gap-2">
        <div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded mt-0.5 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonBoard() {
  const cols = ['Applied', 'Interview', 'Offer', 'Rejected'];
  const colColors = ['border-t-blue-500', 'border-t-yellow-500', 'border-t-green-500', 'border-t-red-500'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cols.map((label, i) => (
        <div key={label} className={`bg-slate-50 dark:bg-slate-900 rounded-lg border-t-4 ${colColors[i]} p-4 min-h-48`}>
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20 animate-pulse" />
            <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: i === 0 ? 3 : i === 1 ? 2 : 1 }).map((_, j) => (
              <SkeletonCard key={j} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
