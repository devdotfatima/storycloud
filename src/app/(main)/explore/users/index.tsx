import SearchBar from "@/shared/components/SearchBar";
import { profiles } from "@/shared/consts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Users = () => {
  return (
    <div className="flex flex-col gap-5 sm:gap-7 md:gap-10 xl:gap-16 md:px-16">
      <SearchBar placeholder="users" />

      <div
        className=" xl:gap-[180px] xl:gap-y-[60px] mx-auto w-fit
    grid grid-cols-1 gap-5  md:gap-x-36 md:grid-cols-2 2xl:grid-cols-3
    "
      >
        {profiles.map((profile, index) => (
          <Link
            key={index}
            href={`/profile/${profile.userHandle}`}
            className="flex flex-col gap-[10px] items-center"
          >
            <div
              className="relative  lg:h-[280px] h-[160px] w-[160px] sm:w-[200px] sm:h-[200px] lg:w-[280px] aspect-[1/1] 
            "
            >
              <Image
                src={profile.profileImage}
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <p className="font-crimson font-medium text-[20px]">
              {profile.userName}
            </p>
            <p className="  font-medium text-[16px] text-purple">
              @{profile.userHandle}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Users;
