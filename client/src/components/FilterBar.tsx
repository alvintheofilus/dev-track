export type SortOption = 'newest' | 'oldest' | 'company-az' | 'company-za';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  onExportCSV: () => void;
}

const inputClass =
  'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500';

export default function FilterBar({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  onExportCSV,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <input
        type="text"
        placeholder="Search company or role..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`${inputClass} w-64`}
        aria-label="Search jobs"
      />

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className={inputClass}
        aria-label="Sort jobs"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="company-az">Company A–Z</option>
        <option value="company-za">Company Z–A</option>
      </select>

      <button
        onClick={onExportCSV}
        className="ml-auto border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm px-3 py-2 rounded-lg"
      >
        Export CSV
      </button>
    </div>
  );
}
