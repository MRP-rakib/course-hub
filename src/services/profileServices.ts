import { supabase } from "@/lib/supabaseClient"
import { AuthUser } from "@/types/authType"


export const createProfile = async (
  user: AuthUser,
  fullname: string,
  username: string,
  role: 'student'|'instructor'
) => {
  const { data, error } = await supabase
    .from("students")
    .insert([
      {
        id:user.id,
        email: user.email,
        fullname,
        username,
        role,
      }
    ])
    .select()

  if (error) {
    console.error("student creation error:", error)
    return { data: null, error }
  }

  return { data, error: null }
}