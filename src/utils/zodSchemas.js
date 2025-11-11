import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[@$!%*?&#^()_+\-=]/, "Must contain at least one special character"),
});
export const postSchema = z.object({
  title: z.string().min(3, 'Title too short'),
  description: z.string().min(5, 'Description too short'),
  content: z.string().min(10, 'Content too short'),
  category: z.enum(['Sports', 'Music', 'Art', 'Tech', 'Travel', 'Food']),
});
