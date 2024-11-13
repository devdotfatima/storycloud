import SearchBar from "@/shared/components/SearchBar";
import StoryCard from "@/shared/components/StoryCard";
import { mockStories } from "@/shared/consts";
import { mockStoryT } from "@/shared/types";
import React from "react";

const Stories = () => {
  return (
    <div className="flex flex-col gap-5 sm:gap-7 md:gap-10 xl:gap-16 md:px-16 py">
      <SearchBar placeholder="stories" />

      <div className="flex flex-row flex-wrap gap-10  md:gap-y-8 md:gap-x-7 lg:gap-x-20 lg:gap-y-10  mx-auto max-w-[1100px] w-full justify-center items-center 2xl:justify-between">
        {mockStories.map((story: mockStoryT) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default Stories;
