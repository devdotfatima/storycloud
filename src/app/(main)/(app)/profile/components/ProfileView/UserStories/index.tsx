"use client";

import React from "react";
import { Loader } from "lucide-react";
import StoryCard from "@/shared/components/StoryCard";
import { getUserStories } from "./actions";
import { useQuery } from "@tanstack/react-query";
import { UserStoriesPropsT } from "../../../types";
import { bookmarkedStoriesResponseT } from "@/app/(main)/(app)/saved/types";

const UserStories: React.FC<UserStoriesPropsT> = ({ userId, loggedInUser }) => {
  const { data, error, isLoading } = useQuery<
    bookmarkedStoriesResponseT | { error: string }
  >({
    queryKey: ["userStories", userId, loggedInUser],
    queryFn: () => getUserStories(userId, loggedInUser),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-purple" />
      </div>
    );
  }

  if (!data || "error" in data) {
    const errorMessage = error instanceof Error ? error.message : data?.error;
    return <div className="text-red-500">Error: {errorMessage}</div>;
  }

  const { items: userStories } = data;

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-20 max-w-[1100px] w-full h-fit lg:grid-cols-2">
      {userStories.map((story) => (
        <div
          className="mx-auto justify-center items-center flex w-full"
          key={story.story_id}
        >
          <StoryCard story={story} />
        </div>
      ))}
    </div>
  );
};

export default UserStories;
