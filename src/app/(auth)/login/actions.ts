"use server";

import { loginSchema, LoginT } from "@/lib/validations";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (
  credentials: LoginT
): Promise<{ error?: string }> => {
  try {
    const { email, password } = loginSchema.parse(credentials);

    const payload = new URLSearchParams({
      username: email,
      password,
    }).toString();

    const response = await fetch("https://storycloudapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload,
    });

    // Check for response status
    if (!response.ok) {
      return { error: "Invalid credentials." };
    }

    const data = await response.json();

    if (!data.access_token) {
      console.error("Missing access_token in response");
      return { error: "Invalid server response." };
    }

    // Set the cookie if successful
    const cookieStore = await cookies();
    cookieStore.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    // Redirect upon successful login
    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error; // Pass redirect errors
    console.error("Unexpected error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};
