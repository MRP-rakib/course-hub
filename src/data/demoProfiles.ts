import type { DashboardRole } from "@/lib/dashboardRole";

/** Demo dashboard payloads — replace with session/API */

export type StudentProfileData = {
  role: "student";
  fullName: string;
  username: string;
  email: string;
  bio: string;
  memberSince: string;
  avatar: string;
  enrolledCourses: number;
  completedLessons: number;
  hoursLearned: number;
};

export type TeacherProfileData = {
  role: "instructor";
  fullName: string;
  username: string;
  email: string;
  bio: string;
  memberSince: string;
  avatar: string;
  coursesPublished: number;
  totalStudents: number;
  avgRating: number;
};

export type AdminProfileData = {
  role: "admin";
  fullName: string;
  username: string;
  email: string;
  bio: string;
  memberSince: string;
  avatar: string;
  lastLogin: string;
  permissions: string[];
};

export const demoStudentProfile: StudentProfileData = {
  role: "student",
  fullName: "Ayesha Rahman",
  username: "ayesha_learns",
  email: "ayesha.student@example.com",
  bio: "Frontend enthusiast—working through React and UX courses after hours.",
  memberSince: "March 2024",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
  enrolledCourses: 4,
  completedLessons: 62,
  hoursLearned: 38,
};

export const demoTeacherProfile: TeacherProfileData = {
  role: "instructor",
  fullName: "Rakib Hasan",
  username: "rakib_teaches",
  email: "rakib.instructor@example.com",
  bio: "Design systems and UI craft—helping teams ship cohesive interfaces.",
  memberSince: "June 2023",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
  coursesPublished: 4,
  totalStudents: 11200,
  avgRating: 4.8,
};

export const demoAdminProfile: AdminProfileData = {
  role: "admin",
  fullName: "Samira Khan",
  username: "samira_ops",
  email: "samira.admin@example.com",
  bio: "Platform operations—courses, users, and instructor onboarding.",
  memberSince: "January 2023",
  avatar:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
  lastLogin: "Today · 9:42 AM",
  permissions: ["Users", "Courses", "Payments", "Support escalations"],
};

export type DashboardUserData = StudentProfileData | TeacherProfileData | AdminProfileData;

export function getDemoDashboardData(role: DashboardRole): DashboardUserData {
  switch (role) {
    case "teacher":
      return demoTeacherProfile;
    case "admin":
      return demoAdminProfile;
    default:
      return demoStudentProfile;
  }
}
