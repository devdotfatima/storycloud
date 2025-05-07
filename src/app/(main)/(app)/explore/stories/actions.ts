import { UserT, searchStoriesT } from "@/shared/types";

export const fetchStories = async (
  user: UserT|null,
  pageParam: { story_id: string } | null,
  searchTerm = ""
): Promise<searchStoriesT> => {
  if (!user) {
    throw new Error("Unauthorized");
  }

  const encodePagingKey = (key: { story_id: string }) => {
    try {
      return encodeURIComponent(JSON.stringify(key));
    } catch (e: unknown) {
      console.log(e);
      throw new Error("Failed to encode paging key");
    }
  };

  const exclusiveStartKey = pageParam
    ? `&exclusive_start_key=${encodePagingKey(pageParam)}`
    : "";

  const response = await fetch(
    `https://storycloudapi.com/get-story-feed?${
      searchTerm ? `&search_key=${searchTerm}` : ""
    }${exclusiveStartKey}&page_size=10000`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.jwt_token}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stories");
  }

  return response.json(); // Ensure this aligns with searchStoriesT type.
};
