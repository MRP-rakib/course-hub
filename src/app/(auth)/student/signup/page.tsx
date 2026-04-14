"use client";

import { useState } from "react";
import Link from "next/link";
import InputField from "@/components/ui/InputField";

export default function SignupPage() {
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

  // STEP 1 → send code (fake validation)
  const nextStep1 = () => {
    if (!form.username || !form.fullname || !form.email) {
      setError("Please fill all fields");
      return;
    }

    setError("");
    setStep(2);
  };

  // STEP 2 → verify code (fake check)
  const verifyCode = () => {
    if (!form.code) {
      setError("Enter verification code");
      return;
    }

    setError("");
    setStep(3);
  };

  // STEP 3 → signup
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-white to-purple-100 px-4 py-10">

      <div className="w-full max-w-md">

        {/* CARD */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-5 sm:p-8">

          {/* TITLE */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800">
            Create Account
          </h1>

          <p className="text-center text-gray-500 text-xs sm:text-sm mt-1">
            Step {step} of 3
          </p>

          {/* PROGRESS */}
          <div className="w-full bg-gray-200 h-2 rounded-full mt-5 overflow-hidden">
            <div
              className="h-2 bg-blue-600 transition-all duration-500"
              style={{
                width:
                  step === 1 ? "33%" : step === 2 ? "66%" : "100%",
              }}
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="mt-4 bg-red-100 text-red-600 text-xs sm:text-sm px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mt-4 bg-green-100 text-green-700 text-xs sm:text-sm px-4 py-2 rounded-lg">
              {success}
            </div>
          )}

          {/* FORM */}
          <div className="mt-6 space-y-4">

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-4">

                <InputField
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                />

                <InputField
                  label="Full Name"
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                />

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />

                <button
                  onClick={nextStep1}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold transition"
                >
                  Send Verification Code
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-4">

                <InputField
                  label="Verification Code"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  placeholder="Enter 6-digit code"
                />

                <button
                  onClick={verifyCode}
                  className="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 active:scale-95 text-white font-semibold transition"
                >
                  Verify Code
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Back
                </button>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">

                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                />

                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 active:scale-95 text-white font-semibold transition"
                >
                  Create Account
                </button>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Back
                </button>
              </form>
            )}

          </div>

          {/* LOGIN LINK */}
          <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}