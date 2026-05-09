"use client";

import { useState } from "react";
import { 
  Users, 
  BookOpen, 
  Trophy, 
  TrendingUp, 
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: "violet" | "pink" | "emerald" | "blue";
}

const StatCard = ({ title, value, change, icon, color }: StatCardProps) => {
  const isPositive = change >= 0;
  
  const colorClasses = {
    violet: "from-violet-600 to-purple-600",
    pink: "from-pink-600 to-rose-600",
    emerald: "from-emerald-600 to-teal-600",
    blue: "from-blue-600 to-cyan-600",
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/[0.07] to-white/2 backdrop-blur-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
      {/* linear overlay on hover */}
      <div className={`absolute inset-0 bg-linear-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-linear-to-br ${colorClasses[color]} shadow-lg`}>
            {icon}
          </div>
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <MoreVertical className="h-4 w-4 text-white/40" />
          </button>
        </div>

        <h3 className="text-white/60 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white mb-2">{value}</p>
        
        <div className="flex items-center gap-1">
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4 text-emerald-400" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-400" />
          )}
          <span className={`text-sm font-medium ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
            {Math.abs(change)}%
          </span>
          <span className="text-white/40 text-sm ml-1">vs last month</span>
        </div>
      </div>
    </div>
  );
};

interface RecentActivity {
  id: number;
  type: "enrollment" | "completion" | "review";
  student: string;
  course: string;
  time: string;
}

const recentActivities: RecentActivity[] = [
  { id: 1, type: "enrollment", student: "John Doe", course: "React Masterclass", time: "2 hours ago" },
  { id: 2, type: "completion", student: "Jane Smith", course: "Python Basics", time: "5 hours ago" },
  { id: 3, type: "review", student: "Mike Johnson", course: "UI/UX Design", time: "1 day ago" },
  { id: 4, type: "enrollment", student: "Sarah Williams", course: "Data Science", time: "2 days ago" },
  { id: 5, type: "completion", student: "Tom Brown", course: "JavaScript Pro", time: "3 days ago" },
];

interface TopCourse {
  id: number;
  title: string;
  students: number;
  rating: number;
  revenue: string;
}

const topCourses: TopCourse[] = [
  { id: 1, title: "React Masterclass 2024", students: 1250, rating: 4.8, revenue: "$12,450" },
  { id: 2, title: "Python for Beginners", students: 980, rating: 4.9, revenue: "$9,800" },
  { id: 3, title: "UI/UX Design Complete", students: 750, rating: 4.7, revenue: "$7,500" },
  { id: 4, title: "Data Science Pro", students: 650, rating: 4.6, revenue: "$6,500" },
];

export default function OverviewPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");

  return (
    <div className="bg-[#0a0a0f] text-white min-h-screen p-6">
      {/* ANIMATED BACKGROUND GRADIENTS */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-purple-600/15 blur-[120px] animate-pulse delay-700" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-pink-600/10 blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-white via-white to-white/70 bg-clip-text text-transparent mb-2">
              Dashboard Overview
            </h1>
            <p className="text-white/60">Welcome back! Here&apos;s what&apos;s happening today.</p>
          </div>

          {/* TIME RANGE SELECTOR */}
          <div className="flex gap-2 bg-black/30 p-1.5 rounded-2xl border border-white/5 mt-4 md:mt-0">
            {(["week", "month", "year"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 capitalize ${
                  timeRange === range ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {timeRange === range && (
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/50" />
                )}
                <span className="relative">{range}</span>
              </button>
            ))}
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value="2,845"
            change={12.5}
            icon={<Users className="h-6 w-6 text-white" />}
            color="violet"
          />
          <StatCard
            title="Active Courses"
            value="48"
            change={8.2}
            icon={<BookOpen className="h-6 w-6 text-white" />}
            color="pink"
          />
          <StatCard
            title="Completions"
            value="1,234"
            change={-3.1}
            icon={<Trophy className="h-6 w-6 text-white" />}
            color="emerald"
          />
          <StatCard
            title="Revenue"
            value="$45.2K"
            change={15.8}
            icon={<TrendingUp className="h-6 w-6 text-white" />}
            color="blue"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* RECENT ACTIVITY */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-linear-to-br from-white/[0.07] to-white/2 backdrop-blur-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              <button className="text-sm text-violet-400 hover:text-violet-300 font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`p-3 rounded-xl ${
                    activity.type === "enrollment" ? "bg-violet-500/20 text-violet-400" :
                    activity.type === "completion" ? "bg-emerald-500/20 text-emerald-400" :
                    "bg-pink-500/20 text-pink-400"
                  }`}>
                    {activity.type === "enrollment" && <BookOpen className="h-5 w-5" />}
                    {activity.type === "completion" && <Trophy className="h-5 w-5" />}
                    {activity.type === "review" && <Star className="h-5 w-5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{activity.student}</p>
                    <p className="text-white/50 text-sm truncate">
                      {activity.type === "enrollment" && "Enrolled in "}
                      {activity.type === "completion" && "Completed "}
                      {activity.type === "review" && "Reviewed "}
                      <span className="text-violet-400">{activity.course}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-white/40 text-xs">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TOP COURSES */}
          <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/[0.07] to-white/2 backdrop-blur-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Top Courses</h2>
            </div>

            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 h-10 w-10 rounded-lg bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm mb-2 truncate">
                        {course.title}
                      </h3>
                      
                      <div className="flex items-center gap-3 text-xs text-white/50">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {course.students}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          {course.rating}
                        </span>
                      </div>
                      
                      <p className="text-emerald-400 font-semibold text-sm mt-2">
                        {course.revenue}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}