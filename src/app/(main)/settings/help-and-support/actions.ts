"use server";

import { helpRequestSchema, helpRequestT } from "@/lib/validations";
import { validateUser } from "@/lib/dal";

export const sendHelpRequest = async (
  values: helpRequestT
): Promise<{ error?: string; success?: boolean }> => {
  try {
    // Validate input
    let parsedValues;
    try {
      parsedValues = helpRequestSchema.parse(values);
    } catch {
      return { error: "Invalid input data" };
    }
    const { subject, text, topic } = parsedValues;

    // Validate user
    const { user } = await validateUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    // Create payload and send request
    const payload = { subject, text, topic };
    const response = await fetch(
      "https://storycloudapi.com/help/send-help-email",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.jwt_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    // Handle response
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { detail: "Unexpected error format from server" };
      }
      console.error("API Error:", errorData);
      return {
        error: errorData.detail || "Something went wrong. Please try again",
      };
    }

    // Success response
    return { success: true };
  } catch (error) {
    console.error(
      "Unexpected error:",
      error instanceof Error ? error.message : error
    );
    return { error: "Something went wrong. Please try again." };
  }
};
