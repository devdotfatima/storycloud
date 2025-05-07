import { StoryRequestT } from "@/lib/validations";
import { UserT } from "@/shared/types";

export const sendStoryRequest = async (
  payload: StoryRequestT,
  user: UserT | null
): Promise<{ success?: boolean; error?: string; request_id?: string }> => {
  try {
    const { receiver_id, request_text } = payload;

    const response = await fetch(
      `https://www.storycloudapi.com/requests/send-story-request?receiver_id=${receiver_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.jwt_token}`,
        },
        body: JSON.stringify({ request_text }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to send story request");
    }

    const data = await response.json();
    return { success: true, request_id: data.request_id };
  } catch (error) {
    console.error("Error sending story request:", error);

    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};

export const deleteStoryRequest = async (
  request_id: string,
  user: UserT | null
): Promise<{ success?: boolean; error?: string }> => {
  try {
    const response = await fetch(
      `https://www.storycloudapi.com/requests/delete-story-request?request_id=${request_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.jwt_token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to delete story request");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting story request:", error);

    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};
