"use client";

import { useMemo, useState } from "react";
import CourseCard from "./CourseCard";
import Container from "../utils/Container";
import PaginationBtn from "../utils/paginationBtn";
import { allCourses, toCourseCardProps } from "@/data/courses";
import {
  Search,
  SlidersHorizontal,
  Grid3x3,
  LayoutGrid,
  Rows3,
  Sparkles,
  TrendingUp,
  Clock,
  Star,
  ChevronDown,
  X,
} from "lucide-react";

const PAGE_SIZE = 8;

type ViewMode = "grid-4" | "grid-3" | "grid-2";
type SortOption = "popular" | "newest" | "rating" | "duration";
type FilterCategory = "all" | "development" | "design" | "data" | "business";

export default function CoursesListing() {
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("grid-4");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");

  const pagedCourses = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return allCourses.slice(start, start + PAGE_SIZE);
  }, [page]);

  const gridCols = {
    "grid-4": "xl:grid-cols-4",
    "grid-3": "xl:grid-cols-3",
    "grid-2": "xl:grid-cols-2",
  };

  return (
    <section className="relative border-b border-white/6 bg-[#0a0a0f] py-14 md:py-16 lg:py-20 overflow-hidden">
      {/* ANIMATED BACKGROUND GRADIENTS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-[140px] animate-pulse" />
        <div className="absolute top-1/2 right-1/4 h-80 w-80 rounded-full bg-purple-600/15 blur-[120px] animate-pulse delay-700" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 rounded-full bg-pink-600/10 blur-[100px] animate-pulse delay-1000" />
      </div>

      <Container className="relative">
        {/* HEADER SECTION */}
        <div className="mx-auto max-w-4xl text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-purple-500/10 px-4 py-2 mb-6 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span className="text-xs font-semibold tracking-wide text-violet-300 uppercase">
              All Courses
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              Browse Our Catalog
            </span>
          </h1>

          <p className="text-base md:text-lg leading-relaxed text-white/60 max-w-2xl mx-auto">
            Discover hand-picked courses across development, design, data, and more. 
            Find the perfect course to advance your skills.
          </p>

          {/* QUICK STATS */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-white/60">
                <span className="font-semibold text-white">{allCourses.length}</span> Courses
              </span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-white/60">
                <span className="font-semibold text-white">4.8</span> Avg Rating
              </span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="text-white/60">
                <span className="font-semibold text-white">10K+</span> Students
              </span>
            </div>
          </div>
        </div>

        {/* SEARCH, FILTERS & VIEW CONTROLS */}
        <div className="mb-8 space-y-4">
          {/* TOP ROW: Search + Filter Toggle + View Mode */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* SEARCH BAR */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                placeholder="Search courses by title, topic, or instructor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all backdrop-blur-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* FILTER TOGGLE */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-black/40 border border-white/10 hover:bg-white/5 transition-all backdrop-blur-xl lg:w-auto"
            >
              <SlidersHorizontal className="h-5 w-5 text-violet-400" />
              <span className="font-medium">Filters</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>

            {/* VIEW MODE SELECTOR */}
            <div className="flex gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10 backdrop-blur-xl">
              <button
                onClick={() => setViewMode("grid-4")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "grid-4"
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/50"
                    : "text-white/50 hover:text-white/80"
                }`}
                title="4 columns"
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid-3")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "grid-3"
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/50"
                    : "text-white/50 hover:text-white/80"
                }`}
                title="3 columns"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid-2")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "grid-2"
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/50"
                    : "text-white/50 hover:text-white/80"
                }`}
                title="2 columns"
              >
                <Rows3 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* EXPANDABLE FILTERS */}
          {showFilters && (
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
              {/* CATEGORY FILTERS */}
              <div>
                <label className="text-sm font-semibold text-white/80 mb-3 block flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-violet-400" />
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {(["all", "development", "design", "data", "business"] as FilterCategory[]).map(
                    (category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                          selectedCategory === category
                            ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30"
                            : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                        }`}
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* SORT & PRICE FILTERS */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* SORT BY */}
                <div>
                  <label className="text-sm font-semibold text-white/80 mb-3 block">
                    Sort By
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(["popular", "newest", "rating", "duration"] as SortOption[]).map((sort) => (
                      <button
                        key={sort}
                        onClick={() => setSortBy(sort)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                          sortBy === sort
                            ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                            : "bg-white/5 text-white/50 hover:text-white/80 border border-white/10"
                        }`}
                      >
                        {sort}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PRICE FILTER */}
                <div>
                  <label className="text-sm font-semibold text-white/80 mb-3 block">
                    Price
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(["all", "free", "paid"] as const).map((price) => (
                      <button
                        key={price}
                        onClick={() => setPriceFilter(price)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                          priceFilter === price
                            ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                            : "bg-white/5 text-white/50 hover:text-white/80 border border-white/10"
                        }`}
                      >
                        {price}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CLEAR FILTERS */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSortBy("popular");
                    setPriceFilter("all");
                    setSearchQuery("");
                  }}
                  className="text-sm text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear all filters
                </button>
              </div>
            </div>
          )}

          {/* ACTIVE FILTERS DISPLAY */}
          {(selectedCategory !== "all" || priceFilter !== "all" || searchQuery) && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-white/50">Active filters:</span>
              {selectedCategory !== "all" && (
                <FilterBadge
                  label={selectedCategory}
                  onRemove={() => setSelectedCategory("all")}
                />
              )}
              {priceFilter !== "all" && (
                <FilterBadge label={priceFilter} onRemove={() => setPriceFilter("all")} />
              )}
              {searchQuery && (
                <FilterBadge
                  label={`Search: "${searchQuery}"`}
                  onRemove={() => setSearchQuery("")}
                />
              )}
            </div>
          )}
        </div>

        {/* RESULTS HEADER */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-white/60">
            Showing <span className="font-semibold text-white">{pagedCourses.length}</span> of{" "}
            <span className="font-semibold text-white">{allCourses.length}</span> courses
          </p>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Clock className="h-4 w-4" />
            Updated daily
          </div>
        </div>

        {/* COURSES GRID */}
        <div
          className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${gridCols[viewMode]} transition-all duration-300`}
        >
          {pagedCourses.map((course, index) => (
            <div
              key={course.href}
              className="group transition-all duration-300 hover:scale-[1.02]"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <CourseCard {...toCourseCardProps(course)} />
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="mt-12">
          <PaginationBtn
            currentPage={page}
            totalItems={allCourses.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
            siblingCount={1}
          />
        </div>
      </Container>
    </section>
  );
}

/* ===== COMPONENTS ===== */

function FilterBadge({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-medium border border-violet-500/30">
      {label}
      <button
        onClick={onRemove}
        className="hover:text-white transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}