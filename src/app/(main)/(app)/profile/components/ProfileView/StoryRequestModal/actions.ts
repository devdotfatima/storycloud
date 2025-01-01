import { StoryRequestT } from "@/lib/validations";
import { UserT } from "@/shared/types";

export const sendStoryRequest = async (
  payload: StoryRequestT,
  user: UserT
): Promise<{ success?: boolean; error?: string }> => {
  try {
    const { receiver_id, request_text } = payload;

    const response = await fetch(
      `https://www.storycloudapi.com/requests/send-story-request?receiver_id=${receiver_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt_token}`,
        },
        body: JSON.stringify({ request_text }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to send story request");
    }

    const data = await response.json();
    return { success: true, ...data };
  } catch (error) {
    console.error("Error sending story request:", error);

    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};
