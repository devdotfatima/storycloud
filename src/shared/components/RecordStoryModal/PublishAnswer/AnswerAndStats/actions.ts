import { UserT } from "@/shared/types";

export const postReaction = async (
  user: UserT,
  story_id: string,
  reaction: string
): Promise<{ reaction: string }> => {
  // Ensure the reaction is sent as a Unicode escape sequence
  const escapedReaction = JSON.stringify(reaction).slice(1, -1); // "\\u2764\\uFE0F"

  // Log to verify
  console.log("Reaction sent to API:", escapedReaction); // Should log \\u2764\\uFE0F

  const response = await fetch(
    `https://storycloudapi.com/reactions/react?story_id=${story_id}&author_id=${user.user_id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.jwt_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reaction: "\\u2764\\ufe0f" }), // Send the escaped reaction
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to react");
  }

  return response.json();
};
