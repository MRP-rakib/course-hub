import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock3, Star, Users2 } from "lucide-react";
import type { CourseRecord } from "@/data/courses";
import Container from "../utils/Container";

type CourseViewProps = {
  course: CourseRecord;
};

export default function CourseView({ course }: CourseViewProps) {
  return (
    <section className="min-h-full bg-[#0a0a0f] pb-16 pt-8 md:pt-10">
      <Container>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-violet-300"
        >
          <ArrowLeft size={16} className="shrink-0" aria-hidden />
          Back to courses
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_minmax(280px,340px)] lg:items-start">
          <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/8 bg-white/4">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
              />
              {course.badge ? (
                <span className="absolute right-4 top-4 rounded-full border border-emerald-500/40 bg-[#0a0a0f]/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300 backdrop-blur-sm">
                  {course.badge}
                </span>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-300">
                {course.category}
              </span>
              <span className="rounded-lg border border-white/8 bg-white/3 px-2.5 py-1 text-xs text-white/60">
                {course.level}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/3 px-2.5 py-1 text-xs text-white/60">
                <Clock3 size={13} className="shrink-0" aria-hidden />
                {course.duration}
              </span>
            </div>

            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {course.title}
            </h1>

            <p className="mt-3 text-sm text-white/55">
              Instructor:{" "}
              <span className="font-medium text-white/80">{course.instructor}</span>
            </p>

            <div className="mt-8 border-t border-white/8 pt-8">
              <h2 className="text-lg font-bold text-white">About this course</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/65">{course.description}</p>
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-bold text-white">What you&apos;ll learn</h2>
              <ul className="mt-4 space-y-3">
                {course.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/70">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/1 bg-white/3 p-6 lg:sticky lg:top-24">
            <p className="font-display text-3xl font-extrabold text-white">{course.price}</p>
            <Link
              href="/join"
              className="mt-5 flex w-full items-center justify-center rounded-lg bg-linear-to-r from-violet-600 to-purple-600 px-4 py-3 text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90"
            >
              Enroll now
            </Link>
            <Link
              href="/courses"
              className="mt-3 block w-full text-center text-sm font-medium text-white/50 transition-colors hover:text-violet-300"
            >
              View all courses
            </Link>

            <dl className="mt-8 space-y-4 border-t border-white/8 pt-6 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-white/45">
                  <Star size={15} className="text-amber-300" aria-hidden />
                  Rating
                </dt>
                <dd className="font-semibold text-white">{course.rating.toFixed(1)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-white/45">
                  <Users2 size={15} aria-hidden />
                  Students
                </dt>
                <dd className="font-semibold text-white">{course.students.toLocaleString()}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-white/45">
                  <BookOpen size={15} aria-hidden />
                  Lessons
                </dt>
                <dd className="font-semibold text-white">{course.lessons}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </Container>
    </section>
  );
}
