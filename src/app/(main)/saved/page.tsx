import StoryCard from "@/shared/components/StoryCard";
import React from "react";

const Saved = () => {
  return (
    <div className="flex flex-col gap-5 py-2 px-5 md:py-10 md:gap-10 xl:gap-20 md:px-16 h-full overflow-y-auto">
      <form className="w-full mx-auto mb-2  h-11  md:mb-0 max-w-[800px]">
        <label htmlFor="default-search" className=" sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            id="default-search"
            className="block w-full h-full p-3 pr-9 outline-none ps-4 placeholder:text-grey rounded-2xl"
            placeholder={"search for stories"}
            required
          />
          <div className="absolute inset-y-0 flex items-center px-3 pointer-events-none end-0">
            <svg
              className="w-5 h-5 text-grey "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>
      </form>

      <div className="flex flex-row flex-wrap gap-10  md:gap-y-8 md:gap-x-7 lg:gap-x-20 lg:gap-y-10  mx-auto max-w-[1100px] w-full justify-center items-center 2xl:justify-between">
        {[2, 3, 4, 5].map((recipe) => (
          <StoryCard
            key={recipe}
            //  {...recipe}
          />
        ))}
      </div>
    </div>
  );
};

export default Saved;
