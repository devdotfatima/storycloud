"use server";
import React from "react";
import StoryCard from "@/shared/components/StoryCard";
import { bookmarkedStoriesResponseT } from "@/app/(main)/saved/types";
import { validateUser } from "@/lib/dal";

type Props = { userId: string };

export const getUserStories = async (
  userId: string
): Promise<bookmarkedStoriesResponseT | { error: string }> => {
  const queryParams = new URLSearchParams({
    user_id: userId, // Use userId if available, otherwise use the logged-in user's ID
    include_audio: "false",
    include_transcript: "false",
    include_images: "true",
    include_synopsis: "false",
    only_first_image: "true",
    page_size: "10",
  });
  console.log(
    `https://storycloudapi.com/stories/list-stories?${queryParams.toString()}`
  );

  try {
    const { user } = await validateUser();
    if (!user) {
      return { error: "Unauthorized" };
    }
    const response = await fetch(
      `https://storycloudapi.com/stories/list-stories?${queryParams.toString()}`,
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

const UserStories = async ({ userId }: Props) => {
  const result = await getUserStories(userId);

  if ("error" in result) {
    return <div className="text-red-500">Error: {result.error}</div>;
  }

  const { items: userStories = [] } = result;

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-20 max-w-[1100px] w-full h-fit lg:grid-cols-2">
      {userStories.map((story, index) => (
        <div
          className="mx-auto justify-center items-center flex w-full"
          key={index}
        >
          <StoryCard story={story} />
        </div>
      ))}
    </div>
  );
};

export default UserStories;
