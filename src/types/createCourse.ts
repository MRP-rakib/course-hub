export type CreateCourse = {
  title: string;
  description: string;
  instuctor?:string
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  thumbnail: string;
};