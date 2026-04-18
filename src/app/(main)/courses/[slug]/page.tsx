import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseView from "@/components/courses/CourseView";
import { allCourses, getCourseBySlug } from "@/data/courses";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allCourses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) {
    return { title: "Course not found" };
  }
  return {
    title: `${course.title} | Course Hub`,
    description: course.description.slice(0, 155),
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) {
    notFound();
  }
  return <CourseView course={course} />;
}
