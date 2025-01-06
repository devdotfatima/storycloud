"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import RecordStoryModal from "@/shared/components/RecordStoryModal";
import BookImage from "@/assets/images/book.png";
import { useStoryRequests } from "../StoryRequestsProvider";
import { Loader } from "lucide-react";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { useGetStory } from "@/hooks/useGetStory";

const Freestyle = () => {
  const [isRecordStoryModalOpen, setIsRecordStoryModalOpen] = useState(false);
  const { storyRequests } = useStoryRequests();
  const user = useSessionContext();

  const openDialog = () => {
    setIsRecordStoryModalOpen(true);
  };

  const closeDialog = () => {
    setIsRecordStoryModalOpen(false);
  };
  const freestyleStoryRequest = storyRequests.filter(
    (request) =>
      request.request_id.startsWith("00000000-0000-0000-0000-000000000000") &&
      request.story_id !== null
  );

  const freestyleStory =
    freestyleStoryRequest.length > 0 ? freestyleStoryRequest[0] : undefined;

  const { data: story, isLoading: isStoryLoading } = useGetStory(
    freestyleStory?.story_id ?? "",
    user
  );

  return (
    <Dialog open={isRecordStoryModalOpen}>
      <DialogTrigger asChild>
        <div
          className="flex flex-col gap-3 lg:gap-6 md:w-1/2 cursor-pointer"
          onClick={openDialog}
        >
          <h2 className="text-purple">freestyle</h2>
          <Image
            src={BookImage}
            alt="book image"
            className="rounded-2xl h-96 w-full object-cover"
            layout="responsive"
            width={400}
            height={400}
          />
        </div>
      </DialogTrigger>
      {isRecordStoryModalOpen && !isStoryLoading ? (
        <RecordStoryModal
          onClose={closeDialog}
          isFreeStyle={true}
          freestyleStory={story}
        />
      ) : null}
      {isRecordStoryModalOpen && isStoryLoading ? (
        <DialogContent
          aria-describedby="record your story to the question "
          className={`max-h-[940px]  bg-transparent h-[100svh] w-full max-w-screen-sm ${"lg:max-w-[850px]"} sm:h-[90svh] overflow-hidden lg:pr-12 pt-[15px]`}
        >
          <DialogTitle hidden>Loading</DialogTitle>
          <Loader fill="#6A6FD5" className="mx-auto my-auto animate-spin" />
        </DialogContent>
      ) : null}
    </Dialog>
  );
};

export default Freestyle;
