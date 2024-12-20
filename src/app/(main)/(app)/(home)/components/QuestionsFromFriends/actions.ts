import { validateUser } from "@/lib/dal";
import { StoryRequestsResponseT } from "../../types";

export const getStoryRequestsFromFriends = async (): Promise<
  StoryRequestsResponseT | { error: string }
> => {
  try {
    const { user } = await validateUser();
    if (!user) {
      return { error: "Unauthorized" };
    }
    const response = await fetch(
      "https://www.storycloudapi.com/requests/list-story-requests",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt_token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("API response error:", response);
      return { error: "Something went wrong." };
    }

    const data: StoryRequestsResponseT = await response.json();
    console.log("Story requests data:", data);

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};
