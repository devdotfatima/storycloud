import SearchBar from "@/shared/components/SearchBar";
import StoryCard from "@/shared/components/StoryCard";
import { mockStories } from "@/shared/consts";
import React from "react";

const Saved = () => {
  return (
    <div className="flex flex-col gap-5 py-2 px-5 md:py-10 md:gap-10 xl:gap-20 md:px-16 h-full overflow-y-auto">
      <SearchBar placeholder="stories" />

      <div className="flex flex-row flex-wrap gap-10  md:gap-y-8 md:gap-x-7 lg:gap-x-20 lg:gap-y-10  mx-auto max-w-[1100px] w-full justify-center items-center 2xl:justify-between">
        {mockStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default Saved;
