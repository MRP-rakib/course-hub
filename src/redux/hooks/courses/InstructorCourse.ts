import { supabase } from "@/lib/supabaseClient";
import {
  setCourse,
  setError,
  setLoading,
} from "@/redux/features/courseSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useEffect } from "react";

export const useInstructorCourse = () => {
  const dispatch = useAppDispatch();
  const { courses, error } = useAppSelector((state) => state.course);
  const { profile } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!profile?.id) return;


    const fetchCourse = async () => {
      dispatch(setLoading(true));

      const { data, error } = await supabase
        .from("courses")
        .select(`
          *,
          instructor:profiles(*),
          category:categories(*)
        `)
        .eq("instructor_id", profile.id);

      if (error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setCourse(data || []));
      }

      dispatch(setLoading(false));
    };

    fetchCourse();
  }, [dispatch, profile?.id]);

  return { courses, error };
};