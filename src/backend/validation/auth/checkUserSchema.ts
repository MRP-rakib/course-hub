import { z } from "zod";

export const CheckUserSchema = z.object({
    username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be under 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscore"),
    email: z
    .email("Invalid email format"),

});