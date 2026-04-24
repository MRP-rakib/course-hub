"use client";

import { useState } from "react";
import CourseCard from "@/components/courses/CourseCard";
import Container from "@/components/utils/Container";
import { allCourses, toCourseCardProps } from "@/data/courses";
import { BookOpen, Grid3x3, List, Search, Filter, TrendingUp, Clock, Award, ChevronDown } from "lucide-react";

const enrollCourses = allCourses.slice(0, 4);

type ViewMode = "grid" | "list";
type FilterType = "all" | "in-progress" | "completed" | "not-started";

export default function MyCourses() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Mock stats - replace with actual data
  const stats = {
    total: enrollCourses.length,
    inProgress: 2,
    completed: 1,
    totalHours: 48,
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* ANIMATED BACKGROUND GRADIENTS */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-[140px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-purple-600/15 blur-[120px] animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-1/2 h-72 w-72 rounded-full bg-pink-600/10 blur-[100px] animate-pulse delay-1000" />
      </div>

      <Container className="relative px-4 py-8 md:py-12">
        {/* HEADER SECTION */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent mb-2">
                My Courses
              </h1>
              <p className="text-white/60 text-base">
                Track your learning journey and continue where you left off
              </p>
            </div>

            {/* VIEW MODE TOGGLE */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1 bg-black/30 p-1.5 rounded-xl border border-white/10">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-lg transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/50"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <Grid3x3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-lg transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/50"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              icon={<BookOpen className="h-5 w-5" />}
              label="Total Courses"
              value={stats.total}
              color="violet"
            />
            <StatCard
              icon={<TrendingUp className="h-5 w-5" />}
              label="In Progress"
              value={stats.inProgress}
              color="purple"
            />
            <StatCard
              icon={<Award className="h-5 w-5" />}
              label="Completed"
              value={stats.completed}
              color="pink"
            />
            <StatCard
              icon={<Clock className="h-5 w-5" />}
              label="Total Hours"
              value={`${stats.totalHours}h`}
              color="emerald"
            />
          </div>

          {/* SEARCH AND FILTERS */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl p-6 shadow-xl shadow-violet-900/10">
            <div className="flex flex-col md:flex-row gap-4">
              {/* SEARCH BAR */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search your courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              </div>

              {/* FILTER BUTTON */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-black/40 border border-white/10 hover:bg-white/5 transition-all"
              >
                <Filter className="h-5 w-5 text-violet-400" />
                <span className="font-medium">Filters</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* FILTER OPTIONS */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {(["all", "in-progress", "completed", "not-started"] as FilterType[]).map(
                    (filterOption) => (
                      <button
                        key={filterOption}
                        onClick={() => setFilter(filterOption)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                          filter === filterOption
                            ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30"
                            : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                        }`}
                      >
                        {filterOption.replace("-", " ")}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COURSES SECTION */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white/90">
              {filter === "all" ? "All Courses" : `${filter.replace("-", " ")} Courses`}
            </h2>
            <span className="text-sm text-white/50">
              {enrollCourses.length} {enrollCourses.length === 1 ? "course" : "courses"}
            </span>
          </div>

          {/* GRID VIEW */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollCourses.map((course) => (
                <div
                  key={course.href}
                  className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Optional: Add progress indicator overlay */}
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-xs font-semibold text-white">
                    {Math.floor(Math.random() * 100)}% Complete
                  </div>
                  <CourseCard {...toCourseCardProps(course)} />
                </div>
              ))}
            </div>
          )}

          {/* LIST VIEW */}
          {viewMode === "list" && (
            <div className="space-y-4">
              {enrollCourses.map((course, index) => (
                <div
                  key={course.href}
                  className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl p-6 hover:border-violet-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/20"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Course thumbnail placeholder */}
                    <div className="w-full md:w-48 h-32 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                      <BookOpen className="h-12 w-12 text-violet-400" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold mb-1 group-hover:text-violet-400 transition-colors">
                            Course {index + 1}
                          </h3>
                          <p className="text-sm text-white/60">
                            Continue your learning journey
                          </p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-semibold border border-violet-500/30">
                          In Progress
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                          <span>Progress</span>
                          <span>{Math.floor(Math.random() * 100)}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-white/50">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          12 hours
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          24 lessons
                        </span>
                      </div>
                    </div>

                    <button className="self-end md:self-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 font-medium text-sm">
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* EMPTY STATE (if no courses) */}
        {enrollCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
              <BookOpen className="h-10 w-10 text-white/40" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-white/60 mb-6">
              Start your learning journey by enrolling in a course
            </p>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 font-medium">
              Browse Courses
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}

/* ===== COMPONENTS ===== */

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: "violet" | "purple" | "pink" | "emerald";
}) {
  const colorClasses = {
    violet: "from-violet-500/20 to-violet-600/5 border-violet-500/20 text-violet-400",
    purple: "from-purple-500/20 to-purple-600/5 border-purple-500/20 text-purple-400",
    pink: "from-pink-500/20 to-pink-600/5 border-pink-500/20 text-pink-400",
    emerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400",
  };

  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br backdrop-blur-xl p-5 hover:scale-105 transition-all duration-300 ${colorClasses[color]}`}
    >
      <div className="mb-3">{icon}</div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs text-white/60 font-medium">{label}</div>
    </div>
  );
}