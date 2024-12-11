"use client";
import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

type Props = { isFriend: boolean };

const FriendRequestButton = ({ isFriend }: Props) => {
  const [hasSentRequest, setHasSentRequest] = useState(false);
  const handleCancelRequest = useCallback(() => {
    setHasSentRequest(false);
  }, [setHasSentRequest]);

  const handleSendRequest = useCallback(() => {
    setHasSentRequest(true);
  }, [setHasSentRequest]);

  if (isFriend) {
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

  if (hasSentRequest) {
    return (
      <Select>
        <SelectTrigger className="flex text-base sm:text-xl items-center justify-between max-w-60 w-full py-[16px] sm:py-[22px] mt-2 sm:pr-3 pl-[10vw] sm:pl-[68px] text-center text-grey bg-white outline-none rounded-2xl">
          <SelectValue placeholder="requested" />
        </SelectTrigger>
        <SelectContent className="w-full overflow-auto rounded-2xl border-0 h-full ring-0 focus:outline-none p-0 bg-transparent">
          <button
            onClick={handleCancelRequest}
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

  return (
    <button
      onClick={handleSendRequest}
      className="py-2 mt-2 max-w-60 w-full bg-white rounded-2xl text-purple"
    >
      add friend
    </button>
  );
};

export default FriendRequestButton;
