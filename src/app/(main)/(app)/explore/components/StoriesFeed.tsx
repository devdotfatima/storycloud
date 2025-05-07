"use client"
import React from "react";
import StoryCard from "@/shared/components/StoryCard";
import { searchStoriesT, StoryAnswerT } from "@/shared/types";
import { Loader } from "lucide-react";

type StoriesFeedPropsT = {
  error: unknown;
  data?: { pages: searchStoriesT[]; pageParams: unknown[] } | { error: string };
  isLoading: boolean;
};
const StoriesFeed = ({ error, data, isLoading }: StoriesFeedPropsT) => {
  if (isLoading) {
    return <Loader fill="#6A6FD5" className="mx-auto my-auto animate-spin" />;
  }

  // Check if `data` is an error response
  if (error || (data && "error" in data)) {
    return (
      <div className="text-red-500">
        Error: {data && "error" in data ? data.error : "Something went wrong"}
      </div>
    );
  }

  const stories: StoryAnswerT[] =
    data && "pages" in data
      ? data.pages.flatMap((page) => (page.stories ? page.stories : []))
      : [];

  return (
    <div className="flex flex-wrap gap-10 md:gap-y-8 md:gap-x-7 lg:gap-x-20 lg:gap-y-10 mx-auto max-w-[1100px] w-full justify-center items-center 2xl:justify-between">
      {stories.map((story) => (
        <StoryCard key={story.story_id} story={story} />
      ))}
    </div>
  );
};

export default StoriesFeed;
