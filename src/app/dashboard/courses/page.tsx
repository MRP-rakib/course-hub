"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  SlidersHorizontal,
  X,
  Clock3,
  Star,
  Users2,
  ChevronDown,
  BookOpen,
  Trash2,
  Edit3,
  Eye,
} from "lucide-react";

import AddCourse from "@/components/dashboard/courses/AddCourse";
import Badge from "@/components/dashboard/courses/Badge";
import LevelPill from "@/components/dashboard/courses/LavelPill";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Course = {
  id: string;
  title: string;
  instructor: string;
  category: string;
  level: string;
  lessons: number;
  duration: string;
  rating: number;
  students: number;
  price: string;
  href: string;
  thumbnail: string;
  badge?: string;
};

type FilterState = {
  category: string;
  level: string;
  sort: string;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_COURSES: Course[] = [
  {
    id: "1",
    title: "Advanced React & Next.js Patterns",
    instructor: "Sarah Chen",
    category: "Development",
    level: "Advanced",
    lessons: 48,
    duration: "12h 30m",
    rating: 4.9,
    students: 3240,
    price: "$89.00",
    href: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    badge: "Bestseller",
  },
  {
    id: "2",
    title: "UI/UX Design Fundamentals",
    instructor: "Marco Rivera",
    category: "Design",
    level: "Beginner",
    lessons: 32,
    duration: "8h 15m",
    rating: 4.7,
    students: 5810,
    price: "$59.00",
    href: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
  },
  {
    id: "3",
    title: "Machine Learning Essentials",
    instructor: "Priya Kapoor",
    category: "Data Science",
    level: "Intermediate",
    lessons: 60,
    duration: "20h 00m",
    rating: 4.8,
    students: 2190,
    price: "$119.00",
    href: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=250&fit=crop",
    badge: "New",
  },
  {
    id: "4",
    title: "Node.js Backend Mastery",
    instructor: "James Wilson",
    category: "Development",
    level: "Intermediate",
    lessons: 42,
    duration: "14h 45m",
    rating: 4.6,
    students: 1870,
    price: "$79.00",
    href: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
  },
];

const CATEGORIES = [
  "All",
  "Development",
  "Design",
  "Data Science",
  "Marketing",
  "Business",
];

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];

const SORT_OPTIONS = [
  "Newest",
  "Oldest",
  "Rating: High",
  "Students: High",
  "Price: Low",
  "Price: High",
];

export default function AddCourses() {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Course | null>(null);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    level: "All",
    sort: "Newest",
  });

  const [filterOpen, setFilterOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  // ─── Filtered Data ─────────────────────────────────────────

  const filtered = courses
    .filter((c) => {
      const q = search.toLowerCase();

      const matchQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q);

      const matchCat =
        filters.category === "All" ||
        c.category === filters.category;

      const matchLvl =
        filters.level === "All" ||
        c.level === filters.level;

      return matchQ && matchCat && matchLvl;
    })
    .sort((a, b) => {
      if (filters.sort === "Rating: High")
        return b.rating - a.rating;

      if (filters.sort === "Students: High")
        return b.students - a.students;

      if (filters.sort === "Price: Low")
        return (
          parseFloat(a.price.replace(/[^0-9.]/g, "")) -
          parseFloat(b.price.replace(/[^0-9.]/g, ""))
        );

      if (filters.sort === "Price: High")
        return (
          parseFloat(b.price.replace(/[^0-9.]/g, "")) -
          parseFloat(a.price.replace(/[^0-9.]/g, ""))
        );

      if (filters.sort === "Oldest")
        return parseInt(a.id) - parseInt(b.id);

      return parseInt(b.id) - parseInt(a.id);
    });

  // ─── Handlers ──────────────────────────────────────────────

  const handleSave = (data: Omit<Course, "id">) => {
    if (editTarget) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editTarget.id
            ? { ...data, id: editTarget.id }
            : c,
        ),
      );
    } else {
      setCourses((prev) => [
        ...prev,
        {
          ...data,
          id: String(Date.now()),
        },
      ]);
    }

    setShowModal(false);
    setEditTarget(null);
  };

  const handleDelete = (id: string) =>
    setCourses((prev) =>
      prev.filter((c) => c.id !== id),
    );

  const openAdd = () => {
    setEditTarget(null);
    setShowModal(true);
  };

  const openEdit = (c: Course) => {
    setEditTarget(c);
    setShowModal(true);
  };

  const activeFilterCount = [
    filters.category !== "All",
    filters.level !== "All",
    filters.sort !== "Newest",
  ].filter(Boolean).length;

  return (
    <>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0a0a0f] p-4 sm:p-6 lg:p-8">
        {/* Ambient */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-purple-600/10 blur-[120px]" />
        </div>

        {/* Header */}
        <div className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white lg:text-3xl">
              Courses
            </h1>

            <p className="mt-1 text-sm text-white/40">
              {courses.length} total · {filtered.length} shown
            </p>
          </div>

          <button
            onClick={openAdd}
            className="group relative flex items-center gap-2 self-start rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] sm:self-auto"
          >
            <div className="absolute inset-0 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30 transition-opacity duration-300 group-hover:opacity-90" />

            <Plus className="relative h-4 w-4" />

            <span className="relative">
              Add Course
            </span>
          </button>
        </div>

        {/* Search + Filter */}
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
          <div
            className="relative"
            ref={filterRef}
          >
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
                      {CATEGORIES.map((c) => (
                        <button
                          key={c}
                          onClick={() =>
                            setFilters((p) => ({
                              ...p,
                              category: c,
                            }))
                          }
                          className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
                            filters.category === c
                              ? "border-violet-500/60 bg-violet-500/15 text-violet-300"
                              : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/80"
                          }`}
                        >
                          {c}
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
                      {LEVELS.map((l) => (
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
                        {SORT_OPTIONS.map((s) => (
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

        {/* Table / Cards */}
        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-white/5">
                <BookOpen className="h-7 w-7 text-white/20" />
              </div>

              <p className="text-sm font-medium text-white/40">
                No courses found
              </p>

              <p className="mt-1 text-xs text-white/20">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden xl:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="border-b border-white/8">
                    <tr>
                      {[
                        "Course",
                        "Category",
                        "Level",
                        "Stats",
                        "Price",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-white/30"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/5">
                    {filtered.map((course) => (
                      <tr
                        key={course.id}
                        className="group transition-colors duration-150 hover:bg-white/3"
                      >
                        {/* Course */}
                        <td className="px-5 py-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg border border-white/8 bg-white/5">
                              <Image
                                src={course.thumbnail}
                                fill
                                alt={course.title}
                                className="object-cover"
                              />
                            </div>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="truncate text-sm font-semibold text-white">
                                  {course.title}
                                </p>

                                {course.badge && (
                                  <Badge
                                    text={course.badge}
                                  />
                                )}
                              </div>

                              <p className="text-xs text-white/40">
                                By {course.instructor}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-300">
                            {course.category}
                          </span>
                        </td>

                        {/* Level */}
                        <td className="px-5 py-4">
                          <LevelPill
                            level={course.level}
                          />
                        </td>

                        {/* Stats */}
                        <td className="px-5 py-4">
                          <div className="space-y-1">
                            <p className="flex items-center gap-1 text-xs text-white/50">
                              <Star className="h-3 w-3 text-amber-300" />

                              {course.rating.toFixed(1)}

                              <span className="mx-0.5 text-white/25">
                                ·
                              </span>

                              <Users2 className="h-3 w-3" />

                              {course.students.toLocaleString()}
                            </p>

                            <p className="flex items-center gap-1 text-xs text-white/40">
                              <Clock3 className="h-3 w-3" />

                              {course.duration}

                              <span className="mx-0.5 text-white/25">
                                ·
                              </span>

                              {course.lessons} lessons
                            </p>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-5 py-4">
                          <p className="text-sm font-bold text-white">
                            {course.price}
                          </p>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                            <a
                              href={course.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/50 transition-all hover:bg-white/10 hover:text-white"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </a>

                            <button
                              onClick={() =>
                                openEdit(course)
                              }
                              className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/50 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(course.id)
                              }
                              className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/50 transition-all hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-400"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile + Tablet Cards */}
              <div className="grid gap-4 p-4 xl:hidden">
                {filtered.map((course) => (
                  <div
                    key={course.id}
                    className="rounded-2xl border border-white/10 bg-white/3 p-4"
                  >
                    {/* Top */}
                    <div className="flex gap-3">
                      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-white/10">
                        <Image
                          src={course.thumbnail}
                          fill
                          alt={course.title}
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="line-clamp-2 text-sm font-semibold text-white">
                            {course.title}
                          </h3>

                          {course.badge && (
                            <Badge
                              text={course.badge}
                            />
                          )}
                        </div>

                        <p className="mt-1 text-xs text-white/40">
                          By {course.instructor}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="inline-flex rounded-full border border-violet-500/25 bg-violet-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-300">
                            {course.category}
                          </span>

                          <LevelPill
                            level={course.level}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                        <p className="mb-1 text-white/30">
                          Rating
                        </p>

                        <div className="flex items-center gap-1 text-white">
                          <Star className="h-3.5 w-3.5 text-amber-300" />

                          {course.rating}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                        <p className="mb-1 text-white/30">
                          Students
                        </p>

                        <div className="flex items-center gap-1 text-white">
                          <Users2 className="h-3.5 w-3.5" />

                          {course.students.toLocaleString()}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                        <p className="mb-1 text-white/30">
                          Duration
                        </p>

                        <div className="flex items-center gap-1 text-white">
                          <Clock3 className="h-3.5 w-3.5" />

                          {course.duration}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                        <p className="mb-1 text-white/30">
                          Price
                        </p>

                        <p className="font-bold text-white">
                          {course.price}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex items-center justify-end gap-2">
                      <a
                        href={course.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/60 transition-all hover:bg-white/10 hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </a>

                      <button
                        onClick={() =>
                          openEdit(course)
                        }
                        className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/60 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(course.id)
                        }
                        className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/60 transition-all hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <p className="mt-3 text-right text-xs text-white/25">
            Showing {filtered.length} of{" "}
            {courses.length} courses
          </p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <AddCourse
          onClose={() => {
            setShowModal(false);
            setEditTarget(null);
          }}
          onSave={handleSave}
          initial={editTarget}
        />
      )}
    </>
  );
}