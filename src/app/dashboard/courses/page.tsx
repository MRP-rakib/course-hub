"use client";

import {useMemo, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Clock3,
  Star,
  Users2,
  BookOpen,
  Trash2,
  Edit3,
  Eye,
} from "lucide-react";

import AddCourse from "@/components/dashboard/courses/AddCourse";
import Badge from "@/components/dashboard/courses/Badge";
import LevelPill from "@/components/dashboard/courses/LavelPill";
import CourseFilters from "@/components/ui/Search&Filter";
import { Course } from "@/types/course";
import { useAppSelector } from "@/redux/hooks/hooks";
import Link from "next/link";
import { useInstructorCourse } from "@/redux/hooks/courses/InstructorCourse";
import { CreateCourse } from "@/types/createCourse";
import { supabase } from "@/lib/supabaseClient";

type FilterState = {
  category: string;
  level: string;
  sort: string;
};




const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];

const SORT_OPTIONS = [
  "Newest",
  "Oldest",
  "Rating: High",
  "Students: High",
  "Price: Low",
  "Price: High",
];

export default function ListCourses() {
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Course | null>(null);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const {courses} = useInstructorCourse()
  const {categories} = useAppSelector(state=>state.category)
  const {profile} = useAppSelector(state=>state.auth)
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    level: "All",
    sort: "Newest",
  });


  // ─── Filtered Data ─────────────────────────────────────────;

 const filtered = useMemo(() => {
  return (courses ?? [])
    .filter((course) => {
      const query = search.toLowerCase();

      const title = course.title ?? "";
      const instructor = course.instructor?.fullname ?? "";
      const category = course.category?.name ?? "";
      const level = course.level ?? "";

      const matchesSearch =
        !query ||
        [title, instructor, category].some((field) =>
          field.toLowerCase().includes(query)
        );

      const matchesCategory =
        filters.category === "All" || category === filters.category;

      const matchesLevel =
        filters.level === "All" || level === filters.level;

      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      const priceA = Number(String(a.price ?? 0).replace(/[^0-9.]/g, ""));
      const priceB = Number(String(b.price ?? 0).replace(/[^0-9.]/g, ""));

      const sorters: Record<string, () => number> = {
        "Rating: High": () => (b.rating ?? 0) - (a.rating ?? 0),

        "Students: High": () => (b.students ?? 0) - (a.students ?? 0),

        "Price: Low": () => priceA - priceB,

        "Price: High": () => priceB - priceA,

        Oldest: () =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime(),

        Newest: () =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime(),
      };

      return sorters[filters.sort]?.() ?? 0;
    });
}, [courses, search, filters]);

const closeModal = () => {
    setShowModal(false);
    setEditTarget(null);
  };

  const openModal = (course: Course | null = null) => {
    setEditTarget(course);
    setShowModal(true);
  };
 

  const onSave=async(form:CreateCourse)=>{
       if (editTarget) {
    await supabase
      .from("courses")
      .update({
        title: form.title,
        description: form.description,
        instructor_id:profile?.id,
        category_id: form.category,
        level: form.level,
        price: form.price,
        thumbnail: form.thumbnail,
      })
      .eq("id", editTarget.id);
  } else {
    await supabase.from("courses").insert([
      {
        title: form.title,
        description: form.description,
        category_id: form.category,
        instructor_id:profile?.id,
        level: form.level,
        price: form.price,
        thumbnail: form.thumbnail,
      },
    ]);
  }

  closeModal()
  }
// const handleAddCourse=async()=>{
//   console.log();
  
// }

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
            onClick={() => openModal()}
            className="group relative flex items-center gap-2 self-start rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] sm:self-auto"
          >
            <div className="absolute inset-0 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30 transition-opacity duration-300 group-hover:opacity-90" />

            <Plus className="relative h-4 w-4" />

            <span className="relative">Add Course</span>
          </button>
        </div>

        {/* Search + Filter */}

        <CourseFilters
          search={search}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilters}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
          activeFilterCount={activeFilterCount}
          categories={categories}
          levels={LEVELS}
          sortOptions={SORT_OPTIONS}
        />

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
                                src={course.thumbnail||''}
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

                                {course.badge && <Badge text={course.badge} />}
                              </div>

                              <p className="text-xs text-white/40">
                                By {course.instructor?.fullname||''}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-300">
                            {course.category?.name}
                          </span>
                        </td>

                        {/* Level */}
                        <td className="px-5 py-4">
                          <LevelPill level={course.level||''} />
                        </td>

                        {/* Stats */}
                        <td className="px-5 py-4">
                          <div className="space-y-1">
                            <p className="flex items-center gap-1 text-xs text-white/50">
                              <Star className="h-3 w-3 text-amber-300" />

                              {course.rating}

                              <span className="mx-0.5 text-white/25">·</span>

                              <Users2 className="h-3 w-3" />

                              {course.students.toLocaleString()}
                            </p>

                            <p className="flex items-center gap-1 text-xs text-white/40">
                              <Clock3 className="h-3 w-3" />
                              {course.duration}
                              <span className="mx-0.5 text-white/25">·</span>
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
                            <Link
                              href={`/courses/${course.id}`}
                              rel="noopener noreferrer"
                              className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/50 transition-all hover:bg-white/10 hover:text-white"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </Link>

                            <button
                              onClick={() => openModal(course)}
                              className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/50 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>

                            <button
                              onClick={()=>console.log('i am delete')}
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
                          src={course.thumbnail||''}
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

                          {course.badge && <Badge text={course.badge} />}
                        </div>

                        <p className="mt-1 text-xs text-white/40">
                          By {course.instructor?.fullname}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="inline-flex rounded-full border border-violet-500/25 bg-violet-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-300">
                            {course.category?.name}
                          </span>

                          <LevelPill level={course.level||''} />
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                        <p className="mb-1 text-white/30">Rating</p>

                        <div className="flex items-center gap-1 text-white">
                          <Star className="h-3.5 w-3.5 text-amber-300" />

                          {course.rating}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                        <p className="mb-1 text-white/30">Students</p>

                        <div className="flex items-center gap-1 text-white">
                          <Users2 className="h-3.5 w-3.5" />

                          {course.students.toLocaleString()}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                        <p className="mb-1 text-white/30">Duration</p>

                        <div className="flex items-center gap-1 text-white">
                          <Clock3 className="h-3.5 w-3.5" />

                          {course.duration}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                        <p className="mb-1 text-white/30">Price</p>

                        <p className="font-bold text-white">{course.price}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex items-center justify-end gap-2">
                      <a
                        href={course.thumbnail||''}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/60 transition-all hover:bg-white/10 hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </a>

                      <button
                        onClick={() => openModal(course)}
                        className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/60 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => console.log('i am delete')}
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
            Showing {filtered.length} of {courses.length} courses
          </p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <AddCourse
          onClose={closeModal}
          onSave={onSave}
          initial={editTarget}
        />
      )}
    </>
  );
}
