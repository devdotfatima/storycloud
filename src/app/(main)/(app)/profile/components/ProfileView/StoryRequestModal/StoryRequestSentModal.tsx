"use client";

import React, { useTransition } from "react";
import Image from "next/image";
import {
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import ClosePurpleIcon from "@/assets/icons/close-purple.svg";
import StorySentIcon from "@/assets/images/story_sent.png";
import { StoryRequestSentPropsT } from "./types";
import { deleteStoryRequest } from "./actions";
import { useSessionContext } from "@/app/providers/SessionProvider";
import LoadingButton from "@/shared/components/LoadingButton";

const StoryRequestSentModal = ({
  onClose,
  requestId,
  storyRequest,
}: StoryRequestSentPropsT) => {
  const user = useSessionContext();
  const [isPending, startTransition] = useTransition();

  const handleUnsend = async () => {
    if (!requestId) return;
    startTransition(async () => {
      const response = await deleteStoryRequest(requestId, user);
      if (response.success) {
        onClose();
      } else {
        console.error("Failed to unsend story request:", response.error);
      }
    });
  };
  return (
    <DialogContent className="bg-transparent w-full  h-[100svh] sm:h-[90svh]  lg:overflow-hidden sm:max-w-[600px] lg:max-h-[600px]  pt-[20px] lg:pr-10 border-0 outline-none rounded-2xl ">
      <DialogClose
        onClick={onClose}
        className="absolute z-50 p-0 rounded-full cursor-pointer top-2 right-4 outline-none  w-fit lg:top-5 lg:-right-0 bg-white"
      >
        <Image
          src={ClosePurpleIcon}
          alt="Close modal"
          className="w-6 h-6"
          width={24}
          height={24}
        />
      </DialogClose>
      <div className="flex flex-col items-center w-full h-full  py-6  px-5 sm:px-10 mx-auto overflow-hidden bg-white shadow-md rounded-t-2xl sm:rounded-2xl gap-5 lg:gap-7 lg:py-10 justify-between  ">
        <DialogTitle className="text-purple ">
          your story has been sent!
        </DialogTitle>

        <p className="bg-purple-100 text-purple h-16 sm:min-h-20 px-5 rounded-xl flex items-center w-full justify-center ">
          {storyRequest}
        </p>

        <h3 className="">
          you’ll be notified when the user answers your question
        </h3>
        <div className="h-full flex items-center ">
          <Image
            src={StorySentIcon}
            width={237}
            height={160}
            alt="story has been sent"
            className="mt-5 h-32 w-44 md:min-w-60 md:min-h-40 "
          />
        </div>

        {/* <section className="flex flex-col  items-center gap-7 w-full overflow-y-auto pr-1"> */}
        <footer className="flex   gap-6 sm:gap-10 w-full self-end  justify-between mt-auto ">
          <LoadingButton
            loading={isPending}
            disabled={isPending}
            className="bg-red-100 text-red w-full h-11 hover:bg-red hover:text-red-100"
            onClick={handleUnsend}
          >
            unsend
          </LoadingButton>
          <button
            onClick={onClose}
            className="bg-purple-100 text-purple w-full h-11"
          >
            done
          </button>
        </footer>
      </div>
    </DialogContent>
  );
};

export default StoryRequestSentModal;
