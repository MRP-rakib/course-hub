import { supabase } from "@/lib/supabaseClient";
import { Course } from "@/types/course";

export const createCourse = async (courseData:Course) => {
  const { error } = await supabase
    .from("courses")
    .insert([
      {
        title: courseData.title,
        description: courseData.description,
        instructor_id: courseData.instructor, // profile.id
        category_id: courseData.category,
        thumbnail: courseData.thumbnail,
        price: courseData.price,
      },
    ])
    .select(); // newly created row return korbe

  if (error) {
    console.error(error.message);
    return null;
  }

  return {message:'course create successfull'};
};