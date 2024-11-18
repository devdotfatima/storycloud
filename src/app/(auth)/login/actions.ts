"use server";

// import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";
import { loginSchema, LoginT } from "@/lib/validations";
import { isRedirectError } from "next/dist/client/components/redirect";

export const login = async (
  credentials: LoginT
): Promise<{ error: string }> => {
  try {
    const { email, password } = loginSchema.parse(credentials);

    // Send login request to the API
    const response = await fetch("https://storycloudapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // const errorData = await response.json();
      return { error: "Invalid credentials." };
    }

    const { token } = await response.json();

    // Store the token securely (example using cookies)
    // Note: This requires setting up secure cookie handling server-side.
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    };
    // Save token in cookies (you might need to set this in headers for the response)
    document.cookie = `token=${token}; ${Object.entries(cookieOptions)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ")}`;

    // Redirect to the home page
    return redirect("/");

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "Something went wrong. try again." };
  }
};
