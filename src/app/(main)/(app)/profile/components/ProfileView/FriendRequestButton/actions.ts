import { UserT } from "@/shared/types";

export const sendFriendRequest = async (userId: string, user: UserT) => {
  try {
    if (!user) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `https://storycloudapi.com/relationships/send-friend-request?friend_id=${userId}`,

      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.jwt_token}`,
          Accept: "application/json",
        },
      }
    );

    return response.ok
      ? await response.json()
      : { error: "Failed to send request" };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};

export const getFriendStatus = async (friendId: string, user: UserT) => {
  try {
    if (!user) {
      throw new Error("Unauthorized");
    }

    const payload = {
      friend_ids: [friendId],
    };
    const response = await fetch(
      "https://www.storycloudapi.com/relationships/get-friend-statuses",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.jwt_token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      return await response.json();
    } else if (response.status === 404) {
      return null; // No relation exists
    } else {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch friend status");
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};
