import { UserT } from "@/shared/types";

// Delete Story
export const deleteStory = async (
  story_id: string,
  user: UserT
): Promise<void> => {
  const response = await fetch(
    `https://storycloudapi.com/stories/delete-story?story_id=${story_id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.jwt_token}`,
      },
    }
  );
  console.log(response);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete the story");
  }
};

// Report Story
export const reportStory = async (
  story_id: string,
  story_user_id: string,
  report_reason: string,
  user: UserT
): Promise<void> => {
  const response = await fetch(
    `https://storycloudapi.com/stories/report_story?story_id=${story_id}&story_user_id=${story_user_id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.jwt_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ report_reason }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to report the story");
  }
};
