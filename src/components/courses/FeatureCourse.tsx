import CourseCard, { type CourseCardProps } from "./CourseCard";
import Container from "../utils/Container";

const featuredCourses: CourseCardProps[] = [
  {
    title: "React & Next.js Bootcamp",
    instructor: "Sarah Ahmed",
    category: "Web Development",
    level: "Intermediate",
    lessons: 38,
    duration: "22h 30m",
    rating: 4.8,
    students: 12840,
    price: "$49",
    href: "/courses/react-nextjs-bootcamp",
    badge: "Best Seller",
  },
  {
    title: "UI Design System Mastery",
    instructor: "Rakib Hasan",
    category: "UI/UX Design",
    level: "Beginner",
    lessons: 26,
    duration: "14h 10m",
    rating: 4.7,
    students: 7460,
    price: "$39",
    href: "/courses/ui-design-system-mastery",
  },
  {
    title: "Data Analytics with Python",
    instructor: "Nadia Rahman",
    category: "Data & AI",
    level: "Advanced",
    lessons: 44,
    duration: "28h 40m",
    rating: 4.9,
    students: 9350,
    price: "$59",
    href: "/courses/data-analytics-python",
    badge: "New",
  },
  {
    title: "Digital Marketing Growth Lab",
    instructor: "Imran Kabir",
    category: "Marketing",
    level: "Intermediate",
    lessons: 31,
    duration: "18h 20m",
    rating: 4.6,
    students: 6820,
    price: "$45",
    href: "/courses/digital-marketing-growth-lab",
  },
];

export default function FeatureCourse() {
  return (
    <section className="border-b border-white/[0.06] bg-[#0a0a0f] py-14 md:py-16 lg:py-20">
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
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </Container>
    </section>
  );
}
