import Link from "next/link";

export default function JoinPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-12 overflow-hidden">

      {/* Orbs */}
      <div className="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-violet-600 opacity-[0.18] blur-[80px] pointer-events-none" />
      <div className="fixed bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-pink-500 opacity-[0.18] blur-[80px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-cyan-400 opacity-[0.18] blur-[80px] pointer-events-none" />

      {/* Grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Content */}
      <div className="relative w-full max-w-lg text-center">

        {/* Badge */}
        <div className="inline-block mb-5 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-violet-400">
          Get started
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-3">
          Who are{" "}
          <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            you?
          </span>
        </h1>
        <p className="text-sm text-white/35 mb-10">
          Choose your role to create your account
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Student */}
          <Link
            href="/student/signup"
            className="group relative flex flex-col items-center text-center rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_16px_48px_rgba(91,79,255,0.15)] overflow-hidden"
          >
            <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[18px] border border-violet-500/25 bg-violet-500/15 text-3xl">
              🎓
            </div>
            <h2 className="font-display text-lg font-bold text-white mb-2 tracking-tight">
              Student
            </h2>
            <p className="text-xs text-white/35 leading-relaxed mb-6 flex-1">
              Learn courses, join classes and grow your skills at your own pace.
            </p>
            <span className="rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-violet-400 transition-colors group-hover:bg-violet-500/20">
              Join as Student →
            </span>
          </Link>

          {/* Instructor */}
          <Link
            href="/teacher/signup"
            className="group relative flex flex-col items-center text-center rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/40 hover:shadow-[0_16px_48px_rgba(244,114,182,0.15)] overflow-hidden"
          >
            <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[18px] border border-pink-500/25 bg-pink-500/15 text-3xl">
              👨‍🏫
            </div>
            <h2 className="font-display text-lg font-bold text-white mb-2 tracking-tight">
              Instructor
            </h2>
            <p className="text-xs text-white/35 leading-relaxed mb-6 flex-1">
              Create courses and teach students from anywhere in the world.
            </p>
            <span className="rounded-full border border-pink-500/25 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-pink-400 transition-colors group-hover:bg-pink-500/20">
              Join as Instructor →
            </span>
          </Link>

        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-white/25">
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-violet-400 transition-colors hover:text-violet-300">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}