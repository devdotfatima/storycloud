"use client";
import { cn } from "@/lib/utils";
import React from "react";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { acceptFriendRequest, sendFriendRequest, unfriend } from "./actions";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { FriendRequestButtonPropsT } from "../../../types";
import { useMutation } from "@tanstack/react-query";

const FriendRequestButton = ({
  friendStatus,
  userId,
  setFriendStatus,
  refetchUserData,
}: FriendRequestButtonPropsT) => {
  const user = useSessionContext();

  const { mutate: sendRequest, isPending: isSending } = useMutation({
    mutationFn: () => sendFriendRequest(userId, user),
    onMutate: async () => {
      const previousState = friendStatus;
      setFriendStatus("pending");
      return { previousState };
    },
    onError: (error, variables, context) => {
      console.error("error", error);
      setFriendStatus(context?.previousState);
    },
    onSettled: () => {
      refetchUserData?.();
    },
  });

  const { mutate: acceptRequest, isPending: isAccepting } = useMutation({
    mutationFn: () => acceptFriendRequest(userId, user),
    onMutate: async () => {
      const previousState = friendStatus;
      setFriendStatus("accepted");
      return { previousState };
    },
    onError: (error, variables, context) => {
      console.error("error", error);

      setFriendStatus(context?.previousState);
    },
    onSettled: () => {
      refetchUserData?.();
    },
  });

  const { mutate: unfriendUser, isPending: isUnfriending } = useMutation({
    mutationFn: () => unfriend(userId, user),
    onMutate: async () => {
      const previousState = friendStatus;
      setFriendStatus("stranger");
      return { previousState };
    },
    onError: (error, variables, context) => {
      setFriendStatus(context?.previousState);
    },
    onSettled: () => {
      refetchUserData?.();
    },
  });

  

  if (friendStatus === "accepted") {
    return (
      <Select>
        <SelectTrigger className="flex text-base sm:text-xl items-center justify-between max-w-60 w-full py-[16px] sm:py-[22px] mt-2 sm:pr-3 pl-[14%] sm:pl-[68px] text-center text-grey bg-white outline-none rounded-2xl">
          <SelectValue placeholder="friends" />
        </SelectTrigger>
        <SelectContent className="w-full overflow-auto rounded-2xl border-0 h-full ring-0 focus:outline-none p-0 bg-transparent">
          <button
            onClick={() => unfriendUser()}
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
        <SelectTrigger className="flex text-base sm:text-xl items-center justify-between max-w-60 w-full py-[16px] sm:py-[22px] mt-2 sm:pr-3 pl-[10vw] sm:pl-[68px] text-center text-grey border-0 bg-white outline-none rounded-2xl">
          <SelectValue placeholder="requested" />
        </SelectTrigger>
        <SelectContent className="w-full overflow-auto rounded-2xl border-0 h-full ring-0 focus:outline-none p-0 bg-transparent">
          <button
            onClick={() => unfriendUser()}
            disabled={isUnfriending}
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

  if (friendStatus === "awaiting_your_response") {
    return (
      <Select>
        <SelectTrigger className="flex text-base sm:text-xl items-center justify-between max-w-60 w-full py-[16px] sm:py-[22px] mt-2 sm:pr-3 pl-[15vw] sm:pl-[78px] border-none text-center shadow-none text-grey bg-white outline-none rounded-2xl">
          <SelectValue placeholder="respond" />
        </SelectTrigger>
        <SelectContent className="w-full overflow-auto rounded-2xl border-0 h-full ring-0 focus:outline-none p-0 bg-transparent">
          <button
            // onClick={handleAcceptRequest}
            onClick={() => acceptRequest()}
            disabled={isAccepting}
            className={cn(
              "relative flex w-full h-12 rounded-2xl bg-green-100 text-green justify-center cursor-pointer select-none border-0 items-center px-10 outline-none transition-all p-0"
            )}
          >
            accept request
          </button>
          <button
            // onClick={handleUnfriend}
            onClick={() => unfriendUser()}
            disabled={isUnfriending}
            className={cn(
              "relative flex w-full h-12 rounded-2xl mt-2 bg-red-100 text-red justify-center cursor-pointer select-none border-0 items-center px-10 outline-none transition-all p-0"
            )}
          >
            cancel request
          </button>
        </SelectContent>
      </Select>
    );
  }
  return (
    <button
      onClick={() => sendRequest()}
      disabled={isSending}
      // onClick={handleSendRequest}
      // disabled={isPending}
      className="py-2 mt-2 max-w-60 w-full bg-white rounded-2xl text-purple disabled:cursor-progress"
    >
      add friend
    </button>
  );
};

export default FriendRequestButton;
