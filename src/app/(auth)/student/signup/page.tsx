"use client";

import { useState } from "react";
import Link from "next/link";
import InputField from "@/components/ui/InputField";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FetchAPI } from "@/fetch/fetchApi";

export default function SignupPage() {
  const api = useAppSelector((state) => state.api);
  const dispatch = useAppDispatch();
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
    try {
      await dispatch(
        FetchAPI({
          endpoint: "/api/auth/check-user",
          method: "POST",
          body: {
            username: form.username,
            email: form.email,
          },
        })
      ).unwrap();
      setStep(2);
    } catch (error) {
      const err = error as string;
      setError(err);
    }
  };

  const verifyCode = () => {
    if (!form.code) {
      setError("Enter verification code");
      return;
    }
    setError("");
    setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.password || !form.confirmPassword) {
      setError("Password required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setSuccess("Account created successfully 🎉");
  };

  const steps = ["Details", "Verify", "Password"];

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Orbs — match join page */}
      <div className="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-violet-600 opacity-[0.18] blur-[80px] pointer-events-none" />
      <div className="fixed bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-pink-500 opacity-[0.18] blur-[80px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-cyan-400 opacity-[0.18] blur-[80px] pointer-events-none" />

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
            Student signup
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight mb-2">
            Create your{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              account
            </span>
          </h1>
          <p className="text-sm text-white/35">
            Step {step} of 3 — {steps[step - 1]}
          </p>
        </div>

        <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 sm:p-9 backdrop-blur-sm overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="absolute top-0 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-violet-500/45 to-transparent" />

          <div className="relative flex items-start justify-between gap-2 mb-8 pt-1">
            {steps.map((label, i) => {
              const idx = i + 1;
              const isActive = step === idx;
              const isDone = step > idx;
              return (
                <div key={label} className="flex flex-1 items-center min-w-0 last:flex-none">
                  <div className="flex flex-col items-center gap-2 w-full min-w-0">
                    <div
                      className={`
                        flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold font-display transition-colors
                        ${
                          isActive
                            ? "border-violet-500/40 bg-violet-500/20 text-violet-300"
                            : isDone
                              ? "border-emerald-500/35 bg-emerald-500/15 text-emerald-400"
                              : "border-white/[0.08] bg-white/[0.03] text-white/30"
                        }
                      `}
                    >
                      {isDone ? "✓" : idx}
                    </div>
                    <span
                      className={`
                        text-[10px] sm:text-xs font-medium uppercase tracking-wide truncate max-w-full text-center
                        ${isActive ? "text-violet-400" : isDone ? "text-white/45" : "text-white/25"}
                      `}
                    >
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`
                        h-px flex-1 mx-1 sm:mx-2 mt-[18px] min-w-[8px] transition-colors
                        ${isDone ? "bg-gradient-to-r from-emerald-500/40 to-violet-500/30" : "bg-white/[0.06]"}
                      `}
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
            <div className="space-y-5">
              <InputField
                variant="dark"
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
              />
              <InputField
                variant="dark"
                label="Full Name"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
              />
              <InputField
                variant="dark"
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={nextStep1}
                disabled={api.loading}
                className="relative mt-2 w-full overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-3 font-display text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
              >
                {api.loading ? (
                  <span className="inline-flex gap-1">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse [animation-delay:150ms]" />
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse [animation-delay:300ms]" />
                  </span>
                ) : (
                  "Send verification code →"
                )}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <InputField
                  variant="dark"
                  label="Verification code"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  placeholder="000000"
                />
                <p className="mt-2 text-xs text-white/30">
                  Check your email for a 6-digit code
                </p>
              </div>
              <button
                type="button"
                onClick={verifyCode}
                className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-3 font-display text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
              >
                Verify code →
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white/90"
              >
                ← Back
              </button>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                variant="dark"
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
              <InputField
                variant="dark"
                label="Confirm password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-gradient-to-r from-violet-600 to-emerald-600 px-4 py-3 font-display text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
              >
                Create account →
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white/90"
              >
                ← Back
              </button>
            </form>
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
