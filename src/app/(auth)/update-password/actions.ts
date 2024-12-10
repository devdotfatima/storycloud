"use server";

import { validateUser } from "@/lib/dal";
import { updatePasswordSchema, UpdatePasswordT } from "@/lib/validations";

export const updatePassword = async (
  credentials: UpdatePasswordT
): Promise<{ error?: string }> => {
  try {
    const { password } = updatePasswordSchema.parse(credentials);
    const { user } = await validateUser();

    const payload = {
      email: password,
    };
    let response;

    if (user) {
      response = await fetch("https://storycloudapi.com/auth/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt_token}`,
        },
        body: JSON.stringify(payload),
      });
    } else {
      const token = "";
      const payloadWithToken = { ...payload, token };

      response = await fetch("https://storycloudapi.com/auth/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadWithToken),
      });
    }

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
