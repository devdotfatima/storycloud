"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import ClosePurpleIcon from "../../../../../assets/icons/close-purple.svg";
import { StoryDetailsProps } from "../type";

const Story = ({ params }: StoryDetailsProps) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const router = useRouter();
  const handleOnClose = () => {
    router.back();
    setIsOpen(false);
  };
  const { storyId } = params;
  console.log({ storyId });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-transparent w-full  h-[100svh] sm:h-[90svh]  lg:overflow-hidden sm:max-w-[600px] lg:max-h-[600px]  pt-[20px] lg:pr-10 border-0 outline-none rounded-2xl ">
        <DialogClose
          onClick={handleOnClose}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Story;
