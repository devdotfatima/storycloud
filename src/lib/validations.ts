import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),

  birthday: z
    .date()
    .refine((value) => {
      const birthday = new Date(value);
      const age = new Date().getFullYear() - birthday.getFullYear();
      return age >= 13;
    }, "You must be 13 years or older to sign up.")
    .transform((value) => new Date(value)),

  password: requiredString.min(8, "Must be at least 8 characters"),
});

export const editProfileSchema = z.object({
  fullName: requiredString.min(1, "Full name is required"),
  username: requiredString
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, - and _ allowed")
    .min(3, "Username must be at least 3 characters"),
  bio: z.string().optional(),
  profileImage: z.instanceof(File).optional(),
});

export const loginSchema = z.object({
  email: requiredString,
  password: requiredString,
});

export type EditProfileT = z.infer<typeof editProfileSchema>;

export type SignUpT = z.infer<typeof signUpSchema>;

export type LoginT = z.infer<typeof loginSchema>;
