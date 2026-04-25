"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppDispatch,} from "@/redux/hooks";
import { FetchAPI } from "@/redux/fetchApi";
import { Step2 } from "@/components/auth/signup/Step2";
import { Step3 } from "@/components/auth/signup/Step3";
import Step1 from "@/components/auth/signup/Step1";
import { useRouter } from "next/navigation";

export default function SignupPage() {
 const [loading,setLoading] = useState(false)
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [step, setStep] = useState(1);
 

  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const nextStep1 = async () => {
    if (!form.username || !form.fullname || !form.email) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true)
    const result = await dispatch(
      FetchAPI({
        endpoint: "/api/auth/check-user",
        method: "POST",
        body: { username: form.username, email: form.email },
      }),
    );
   setLoading(false)
    if (FetchAPI.fulfilled.match(result)) {
      setError('')
      setSuccess(result.payload.message as string);
      setStep(2);
    }
    if (FetchAPI.rejected.match(result)) {
      setSuccess('')    
      setError(result.payload as string);
    }

  };

  const verifyCode = async () => {
    if (!form.code) {
      setError("Enter verification code");
      return;
    }
  setLoading(true)
    const verify=  await dispatch(
        FetchAPI({
          endpoint: "/api/auth/verifycode",
          method: "POST",
          body: { email:form.email, code: form.code },
        }),
      )
      setLoading(false)
      if(FetchAPI.fulfilled.match(verify)){
        setError('')
        setSuccess(verify.payload.message as string)
         setStep(3);
      }
      if(FetchAPI.rejected.match(verify)){
        setSuccess('')
         setError(verify.payload as string)
      }
      

  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    if (!form.password || !form.confirmPassword) {
      setError("Password required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const signup= await dispatch(
        FetchAPI({
          endpoint: "/api/auth/signup/teacher",
          method: "POST",
          body: {
            email: form.email,
            fullname: form.fullname,
            username: form.username,
            password: form.password,
          },
        }),
      )
      setLoading(false)
      if(FetchAPI.fulfilled.match(signup)){
        setError('')
         setSuccess(signup.payload.message as string);
      setForm({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        code: "",
      });
      route.replace("/signin");
      }
     if(FetchAPI.rejected.match(signup)){
      setSuccess('')
      setError(signup.payload as string)
     }
    
  };

  const steps = ["Details", "Verify", "Password"];

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

      <div className="relative w-full max-w-lg">
        <div className="mb-6 text-center">
          <Link
            href="/join"
            className="inline-flex items-center gap-1 text-xs font-medium text-white/35 transition-colors hover:text-violet-400"
          >
            ← Back to role selection
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="inline-block mb-5 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-violet-400">
            Instructor signup
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight mb-2">
            Create your{" "}
            <span className="bg-linear-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              account
            </span>
          </h1>
          <p className="text-sm text-white/35">
            Step {step} of 3 — {steps[step - 1]}
          </p>
        </div>

        <div className="relative rounded-2xl border border-white/8 bg-white/4 p-8 sm:p-9 backdrop-blur-sm overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="absolute top-0 left-[12%] right-[12%] h-px bg-linear-to-r from-transparent via-violet-500/45 to-transparent" />

          <div className="relative flex items-start justify-between gap-2 mb-8 pt-1">
            {steps.map((label, i) => {
              const idx = i + 1;
              const isActive = step === idx;
              const isDone = step > idx;
              return (
                <div
                  key={label}
                  className="flex flex-1 items-center min-w-0 last:flex-none"
                >
                  <div className="flex flex-col items-center gap-2 w-full min-w-0">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold font-display transition-colors
                        ${
                          isActive
                            ? "border-violet-500/40 bg-violet-500/20 text-violet-300"
                            : isDone
                              ? "border-emerald-500/35 bg-emerald-500/15 text-emerald-400"
                              : "border-white/8 bg-white/3 text-white/30"
                        }`}
                    >
                      {isDone ? "✓" : idx}
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-medium uppercase tracking-wide truncate max-w-full text-center
                        ${isActive ? "text-violet-400" : isDone ? "text-white/45" : "text-white/25"}`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`h-px flex-1 mx-1 sm:mx-2 mt-4.5 min-w-2 transition-colors
                        ${isDone ? "bg-linear-to-r from-emerald-500/40 to-violet-500/30" : "bg-white/6"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {error && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              <span className="shrink-0" aria-hidden>
                ⚠
              </span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div
              role="status"
              className="mb-6 flex items-start gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
            >
              <span className="shrink-0" aria-hidden>
                ✓
              </span>
              <span>{success}</span>
            </div>
          )}
          {step === 1 && (
            <Step1
              form={form}
              handleChange={handleChange}
              loading={loading}
              nextStep1={nextStep1}
            />
          )}

          {step === 2 && (
            <Step2
              form={form}
              handleChange={handleChange}
              verifyCode={verifyCode}
              loading={loading}
              setStep={setStep}
              nextStep1={nextStep1}
            />
          )}

          {step === 3 && (
            <Step3
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              setStep={setStep}
            />
          )}

          <p className="mt-8 text-center text-xs text-white/25">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-violet-400 transition-colors hover:text-violet-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
