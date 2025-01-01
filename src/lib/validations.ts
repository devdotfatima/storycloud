import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  username: requiredString
    .max(30, "Username must be 30 characters or fewer.")
    .regex(
      /^[a-zA-Z0-9._]+$/,
      "Username can only contain letters, numbers, dots, and underscores."
    )
    .regex(
      /^(?!.*[_.]{2})/,
      "Username cannot contain consecutive dots or underscores."
    )
    .regex(/^(?![_.])/, "Username cannot start with a dot or underscore.")
    .regex(/(?<![_.])$/, "Username cannot end with a dot or underscore.")
    .min(3, "Username must be at least 3 characters"),
  birthday: z
    .date()
    .refine((value) => {
      const birthday = new Date(value);
      const age = new Date().getFullYear() - birthday.getFullYear();
      return age >= 13;
    }, "You must be 13 years or older to sign up.")
    .transform((value) => new Date(value)),
  password: z
    .string()
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
      message:
        "Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});

export const loginSchema = z.object({
  email: requiredString.email("Invalid email address"),
  password: requiredString,
});

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
        message:
          "Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
    confirmPassword: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
        message:
          "Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error will be shown on confirmPassword field
  });

export const forgotPasswordSchema = z.object({
  email: requiredString.email("Invalid email address"),
});

export const editProfileSchema = z.object({
  user_name: requiredString
    .min(1, "Full Name is required")
    .max(50, "Full Name must be less than 50 characters"),
  user_bio: z
    .string()
    .max(101, "Bio must be 100 characters or fewer.")
    .optional(),
  user_image: z.instanceof(File).or(z.undefined()).optional(),
});

export const helpRequestSchema = z.object({
  topic: requiredString,
  subject: requiredString,
  text: requiredString,
});

export const storyCreationSchema = z.object({
  audio: z
    .instanceof(File, { message: "Audio file is required." })
    .refine((file) => file.type === "audio/mpeg", {
      message: "Only MP3 files are allowed.",
    }),
});

export const storyRequestSchema = z.object({
  receiver_id: z.string().uuid("Invalid receiver ID"),
  request_text: requiredString.max(
    50,
    "Request text cannot exceed 50 characters"
  ),
});

export type helpRequestT = z.infer<typeof helpRequestSchema>;

export type EditProfileT = z.infer<typeof editProfileSchema>;

export type SignUpT = z.infer<typeof signUpSchema>;

export type LoginT = z.infer<typeof loginSchema>;

export type ForgotPasswordT = z.infer<typeof forgotPasswordSchema>;

export type UpdatePasswordT = z.infer<typeof updatePasswordSchema>;

export type StoryCreationT = z.infer<typeof storyCreationSchema>;

export type StoryRequestT = z.infer<typeof storyRequestSchema>;
