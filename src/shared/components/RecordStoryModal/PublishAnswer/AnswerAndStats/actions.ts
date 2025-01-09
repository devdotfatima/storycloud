import { UserT } from "@/shared/types";

export const postReaction = async (
  user: UserT,
  story_id: string,
  reaction: string
): Promise<{ reaction: string }> => {
  const response = await fetch(
    `https://storycloudapi.com/reactions/react?story_id=${story_id}&author_id=${user.user_id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.jwt_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reaction }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to react");
  }

  return response.json();
};
