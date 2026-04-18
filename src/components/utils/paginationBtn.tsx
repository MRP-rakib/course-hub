"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo } from "react";

export type PaginationBtnProps = {
  /** 1-based current page */
  currentPage: number;
  /** Total number of pages (omit if deriving from totalItems + pageSize) */
  totalPages?: number;
  /** When set with pageSize, totalPages = ceil(totalItems / pageSize) */
  totalItems?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  /** Extra pages shown on each side of the current page (desktop) */
  siblingCount?: number;
  className?: string;
  disabled?: boolean;
  /** Accessible label for the nav landmark */
  ariaLabel?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/** Build windowed page list with ellipses for large totals */
function getPageItems(
  current: number,
  total: number,
  siblingCount: number,
): (number | "ellipsis-start" | "ellipsis-end")[] {
  if (total <= 0) return [];
  if (total <= 7 + siblingCount * 2) {
    return range(1, total);
  }

  const items: (number | "ellipsis-start" | "ellipsis-end")[] = [];
  const left = Math.max(2, current - siblingCount);
  const right = Math.min(total - 1, current + siblingCount);

  items.push(1);
  if (left > 2) items.push("ellipsis-start");
  items.push(...range(left, right));
  if (right < total - 1) items.push("ellipsis-end");
  items.push(total);
  return items;
}

const btnBase =
  "inline-flex min-h-9 min-w-9 select-none items-center justify-center rounded-lg border text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] disabled:pointer-events-none disabled:opacity-40";
const btnIdle =
  "border-white/[0.1] bg-white/[0.03] text-white/80 hover:border-violet-500/35 hover:bg-violet-500/10 hover:text-violet-200";
const btnActive = "border-violet-500/40 bg-violet-500/15 text-violet-200";

export default function PaginationBtn({
  currentPage,
  totalPages: totalPagesProp,
  totalItems,
  pageSize,
  onPageChange,
  siblingCount = 1,
  className = "",
  disabled = false,
  ariaLabel = "Pagination",
}: PaginationBtnProps) {
  const totalPages = useMemo(() => {
    if (typeof totalPagesProp === "number" && totalPagesProp > 0) {
      return Math.floor(totalPagesProp);
    }
    if (typeof totalItems === "number" && typeof pageSize === "number" && pageSize > 0) {
      return Math.max(1, Math.ceil(totalItems / pageSize));
    }
    return 1;
  }, [totalPagesProp, totalItems, pageSize]);

  const current = clamp(Math.floor(currentPage), 1, totalPages);

  const go = useCallback(
    (page: number) => {
      if (disabled) return;
      const next = clamp(page, 1, totalPages);
      if (next !== current) onPageChange(next);
    },
    [disabled, totalPages, current, onPageChange],
  );

  const pageItems = useMemo(
    () => getPageItems(current, totalPages, siblingCount),
    [current, totalPages, siblingCount],
  );

  const canPrev = current > 1;
  const canNext = current < totalPages;

  return (
    <nav
      className={`flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <p className="text-center text-sm text-white/45 sm:text-left">
        Page <span className="font-semibold text-white/80">{current}</span> of{" "}
        <span className="font-semibold text-white/80">{totalPages}</span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end">
        <button
          type="button"
          aria-label="Previous page"
          disabled={disabled || !canPrev}
          onClick={() => go(current - 1)}
          className={`${btnBase} gap-1 px-2.5 sm:px-3 ${btnIdle}`}
        >
          <ChevronLeft size={18} className="shrink-0 text-white/70" aria-hidden />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div
          className="hidden items-center gap-1.5 sm:flex"
          role="list"
          aria-label="Page numbers"
        >
          {pageItems.map((item, idx) => {
            if (item === "ellipsis-start" || item === "ellipsis-end") {
              return (
                <span
                  key={`e-${idx}`}
                  className="inline-flex min-w-9 select-none items-center justify-center px-1 text-sm text-white/35"
                  aria-hidden
                >
                  …
                </span>
              );
            }
            const page = item;
            const isActive = page === current;
            return (
              <button
                key={page}
                type="button"
                role="listitem"
                aria-label={`Page ${page}`}
                aria-current={isActive ? "page" : undefined}
                disabled={disabled}
                onClick={() => go(page)}
                className={`${btnBase} min-w-9 px-2 ${isActive ? btnActive : btnIdle}`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Next page"
          disabled={disabled || !canNext}
          onClick={() => go(current + 1)}
          className={`${btnBase} gap-1 px-2.5 sm:px-3 ${btnIdle}`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={18} className="shrink-0 text-white/70" aria-hidden />
        </button>
      </div>
    </nav>
  );
}
