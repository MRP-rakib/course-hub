"use client";

import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
} from "lucide-react";

type FilterState = {
  category: string;
  level: string;
  sort: string;
};
type categories={
  id:string
  name:string
}
interface CourseFiltersProps {
  search: string;
  setSearch: (value: string) => void;

  filters: FilterState;
  setFilters: React.Dispatch<
    React.SetStateAction<FilterState>
  >;

  filterOpen: boolean;
  setFilterOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  activeFilterCount: number;

  categories: categories[];
  levels: string[];
  sortOptions: string[];
}

export default function CourseFilters({
  search,
  setSearch,
  filters,
  setFilters,
  filterOpen,
  setFilterOpen,
  activeFilterCount,
  categories,
  levels,
  sortOptions,
}: CourseFiltersProps) {
  return (
    <div className="relative mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />

        <input
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-violet-500/50 focus:bg-violet-500/5 focus:ring-1 focus:ring-violet-500/20"
          placeholder="Search by title, instructor, or category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="relative">
        <button
          onClick={() =>
            setFilterOpen((o) => !o)
          }
          className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
            filterOpen || activeFilterCount > 0
              ? "border-violet-500/50 bg-violet-500/10 text-violet-300"
              : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />

          Filters

          {activeFilterCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-violet-500 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        {filterOpen && (
          <div className="absolute right-0 top-full z-20 mt-2 w-72 max-w-[90vw] overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e16] shadow-2xl shadow-black/50">
            <div className="space-y-4 p-4">
              {/* Category */}
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  Category
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {categories&& categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() =>
                        setFilters((p) => ({
                          ...p,
                          category: c.name,
                        }))
                      }
                      className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
                        filters.category === c.name
                          ? "border-violet-500/60 bg-violet-500/15 text-violet-300"
                          : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/80"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  Level
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {levels.map((l) => (
                    <button
                      key={l}
                      onClick={() =>
                        setFilters((p) => ({
                          ...p,
                          level: l,
                        }))
                      }
                      className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
                        filters.level === l
                          ? "border-violet-500/60 bg-violet-500/15 text-violet-300"
                          : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/80"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  Sort By
                </p>

                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 pr-8 text-xs text-white outline-none focus:border-violet-500/50"
                    value={filters.sort}
                    onChange={(e) =>
                      setFilters((p) => ({
                        ...p,
                        sort: e.target.value,
                      }))
                    }
                  >
                    {sortOptions.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className="bg-[#0e0e16]"
                      >
                        {s}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-white/40" />
                </div>
              </div>

              {/* Reset */}
              {activeFilterCount > 0 && (
                <button
                  onClick={() =>
                    setFilters({
                      category: "All",
                      level: "All",
                      sort: "Newest",
                    })
                  }
                  className="w-full rounded-xl border border-rose-500/20 bg-rose-500/10 py-1.5 text-xs font-medium text-rose-400 transition-all hover:bg-rose-500/15"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}