export type SortOption = 'newest' | 'oldest' | 'company-az' | 'company-za';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  onExportCSV: () => void;
}

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
        className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
      />

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="company-az">Company A–Z</option>
        <option value="company-za">Company Z–A</option>
      </select>

      <button
        onClick={onExportCSV}
        className="ml-auto border border-slate-300 hover:bg-slate-50 text-slate-600 text-sm px-3 py-2 rounded-lg"
      >
        Export CSV
      </button>
    </div>
  );
}
