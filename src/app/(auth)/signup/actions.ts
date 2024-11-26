"use server";
import { redirect } from "next/navigation";
import { signUpSchema, SignUpT } from "@/lib/validations";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";

export const signUp = async (
  credentials: SignUpT
): Promise<{ error: string }> => {
  try {
    const { email, password, birthday, username } =
      signUpSchema.parse(credentials);

    const payload = {
      user_email: email,
      user_handle: username,
      password: password,
      birthday: birthday
        ? new Date(birthday).toLocaleDateString("en-CA") // Convert to YYYY-MM-DD
        : "2000-01-01", // Default birthday if not provided
    };
    const response = await fetch(
      "https://storycloudapi.com/users/create-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Send as JSON in the request body
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return { error: errorData.detail };
    }

    const data = await response.json();
    console.log(data);

    if (!data.jwt_token) {
      console.error("Missing access_token in response");
      return { error: "Something went wrong." };
    }

    // Set the cookie if successful
    const cookieStore = await cookies();
    cookieStore.set("access_token", data.jwt_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    // Redirect upon successful login
    return redirect("/profile/edit");
  } catch (error) {
    if (isRedirectError(error)) throw error; // Pass redirect errors
    console.error("Unexpected error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};
