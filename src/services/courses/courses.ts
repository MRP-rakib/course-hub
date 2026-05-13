import { supabase } from "@/lib/supabaseClient";
import { setCourse, setError, setLoading } from "@/redux/features/courseSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useEffect } from "react";

export const useCourse = () => {
  const dispatch = useAppDispatch();
  const { courses, error } = useAppSelector((state) => state.course);

  useEffect(() => {
    if (courses.length > 0) return;
    const fetchCourse = async () => {
      dispatch(setLoading(true));
      const { data, error } = await supabase
        .from("courses")
        .select(
          `
      *,
      instructor:profiles(*),
      category:categories(*)
    `,
        )
      if (error) {
        dispatch(setError(error.message));
      } else if (data) {
        dispatch(setCourse(data));
      }
      dispatch(setLoading(false));
    };
    fetchCourse();
  }, [dispatch, courses]);
  return { courses, error };
};
