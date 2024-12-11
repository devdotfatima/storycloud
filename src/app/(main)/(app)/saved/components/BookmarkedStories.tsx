import React from "react";
import StoryCard from "@/shared/components/StoryCard";
import { bookmarkedStoriesResponseT } from "../types";
import { StoryAnswerT } from "@/shared/types";
import { validateUser } from "@/lib/dal";

export const getBookmarkedStories = async (): Promise<
  bookmarkedStoriesResponseT | { error: string }
> => {
  try {
    const { user } = await validateUser();
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
const BookmarkedStories = async () => {
  const result = await getBookmarkedStories();

  if ("error" in result) {
    return <div className="text-red-500">Error: {result.error}</div>;
  }

  const { items: bookmarkedStories = [] } = result;
  return (
    <div className="flex flex-row flex-wrap gap-10  md:gap-y-8 md:gap-x-7 lg:gap-x-20 lg:gap-y-10  mx-auto max-w-[1100px] w-full justify-center items-center 2xl:justify-between">
      {bookmarkedStories.map((stroyAnswer: StoryAnswerT) => (
        <StoryCard key={stroyAnswer.story_id} story={stroyAnswer} />
      ))}
    </div>
  );
};

export default BookmarkedStories;
