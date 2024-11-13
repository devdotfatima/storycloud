import React from "react";
import { SearchBarPropsT } from "./types";

const SearchBar = ({ placeholder }: SearchBarPropsT) => {
  return (
    <form className="w-full mx-auto mb-2  h-11  md:mb-0 max-w-[800px]">
      <label htmlFor="default-search" className=" sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <input
          type="text"
          id="default-search"
          className="block w-full h-full sm:py-2 pr-9 outline-none ps-4 rounded-2xl"
          placeholder={`search for ${placeholder}`}
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
  );
};

export default SearchBar;
