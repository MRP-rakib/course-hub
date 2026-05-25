import { supabase } from "@/lib/supabaseClient"
import { AuthUser } from "@/types/authType"


export const createProfile = async (
  user: AuthUser,
  fullname: string,
  username: string,
  role: 'student'|'instructor'
) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert([
      {
        id:user.id,
        username,
        fullname,
        role,
      }
    ])
    .select()

  if (error) {
    console.error("profile creation error:", error)
    return { data: null, error }
  }

  return { data, error: null }
}