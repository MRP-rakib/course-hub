import { Course } from '@/types/course'
import { BookOpen, Clock } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
interface enrollCoursesType{
    enrollCourses:Course[]
}
function ViewList({enrollCourses}:enrollCoursesType) {
  return (
     <div className="space-y-4">
              {enrollCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="group relative rounded-2xl border border-white/10 bg-linear-to-br from-white/[0.07] to-white/2 backdrop-blur-2xl p-6 hover:border-violet-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/20"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-32 rounded-xl bg-linear-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 overflow-hidden">
                      <Image
                        src={course.thumbnail || "/placeholder.png"}
                        alt="thumbnail"
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold mb-1 group-hover:text-violet-400 transition-colors">
                            Course {index + 1}
                          </h3>
                          <p className="text-sm text-white/60">
                            Continue your learning journey
                          </p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-semibold border border-violet-500/30">
                          In Progress
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                          <span>Progress</span>
                          <span> 100%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `100%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-white/50">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          12 hours
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          24 lessons
                        </span>
                      </div>
                    </div>

                    <button className="self-end md:self-center px-6 py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 font-medium text-sm">
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
  )
}

export default ViewList