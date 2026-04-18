import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InstructorProfileView from "@/components/instructors/InstructorProfileView";
import { allInstructors, getInstructorBySlug } from "@/data/instructors";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allInstructors.map((instructor) => ({ slug: instructor.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const instructor = getInstructorBySlug(slug);
  if (!instructor) {
    return { title: "Instructor not found" };
  }
  return {
    title: `${instructor.name} | Course Hub`,
    description: instructor.bio.slice(0, 155),
  };
}

export default async function InstructorProfilePage({ params }: Props) {
  const { slug } = await params;
  const instructor = getInstructorBySlug(slug);
  if (!instructor) {
    notFound();
  }
  return <InstructorProfileView instructor={instructor} />;
}
