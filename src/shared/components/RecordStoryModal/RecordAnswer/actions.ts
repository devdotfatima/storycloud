import { StoryCreationT } from "@/lib/validations";
import { UserT } from "@/shared/types";

export const createStory = async (
  payload: StoryCreationT,
  user: UserT|null,
  requestId?: string | null 
): Promise<{ success?: boolean; error?: string }> => {
  try {
    const formData = new FormData();
    formData.append("audio", payload.audio);

      const queryString = requestId ? `?request_id=${encodeURIComponent(requestId)}` : "";

    const response = await fetch(
       `https://www.storycloudapi.com/stories/create-story${queryString}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.jwt_token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);

      throw new Error(errorData.error || "Failed to create story");
    }

    const data = await response.json();
    console.log(data);

    return { success: true, ...data };
  } catch (error) {
    console.error("Error creating story:", error);

    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};
