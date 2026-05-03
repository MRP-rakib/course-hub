"use client";

import { useState } from "react";
import Link from "next/link";
import { LoadingDots } from "@/components/auth/LoadingDots";
import InputField from "@/components/ui/InputField";
import { usePathname, useRouter } from "next/navigation";
import { signup } from "@/services/auth/signup";
import { createProfile } from "@/services/profileServices";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const pathname = usePathname()
  const route = useRouter()
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
    setLoading(false)
  };


  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (loading) return; // 🔥 prevent double submit
  setLoading(true);
  setError("");
  setSuccess("");

  try {
    if (
      !form.username ||
      !form.fullname ||
      !form.email ||
      !form.password ||
      !form.cpassword
    ) {
      setError("all field required");
      return;
    }

    if (form.password !== form.cpassword) {
      setError("Passwords do not match");
      return;
    }

    const role = pathname.includes("student") ? "student" : "instructor";

    const { data, error } = await signup(form.email, form.password);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.user) {
      await createProfile(
        data.user,
        form.fullname,
        form.username,
        role
      );

      setSuccess("account created successfully");

      route.replace("/signin");
    }
  } finally {
    setLoading(false); // 🔥 ALWAYS runs
  }
};

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
            Student signup
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight mb-2">
            Create your{" "}
            <span className="bg-linear-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              account
            </span>
          </h1>
        </div>

        <div className="relative rounded-2xl border border-white/8 bg-white/4 p-8 sm:p-9 backdrop-blur-sm overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="absolute top-0 left-[12%] right-[12%] h-px bg-linear-to-r from-transparent via-violet-500/45 to-transparent" />
          {Error && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              <span className="shrink-0" aria-hidden>
                ⚠
              </span>
              <span className=" capitalize">{Error}</span>
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
              <span className=" capitalize">{success}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
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
              label="Confirm Password"
              name="cpassword"
              type="password"
              value={form.cpassword}
              onChange={handleChange}
            />
            <button
              type="submit"
              disabled={loading}
              className="relative mt-2 w-full overflow-hidden rounded-lg bg-linear-to-r from-violet-600 to-purple-600 px-4 py-3 font-display text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? <LoadingDots /> : "Signup →"}
            </button>
          </form>

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
