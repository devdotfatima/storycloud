"use server";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { validateUser } from "@/lib/dal";
import { cookies } from "next/headers";

export const deleteAccount = async (): Promise<{ error: string }> => {
  try {
    const { user } = await validateUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const response = await fetch(
      "https://storycloudapi.com/users/delete-user",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.jwt_token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return { error: errorData.detail || "Unauthorized." };
    }

    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    return redirect("/login");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("Unexpected error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};
