import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import UserProfile from "../../../../assets/icons/user-purple.svg";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { UserT } from "@/shared/types";
import { Loader } from "lucide-react";

export type searchUsersT = {
  items: UserT[];
  exclusive_start_key?: string;
};

// Fetch function to get users from the API
const fetchUsers = async (
  user: UserT,
  pageKey?: string
): Promise<searchUsersT | { error: string }> => {
  if (!user) {
    return { error: "Unauthorized" };
  }
  const response = await fetch(
    `https://storycloudapi.com/users/search-users?page_size=10${
      pageKey ? `&exclusive_start_key=${pageKey}` : ""
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.jwt_token}`,
        Accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await response.json();

  console.log(data);

  return data;
};

const SearchUsers = () => {
  const user = useSessionContext();
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(user),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      "exclusive_start_key" in lastPage ? lastPage.exclusive_start_key : null,
  });

  if (status === "pending") {
    return <Loader fill="#6A6FD5" className="m-auto animate-spin" />;
  }

  if (error) {
    return <p className="text-red-500">{(error as Error).message}</p>;
  }

  const users: UserT[] =
    data?.pages.flatMap((page) => ("items" in page ? page.items : [])) || [];

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
            <Image
              src={profile.user_profile_image || UserProfile}
              alt="Profile"
              fill
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

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-5 text-white bg-blue-500 px-4 py-2 rounded"
        >
          {isFetchingNextPage ? "Loading More..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default SearchUsers;
