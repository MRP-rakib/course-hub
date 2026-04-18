import Link from "next/link";
import { Clock3, Star, Users2 } from "lucide-react";

export type CourseCardProps = {
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
  badge?: string;
  ctaLabel?: string;
};

export default function CourseCard({
  title,
  instructor,
  category,
  level,
  lessons,
  duration,
  rating,
  students,
  price,
  href,
  badge,
  ctaLabel = "View Course",
}: CourseCardProps) {
  return (
    <article className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-violet-500/[0.07]">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <span className="inline-flex rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-300">
            {category}
          </span>
          <h3 className="text-lg font-bold leading-tight text-white">{title}</h3>
        </div>
        {badge ? (
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
            {badge}
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-sm text-white/60">By {instructor}</p>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-white/55">
        <p className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5">{level}</p>
        <p className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5">
          {lessons} lessons
        </p>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-white/65">
        <p className="inline-flex items-center gap-1.5">
          <Clock3 size={14} />
          {duration}
        </p>
        <p className="inline-flex items-center gap-1.5">
          <Star size={14} className="text-amber-300" />
          {rating.toFixed(1)}
        </p>
        <p className="inline-flex items-center gap-1.5">
          <Users2 size={14} />
          {students.toLocaleString()}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
        <p className="text-xl font-bold text-white">{price}</p>
        <Link
          href={href}
          className="rounded-lg border border-white/[0.12] bg-white/[0.03] px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-violet-500/35 hover:bg-violet-500/10 hover:text-violet-200"
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
