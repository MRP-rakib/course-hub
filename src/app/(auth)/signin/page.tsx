"use client";

import { useState } from "react";
import Link from "next/link";
import InputField from "@/components/ui/InputField";
import { Check, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { signin } from "@/services/auth/signin";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "rakib@example.com", password: "123456" });
 const [loading,setLoading] = useState(false)
  const [Error,setError] =useState('')
  const [success,setSuccess] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 const route = useRouter()
const handleSubmit=async(e:React.SubmitEvent<HTMLElement>)=>{
     e.preventDefault()
     setLoading(true)
  if(!form.email || !form.password){
    setLoading(false)
    setError('all field are required')
    setSuccess('')
    return
  }
  const {data,error} = await signin(form.email,form.password)
   if(error){
    setLoading(false)
    setSuccess('')
    setError(error.message)
    return
   }
   if(data){
    setLoading(false)
    setError('')
    setSuccess('signin succefull')
    route.replace('/')
   }
}



  return (
    <div className="relative min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="fixed -top-25 -left-25 w-125 h-125 rounded-full bg-violet-600 opacity-[0.18] blur-[80px] pointer-events-none" />
      <div className="fixed -bottom-20 -right-20 w-100 h-100 rounded-full bg-pink-500 opacity-[0.18] blur-[80px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 rounded-full bg-cyan-400 opacity-[0.18] blur-[80px] pointer-events-none" />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-medium text-white/35 transition-colors hover:text-violet-400"
          >
            ← Back to home
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="inline-block mb-5 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-violet-400">
            Sign in
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight mb-2">
            Welcome{" "}
            <span className="bg-linear-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              back
            </span>
          </h1>
          <p className="text-sm text-white/35">Sign in to continue to Course Hub</p>
        </div>

        <div className="relative rounded-2xl border border-white/8 bg-white/4 p-8 sm:p-9 backdrop-blur-sm overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="absolute top-0 left-[12%] right-[12%] h-px bg-linear-to-r from-transparent via-violet-500/45 to-transparent" />

          {Error && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              <span className="shrink-0" aria-hidden>
                <TriangleAlert/>
              </span>
              <span className=" capitalize">{Error}</span>
            </div>
          )}
          {success && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-2 rounded-xl border border-green-500/25 bg-green-500/10 px-4 py-3 text-sm text-green-200"
            >
              <span className="shrink-0" aria-hidden>
                <Check/>
              </span>
              <span className=" capitalize">{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <div>
              <InputField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  className="text-xs font-medium text-violet-400 transition-colors hover:text-violet-300"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="relative mt-2 w-full overflow-hidden rounded-lg bg-linear-to-r from-violet-600 to-purple-600 px-4 py-3 font-display text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <span className="inline-flex gap-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse [animation-delay:150ms]" />
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse [animation-delay:300ms]" />
                </span>
              ) : (
                "Sign in →"
              )}
            </button>
          </form>

          <div className="relative my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/8" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
              or
            </span>
            <div className="h-px flex-1 bg-white/8" />
          </div>

          <p className="text-center text-xs text-white/25">
            Don&apos;t have an account?{" "}
            <Link
              href="/join"
              className="font-medium text-violet-400 transition-colors hover:text-violet-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
