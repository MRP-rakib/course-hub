import { supabase } from "@/lib/supabaseClient"

export const signup = async(email:string,password:string)=>{
    const {data,error}= await supabase.auth.signUp({
        email,
        password,
    })
     if (error) {
    console.error("Signup error:", error.message)
    return { data: null, error }
  }
    return {data,error}
}