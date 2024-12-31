"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from "@/shared/components/ui/dialog";
import { StoryRequestModalPropsT } from "./types";
import ClosePurpleIcon from "@/assets/icons/close-purple.svg";
import SuggestionList from "./SuggestionList";
import RequestStoryForm from "./RequestStoryForm";
import StoryRequestSentModal from "./StoryRequestSentModal";

const StoryRequestModal = ({ isFriend }: StoryRequestModalPropsT) => {
  const [isStoryRequestModalOpen, setStoryRequestModalOpen] = useState(false);
  const [isStorySentModalOpen, setStorySentModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCloseModals = () => {
    setStoryRequestModalOpen(false);
    setStorySentModalOpen(false);
  };
  const onSend = () => setStorySentModalOpen(true);
  const handleDialogChange = (isOpen: boolean) => {
    setStoryRequestModalOpen(isOpen);
    if (!isOpen) {
      // Reset state when dialog closes
      setInputValue("");
      setStorySentModalOpen(false);
    }
  };
  return (
    <Dialog open={isStoryRequestModalOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild disabled={!isFriend}>
        <button
          className={`${
            isFriend
              ? "text-purple pointer-events-auto "
              : " text-grey pointer-events-none"
          }" py-1.5 sm:py-2 mt-2 w-full   sm:max-w-60 bg-white rounded-2xl"`}
        >
          request story
        </button>
      </DialogTrigger>
      <DialogContent className="bg-transparent w-full  h-[100svh] sm:h-[90svh]  lg:overflow-hidden sm:max-w-[600px] lg:max-h-[600px]  pt-[20px] lg:pr-10 border-0 outline-none rounded-2xl ">
        <DialogClose className="absolute z-50 p-0 rounded-full cursor-pointer top-2 right-4 outline-none  w-fit lg:top-5 lg:-right-0 bg-white">
          <Image
            src={ClosePurpleIcon}
            alt="Close modal"
            className="w-6 h-6"
            width={24}
            height={24}
          />
        </DialogClose>
        <div className="flex flex-col items-center w-full h-full  py-6  px-5 sm:px-10 mx-auto overflow-hidden bg-white shadow-md rounded-t-2xl sm:rounded-2xl gap-5 lg:gap-7 lg:py-10  ">
          <DialogTitle className="text-purple ">request a story</DialogTitle>
          <RequestStoryForm
            handleInputChange={handleInputChange}
            inputValue={inputValue}
            onSend={onSend}
          />

          <h3 className="text-purple">suggestions</h3>
          <SuggestionList />
        </div>
      </DialogContent>
      {isStorySentModalOpen && (
        <StoryRequestSentModal
          storyRequest={inputValue}
          onClose={handleCloseModals}
        />
      )}
    </Dialog>
  );
};

export default StoryRequestModal;
