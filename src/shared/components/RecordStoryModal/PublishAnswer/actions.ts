import { UserT } from "@/shared/types";

export const deleteStory = async (
  story_id: string,
  user: UserT
): Promise<void> => {
  const response = await fetch(
    `https://www.storycloudapi.com/stories/delete-story?story_id=${story_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.jwt_token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to delete story: ${response.statusText}`);
  }
};
