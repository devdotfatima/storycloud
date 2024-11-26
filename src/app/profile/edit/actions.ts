"use server";
import { redirect } from "next/navigation";
import { EditProfileT, editProfileSchema } from "@/lib/validations";
import { isRedirectError } from "next/dist/client/components/redirect";
import { validateUser } from "@/lib/dal";

export const updateProfile = async (
  values: EditProfileT
): Promise<{ error: string }> => {
  try {
    const { user } = await validateUser();
    if (!user) {
      return { error: "Unauthorized" };
    }
    const { user_name, user_bio, user_image } = editProfileSchema.parse(values);
    const formData = new FormData();
    formData.append("user_name", user_name);
    if (user_bio) formData.append("user_bio", user_bio);
    if (user_image) formData.append("user_image", user_image);
    console.log({ user });

    const response = await fetch(
      "https://storycloudapi.com/users/update-user",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.jwt_token}`,
          Accept: "application/json",
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return { error: errorData.detail || "Failed to update profile." };
    }

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("Unexpected error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};
