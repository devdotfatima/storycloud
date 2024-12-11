import { Loader } from "lucide-react";
import React, { Suspense } from "react";
import SearchBar from "@/shared/components/SearchBar";
import BookmarkedStories from "./components/BookmarkedStories";

const Saved = async () => {
  return (
    <div className="flex flex-col gap-5 py-2 px-5 md:py-10 md:gap-10 xl:gap-20 md:px-16 h-full overflow-y-auto">
      <SearchBar placeholder="stories" />

      <Suspense
        fallback={
          <Loader fill="#6A6FD5" className="mx-auto my-auto animate-spin" />
        }
      >
        <BookmarkedStories />
      </Suspense>
    </div>
  );
};

export default Saved;
