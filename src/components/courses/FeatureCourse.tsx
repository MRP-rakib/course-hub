import CourseCard from "./CourseCard";
import Container from "../utils/Container";
import { allCourses, toCourseCardProps } from "@/data/courses";

const featuredCourses = allCourses.slice(0, 4);

export default function FeatureCourse() {
  return (
    <section className="border-b border-white/6 bg-[#0a0a0f] py-14 md:py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-300">
            Featured courses
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Learn from top rated classes
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/45 sm:text-base">
            Course cards are mapped from dynamic objects, so you can reuse this section by only
            changing the array.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredCourses.map((course) => (
            <CourseCard key={course.href} {...toCourseCardProps(course)} />
          ))}
        </div>
      </Container>
    </section>
  );
}
