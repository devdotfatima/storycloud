import Image from "next/image";
import Link from "next/link";
import React from "react";

const Users = () => {
  return (
    <div className="flex flex-col gap-5  px-5  md:gap-10 xl:gap-16 md:px-16">
      <form className="w-full mx-auto   h-11  md:mb-0 max-w-[800px]">
        <label htmlFor="default-search" className=" sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            id="default-search"
            className="block w-full h-full p-3 pr-9 outline-none ps-4 placeholder:text-grey rounded-2xl"
            placeholder={"search for users"}
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
      <div
        className=" xl:gap-[180px] xl:gap-y-[60px] mx-auto w-fit
    grid grid-cols-1 gap-5  md:gap-10 md:grid-cols-3
    "
      >
        {Array.from({ length: 14 }, (_, index) => (
          <Link
            key={index}
            href={`/profile/${index}`}
            className="flex flex-col gap-[10px] items-center"
          >
            <Image
              src={"/profile_image.png"}
              alt="Profile"
              height={280}
              width={280}
              className="rounded-full w-[160px] md:w-[280px]"
            />
            <p className="font-crimson font-medium text-[20px]">Lauren Li</p>
            <p className="  font-medium text-[16px] text-purple">@lauren_li</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Users;
