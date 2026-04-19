import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles, Star, Users2 } from "lucide-react";
import type { InstructorRecord } from "@/data/instructors";
import Container from "../utils/Container";

type InstructorProfileViewProps = {
  instructor: InstructorRecord;
};

export default function InstructorProfileView({ instructor }: InstructorProfileViewProps) {
  return (
    <section className="min-h-full bg-[#0a0a0f] pb-16 pt-8 md:pt-10">
      <Container>
        <Link
          href="/instructors"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-violet-300"
        >
          <ArrowLeft size={16} className="shrink-0" aria-hidden />
          Back to instructors
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_minmax(280px,340px)] lg:items-start">
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-linear-to-b from-violet-500/12 to-transparent px-6 pb-10 pt-12 md:px-10 md:pt-14">
              {instructor.badge ? (
                <span className="absolute right-5 top-5 rounded-full border border-emerald-500/40 bg-[#0a0a0f]/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300 backdrop-blur-sm">
                  {instructor.badge}
                </span>
              ) : null}
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-10">
                <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full ring-4 ring-violet-500/30 ring-offset-4 ring-offset-[#0a0a0f] md:h-44 md:w-44">
                  <Image
                    src={instructor.avatar}
                    alt={instructor.name}
                    fill
                    priority
                    sizes="176px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 text-center md:text-left">
                  <p className="text-sm font-medium uppercase tracking-wider text-violet-300/90">
                    {instructor.role}
                  </p>
                  <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    {instructor.name}
                  </h1>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/65">{instructor.bio}</p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-sm text-white/70">
                      <Star size={15} className="text-amber-300" aria-hidden />
                      {instructor.rating.toFixed(1)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-sm text-white/70">
                      <Users2 size={15} aria-hidden />
                      {instructor.students.toLocaleString()} students
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-sm text-white/70">
                      <BookOpen size={15} aria-hidden />
                      {instructor.courses} courses
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-white/8 pt-10">
              <h2 className="text-lg font-bold text-white">About</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/65">{instructor.about}</p>
            </div>

            <div className="mt-10">
              <h2 className="inline-flex items-center gap-2 text-lg font-bold text-white">
                <Sparkles size={18} className="text-violet-400" aria-hidden />
                Areas of expertise
              </h2>
              <ul className="mt-4 space-y-3">
                {instructor.expertise.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] leading-relaxed text-white/70"
                  >
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
            <p className="text-sm font-medium uppercase tracking-wide text-white/45">Instructor</p>
            <p className="mt-1 font-display text-xl font-bold text-white">{instructor.name}</p>
            <p className="mt-1 text-sm text-violet-300">{instructor.role}</p>

            <Link
              href="/courses"
              className="mt-6 flex w-full items-center justify-center rounded-lg bg-linear-to-r from-violet-600 to-purple-600 px-4 py-3 text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90"
            >
              View their courses
            </Link>
            <Link
              href="/join"
              className="mt-3 block w-full text-center text-sm font-medium text-white/50 transition-colors hover:text-violet-300"
            >
              Join Course Hub
            </Link>

            <dl className="mt-8 space-y-4 border-t border-white/8 pt-6 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-white/45">Rating</dt>
                <dd className="font-semibold text-white">{instructor.rating.toFixed(1)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-white/45">Students</dt>
                <dd className="font-semibold text-white">
                  {instructor.students.toLocaleString()}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-white/45">Courses</dt>
                <dd className="font-semibold text-white">{instructor.courses}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </Container>
    </section>
  );
}
