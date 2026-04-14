"use client";

import { useState } from "react";
import Link from "next/link";
import InputField from "@/components/ui/InputField";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 py-10">

      <div className="w-full max-w-md">

        {/* CARD */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-5 sm:p-8">

          {/* TITLE */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800">
            Sign In
          </h1>

          <p className="text-center text-gray-500 text-xs sm:text-sm mt-1">
            Welcome back 👋
          </p>

          {/* ERROR */}
          {error && (
            <div className="mt-4 bg-red-100 text-red-600 text-xs sm:text-sm px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            <InputField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold transition-all shadow-md"
            >
              Login
            </button>
          </form>

          {/* LINKS */}
          <div className="mt-6 text-center space-y-2">

            <p className="text-xs sm:text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                href="/join"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>

            <p className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">
              Forgot password?
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}