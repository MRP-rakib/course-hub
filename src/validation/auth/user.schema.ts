import { z } from "zod";

export const UserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username too long")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscore allowed"),

  fullname: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name too long"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100),

  dateOfBirth: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),

  mobileNumber: z
    .string()
    .regex(/^(\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),

  bio: z
    .string()
    .max(200, "Bio too long")
    .optional(),

  bloodGroup: z.enum([
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ]),
  role: z.enum(["admin", "student", "instructor"]).default("student"),
});

export type UserType = z.infer<typeof UserSchema>;