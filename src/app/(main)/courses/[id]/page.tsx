import { notFound } from "next/navigation";
import CourseView from "@/components/courses/CourseView";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const { data: course, error } = await supabase
    .from("courses")
    .select(
          `
      *,
      instructor:profiles(*),
      category:categories(*)
    `,
        )
    .eq("id", id)
    .single();

  if (error || !course) {
    notFound();
  }

  return <CourseView course={course} />;
}