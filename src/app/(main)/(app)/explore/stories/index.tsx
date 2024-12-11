import React from "react";
import SearchBar from "@/shared/components/SearchBar";
import StoriesFeed from "../components/StoriesFeed";

const Stories = () => {
  return (
    <div className="flex flex-col gap-5 sm:gap-7 md:gap-10 xl:gap-16 md:px-16 py">
      <SearchBar placeholder="stories" />

      <StoriesFeed />
    </div>
  );
};

export default Stories;
