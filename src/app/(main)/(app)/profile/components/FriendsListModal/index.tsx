"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React, { useEffect } from "react";
import { Loader } from "lucide-react";
import {
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import ClosePurpleIcon from "@/assets/icons/close-purple.svg";
import UserPurpleIcon from "@/assets/icons/user-purple.svg";
import { useInView } from "react-intersection-observer";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { useFetchFriends } from "./mutations";
import { FriendsListT, FriendT } from "./types";

const FriendsListModal: React.FC = () => {
  const { ref, inView } = useInView();
  const user = useSessionContext();
  const pathname = usePathname();
  const userId = pathname?.split("/").pop();

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useFetchFriends(
    user,
    user.user_id === userId || userId === "profile" || userId === undefined
      ? ""
      : userId
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // Flatten friends from paginated response
  const friends: FriendT[] =
    data?.pages.flatMap((page: FriendsListT) =>
      "items" in page ? page.items : []
    ) || [];

  return (
    <DialogContent className="bg-transparent w-full h-[88svh] lg:h-[90svh] lg:overflow-hidden sm:max-w-[640px] lg:max-h-[999px] pt-[20px] lg:pr-10 border-0 outline-none rounded-2xl">
      <DialogDescription hidden>Description goes here</DialogDescription>

      <DialogClose className="absolute z-50 p-0 rounded-full cursor-pointer top-2 right-4 outline-none w-fit lg:top-5 lg:-right-0 bg-white">
        <Image src={ClosePurpleIcon} alt="Close" className="w-6 h-6" />
      </DialogClose>
      <div className="flex flex-col items-center w-full h-full gap-2 py-6 pl-6 pr-1 mx-auto overflow-hidden text-xl bg-white shadow-md rounded-t-2xl sm:rounded-2xl lg:gap-6 lg:py-10 lg:pl-10">
        <DialogTitle className="w-full text-center pr-6 lg:pr-10">
          Friends
        </DialogTitle>
        <hr className="w-full border-spacing-1.5 border-purple-100 mr-4 lg:mr-10" />

        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <Loader fill="#6A6FD5" className="animate-spin" />
          </div>
        )}

        {error && (
          <p className="text-red-500 text-center">
            {(error as Error).message || "Failed to fetch friends."}
          </p>
        )}

        {!isLoading && !error && (
          <div className="flex flex-col w-full h-full gap-4 overflow-y-auto xl:h-fit">
            {friends.map((profile) => (
              <Link
                key={profile.friend_id}
                href={`profile/${profile.friend_id}`}
                className="flex items-center gap-3"
              >
                <Image
                  src={
                    profile.friend_profile_image
                      ? profile.friend_profile_image
                      : UserPurpleIcon
                  }
                  alt="User avatar"
                  height={88}
                  width={88}
                  className="mr-3 rounded-full w-[64px] h-[64px] sm:w-[88px] sm:h-[88px]"
                />
                <div className="flex flex-col justify-between gap-1.5 sm:gap-3">
                  <p className="text-xl font-medium font-crimson">
                    {profile.friend_user_name}
                  </p>
                  <p className="text-purple">@{profile.friend_user_handle}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {hasNextPage && (
          <div
            ref={ref}
            className="w-full flex justify-center p-10 items-center"
          >
            {isFetchingNextPage && (
              <Loader
                fill="#6A6FD5"
                className="mx-auto my-auto w-fit animate-spin"
              />
            )}
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export default FriendsListModal;
