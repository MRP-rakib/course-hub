"use client";

import CourseCard from "@/components/courses/CourseCard";
import Container from "@/components/utils/Container";
import { allCourses, toCourseCardProps } from "@/data/courses";
import { BookOpen} from "lucide-react";

const enrollCourses = allCourses.slice(0, 4);
export default function MyCourses() {


  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">

      {/* GLOW BACKGROUND */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-112.5 w-225 -translate-x-1/2 bg-violet-600/20 blur-[150px]" />

      <Container className="relative px-4 py-14 md:py-18">

        {/* HEADER GLASS CARD */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_80px_-30px_rgba(139,92,246,0.4)] p-6 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-extrabold">My Courses</h1>
            <p className="text-white/45 text-sm mt-1">
              Track your learning journey
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <BookOpen className="text-violet-400" />
          </div>

        </div>

        {/* GRID */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {enrollCourses.map((course) => (
            <CourseCard key={course.href} {...toCourseCardProps(course)} />
            
          ))}

        </div>

      </Container>
    </div>
  );
}