import Image from "next/image";
import Link from "next/link";
import { BookOpen, Star, Users2 } from "lucide-react";

export type InstructorCardProps = {
  name: string;
  role: string;
  bio: string;
  students: number;
  courses: number;
  rating: number;
  avatar: string;
  href: string;
  badge?: string;
  ctaLabel?: string;
};

export default function InstructorCard({
  name,
  role,
  bio,
  students,
  courses,
  rating,
  avatar,
  href,
  badge,
  ctaLabel = "View profile",
}: InstructorCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-violet-500/[0.07]">
      <div className="relative flex flex-col items-center border-b border-white/[0.06] bg-gradient-to-b from-violet-500/[0.06] to-transparent px-5 pb-5 pt-8">
        <Link
          href={href}
          className="relative block h-28 w-28 shrink-0 overflow-hidden rounded-full ring-2 ring-violet-500/25 ring-offset-2 ring-offset-[#0a0a0f] transition duration-300 group-hover:ring-violet-400/50"
        >
          <Image
            src={avatar}
            alt={name}
            fill
            sizes="112px"
            className="object-cover"
          />
        </Link>
        {badge ? (
          <span className="absolute right-5 top-5 rounded-full border border-emerald-500/40 bg-[#0a0a0f]/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-300 backdrop-blur-sm">
            {badge}
          </span>
        ) : null}
        <h3 className="mt-4 text-center text-lg font-bold leading-tight text-white">{name}</h3>
        <span className="mt-1.5 inline-flex rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-300">
          {role}
        </span>
      </div>

      <div className="p-5">
        <p className="line-clamp-2 text-sm leading-relaxed text-white/55">{bio}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/65">
          <p className="inline-flex items-center gap-1.5">
            <Star size={14} className="text-amber-300" />
            {rating.toFixed(1)}
          </p>
          <p className="inline-flex items-center gap-1.5">
            <Users2 size={14} />
            {students.toLocaleString()}
          </p>
          <p className="inline-flex items-center gap-1.5">
            <BookOpen size={14} />
            {courses} courses
          </p>
        </div>

        <div className="mt-5 flex justify-end border-t border-white/[0.08] pt-4">
          <Link
            href={href}
            className="rounded-lg border border-white/[0.12] bg-white/[0.03] px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-violet-500/35 hover:bg-violet-500/10 hover:text-violet-200"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
