"use server";

import { forgotPasswordSchema, ForgotPasswordT } from "@/lib/validations";

export const forgotPassword = async (
  credentials: ForgotPasswordT
): Promise<{ error?: string }> => {
  try {
    const { email } = forgotPasswordSchema.parse(credentials);

    const payload = {
      email: email,
    };

    const response = await fetch(
      "https://storycloudapi.com/auth/password-reset-request",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    // Check for response status
    if (!response.ok) {
      console.log(response);

      return { error: "Something went wrong." };
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};
