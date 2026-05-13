import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setCategories, setError, setLoading } from "../features/categorySlice";
import { supabase } from "@/lib/supabaseClient";

export const useCategories = () => {
  const dispatch = useAppDispatch();
  const { categories, error: categoryError } = useAppSelector(
    (state) => state.category
  );

  useEffect(() => {
    const fetchCategories = async () => {
      if (categories.length > 0) return;

      dispatch(setLoading(true));

      const { data, error: supabaseError } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (supabaseError) {
        dispatch(setError(supabaseError.message));
      } else if (data) {
        dispatch(setCategories(data));
      }

      dispatch(setLoading(false));
    };

    fetchCategories();
  }, [dispatch, categories.length]);

  return { categories, error: categoryError };
};