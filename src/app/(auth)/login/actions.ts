"use server";

import { loginSchema, LoginT } from "@/lib/validations";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (
  credentials: LoginT
): Promise<{ error: string }> => {
  try {
    const { email, password } = loginSchema.parse(credentials);

    const payload = new URLSearchParams({
      username: email,
      password: password,
    }).toString();

    const response = await fetch("https://storycloudapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      // setError(errorData.detail || "Invalid credentials.");
      return { error: "Invalid credentials." };
    }

    const data = await response.json();

    if (!data.access_token) {
      console.error("Missing access_token in response");
      return { error: "Invalid server response." };
    }

    console.log(data.access_token);

    const cookieStore = await cookies();
    cookieStore.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "Something went wrong. try again." };
  }
};
