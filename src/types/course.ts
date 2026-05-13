export type Course = {
  id: string;
  course_id: string;
  title: string;
  description: string | null;

  level: "Beginner" | "Intermediate" | "Advanced" | null;

  lessons?: number;
  duration: string | null;

  rating: number;
  students: number;

  price: number;

  thumbnail: string | null;
  badge: string | null;

  is_published: boolean;
  created_at: string;

  category?: {
    id: string;
    name: string;
  };

  instructor?: {
    id: string;
    fullname: string | null;
    avatar_url: string | null;
  };
};