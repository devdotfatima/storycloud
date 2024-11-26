import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  username: requiredString.min(3, "Username must be at least 3 characters"),
  birthday: z
    .date()
    .refine((value) => {
      const birthday = new Date(value);
      const age = new Date().getFullYear() - birthday.getFullYear();
      return age >= 13;
    }, "You must be 13 years or older to sign up.")
    .transform((value) => new Date(value)),

  password: requiredString
    .min(8, "Must be at least 8 characters")
    .regex(/[A-Z]/, {
      message: " must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: " must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: " must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, {
      message: " must contain at least one special character.",
    })
    .min(8, "Must be at least 8 characters"),
});

export const editProfileSchema = z.object({
  fullName: requiredString.min(1, "Full name is required"),
  bio: z.string().optional(),
  profileImage: z.instanceof(File).optional(),
});

export const loginSchema = z.object({
  email: requiredString.email("Invalid email address"),
  password: requiredString,
});

export const forgotPasswordSchema = z.object({
  email: requiredString.email("Invalid email address"),
});

export type EditProfileT = z.infer<typeof editProfileSchema>;

export type SignUpT = z.infer<typeof signUpSchema>;

export type LoginT = z.infer<typeof loginSchema>;

export type forgotPasswordT = z.infer<typeof forgotPasswordSchema>;
