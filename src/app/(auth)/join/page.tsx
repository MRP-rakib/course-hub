import Link from "next/link";

export default function JoinPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-100 px-4 sm:px-6 lg:px-8">
      
      <div className="w-full max-w-4xl text-center">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Join Our Platform
        </h1>

        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Choose your role to continue
        </p>

        {/* Cards */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

          {/* Student */}
          <Link
            href="/student/signup"
            className="group bg-white rounded-2xl p-5 sm:p-6 border shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="text-4xl sm:text-5xl">🎓</div>

            <h2 className="mt-3 text-lg sm:text-xl font-semibold group-hover:text-blue-600">
              Student
            </h2>

            <p className="mt-2 text-gray-500 text-xs sm:text-sm">
              Learn courses, join classes and grow your skills.
            </p>

            <span className="mt-4 text-blue-600 font-medium text-sm sm:text-base">
              Continue →
            </span>
          </Link>

          {/* Instructor */}
          <Link
            href="/teacher/signup"
            className="group bg-white rounded-2xl p-5 sm:p-6 border shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="text-4xl sm:text-5xl">👨‍🏫</div>

            <h2 className="mt-3 text-lg sm:text-xl font-semibold group-hover:text-blue-600">
              Instructor
            </h2>

            <p className="mt-2 text-gray-500 text-xs sm:text-sm">
              Create courses and teach students worldwide.
            </p>

            <span className="mt-4 text-blue-600 font-medium text-sm sm:text-base">
              Continue →
            </span>
          </Link>

        </div>

        {/* Login */}
        <p className="mt-8 sm:mt-10 text-xs sm:text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}