import { bookmarkedStoriesResponseT } from "@/app/(main)/(app)/saved/types";
import { UserT } from "@/shared/types";

export const getUserStories = async (
  userId: string,
  loggedInUser: UserT
): Promise<bookmarkedStoriesResponseT | { error: string }> => {
  const queryParams = new URLSearchParams({
    user_id: userId,
    include_audio: "false",
    include_transcript: "false",
    include_images: "true",
    include_synopsis: "false",
    only_first_image: "true",
    page_size: "10",
  });

  try {
    const response = await fetch(
      `https://storycloudapi.com/stories/list-stories?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser.jwt_token}`,
        },
      }
    );

    if (!response.ok) {
      return { error: `Error: ${response.status} ${response.statusText}` };
    }

    const data: bookmarkedStoriesResponseT = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
    return { error: "Something went wrong. Please try again." };
  }
};
