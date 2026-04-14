

export interface UserType {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  role?: "student" | "teacher" | "admin";
  dateOfBirth?: Date;

}