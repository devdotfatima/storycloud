"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { getFriendStatus, sendFriendRequest } from "./actions";
import { usePathname } from "next/navigation";
import { useSessionContext } from "@/app/providers/SessionProvider";

const acceptFriendRequest = async (friendId: string) => {
  const response = await fetch(
    `https://storycloudapi.com/relationships/accept-friend-request?friend_id=${friendId}`,
    {
      method: "PUT",
    }
  );
  return response.ok
    ? await response.json()
    : { error: "Failed to accept request" };
};

const unfriend = async (friendId: string) => {
  const response = await fetch(
    `https://storycloudapi.com/relationships/unfriend?friend_id=${friendId}`,
    {
      method: "DELETE",
    }
  );
  return response.ok ? await response.json() : { error: "Failed to unfriend" };
};
const FriendRequestButton = () => {
  const pathname = usePathname();
  const userId = pathname?.split("/").pop();
  const user = useSessionContext();

  const [isPending, startTransition] = useTransition();
  const [, setError] = useState<string>();

  const [friendStatus, setFriendStatus] = useState<string | null>(null);

  const handleSendRequest = () => {
    setError(undefined);
    startTransition(async () => {
      try {
        await sendFriendRequest(userId || "", user);
        setFriendStatus("pending");
      } catch (err) {
        console.log(err);

        setError("Failed to send friend request");
      }
    });
  };

  const handleAcceptRequest = () => {
    startTransition(async () => {
      try {
        await acceptFriendRequest(userId || "");
        setFriendStatus("friends");
      } catch (err) {
        console.log(err);

        setError("Failed to accept friend request");
      }
    });
  };

  const handleUnfriend = () => {
    startTransition(async () => {
      try {
        await unfriend(userId || "");
        setFriendStatus(null);
      } catch (err) {
        console.log(err);

        setError("Failed to unfriend");
      }
    });
  };

  useEffect(() => {
    if (userId) {
      startTransition(async () => {
        try {
          const status = await getFriendStatus(userId, user);
          console.log(status);

          setFriendStatus(status || null);
        } catch (err) {
          console.log(err);

          setError("Failed to fetch friend status");
        }
      });
    }
  }, [userId, user]);
  // if (isFriend) {
  if (friendStatus === "friends") {
    return (
      <Select>
        <SelectTrigger className="flex text-base sm:text-xl items-center justify-between max-w-60 w-full py-[16px] sm:py-[22px] mt-2 sm:pr-3 pl-[14%] sm:pl-[68px] text-center text-grey bg-white outline-none rounded-2xl">
          <SelectValue placeholder="friends" />
        </SelectTrigger>
        <SelectContent className="w-full overflow-auto rounded-2xl border-0 h-full ring-0 focus:outline-none p-0 bg-transparent">
          <button
            className={cn(
              "relative flex w-full h-12 rounded-2xl bg-purple-400 text-white justify-center cursor-pointer select-none border-0 items-center px-10 outline-none transition-all p-0"
            )}
          >
            unfriend
          </button>
        </SelectContent>
      </Select>
    );
  }

  // if (hasSentRequest) {
  if (friendStatus === "pending") {
    return (
      <Select>
        <SelectTrigger className="flex text-base sm:text-xl items-center justify-between max-w-60 w-full py-[16px] sm:py-[22px] mt-2 sm:pr-3 pl-[10vw] sm:pl-[68px] text-center text-grey bg-white outline-none rounded-2xl">
          <SelectValue placeholder="requested" />
        </SelectTrigger>
        <SelectContent className="w-full overflow-auto rounded-2xl border-0 h-full ring-0 focus:outline-none p-0 bg-transparent">
          <button
            // onClick={handleCancelRequest}
            onClick={handleUnfriend}
            className={cn(
              "relative flex w-full h-12 rounded-2xl bg-purple-400 text-white justify-center cursor-pointer select-none border-0 items-center px-10 outline-none transition-all p-0"
            )}
          >
            cancel request
          </button>
        </SelectContent>
      </Select>
    );
  }

  if (friendStatus === "received") {
    return (
      <button
        onClick={handleAcceptRequest}
        className="py-2 mt-2 max-w-60 w-full bg-green-500 rounded-2xl text-white"
      >
        accept request
      </button>
    );
  }
  return (
    <button
      onClick={handleSendRequest}
      disabled={isPending}
      className="py-2 mt-2 max-w-60 w-full bg-white rounded-2xl text-purple disabled:cursor-not-allowed"
    >
      add friend
    </button>
  );
};

export default FriendRequestButton;
