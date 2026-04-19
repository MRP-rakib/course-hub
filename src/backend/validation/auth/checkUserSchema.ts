import { z } from "zod";

export const CheckUserSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
});