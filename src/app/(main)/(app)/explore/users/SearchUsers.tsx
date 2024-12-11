import { Loader } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import UserProfile from "@/assets/icons/user-purple.svg";
import { UserT } from "@/shared/types";
import { SearchUsersPropsT, searchUsersT } from "./types";

const SearchUsers = ({ status, error, data, isLoading }: SearchUsersPropsT) => {
  const users: UserT[] =
    data?.pages.flatMap((page: searchUsersT) =>
      "items" in page ? page.items : []
    ) || [];

  if (status === "pending") {
    return <Loader fill="#6A6FD5" className="m-auto animate-spin" />;
  }

  if (error) {
    return <p className="text-red-500">{(error as Error).message}</p>;
  }
  return (
    <div
      className=" xl:gap-[180px] xl:gap-y-[60px] mx-auto w-fit
    grid grid-cols-1 gap-5  md:gap-x-36 md:grid-cols-2 2xl:grid-cols-3"
    >
      {users.length === 0 && !isLoading && <p>No users found</p>}

      {users.map((profile, index) => (
        <Link
          key={index}
          href={`/profile/${profile.user_id}`}
          className="flex flex-col gap-[10px] items-center"
        >
          <div className="relative lg:h-[280px] h-[160px] w-[160px] sm:w-[200px] sm:h-[200px] lg:w-[280px] aspect-[1/1]">
            {/* <Image
              src={profile.user_profile_image || UserProfile}
              alt="Profile"
              fill
              className={`rounded-full ${
                profile.user_profile_image
                  ? "object-cover"
                  : "bg-white object-fit"
              }`}
            /> */}
            <Image
              src={profile.user_profile_image || UserProfile}
              alt="Profile"
              fill
              sizes="(max-width: 768px) 160px, (max-width: 1200px) 200px, 280px"
              className={`rounded-full ${
                profile.user_profile_image
                  ? "object-cover"
                  : "bg-white object-fit"
              }`}
            />
          </div>
          <p className="font-crimson font-medium text-[20px]">
            {profile.user_name}
          </p>
          <p className="font-medium text-[16px] text-purple">
            @{profile.user_handle}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default SearchUsers;
