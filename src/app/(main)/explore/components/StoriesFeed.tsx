import React from "react";
import StoryCard from "@/shared/components/StoryCard";
import { StoryAnswerT, UserT } from "@/shared/types";
import { bookmarkedStoriesResponseT } from "../../saved/types";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

export const getFeedStories = async (
  user: UserT | null
): Promise<bookmarkedStoriesResponseT | { error: string }> => {
  try {
    if (!user) {
      return { error: "Unauthorized" };
    }
    const response = await fetch(
      "https://storycloudapi.com/bookmarks/get-bookmarked-stories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt_token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "API response error:",
        response.status,
        response.statusText
      );
      return { error: "Something went wrong." };
    }

    const data: bookmarkedStoriesResponseT = await response.json();

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};

const StoriesFeed = () => {
  const user = useSessionContext();

  const { data, error, isLoading } = useQuery({
    queryKey: ["feedStories"],
    queryFn: () => getFeedStories(user),
  });
  if (isLoading) {
    return <Loader fill="#6A6FD5" className="mx-auto my-auto animate-spin" />;
  }

  if (error || (data && (data as { error: string }).error)) {
    return (
      <div className="text-red-500">
        Error: {(data as { error: string }).error}
      </div>
    );
  }
  const { items: stories } = data as bookmarkedStoriesResponseT;
  return (
    <div className="flex flex-row flex-wrap gap-10  md:gap-y-8 md:gap-x-7 lg:gap-x-20 lg:gap-y-10  mx-auto max-w-[1100px] w-full justify-center items-center 2xl:justify-between">
      {stories.map((story: StoryAnswerT) => (
        <StoryCard key={story.story_id} story={story} />
      ))}
    </div>
  );
};

export default StoriesFeed;
