import { supabase } from "@/lib/supabaseClient"

export const signin = async(email:string,password:string)=>{
    const {data,error}= await supabase.auth.signInWithPassword({
        email,
        password
    })
     if (error) {
    console.error("Signin error:", error.message)
    return { data: null, error }
  }
    return {data,error}
}