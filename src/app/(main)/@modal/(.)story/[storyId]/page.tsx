"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import ClosePurpleIcon from "../../../../../assets/icons/close-purple.svg";
import { StoryDetailsProps } from "../type";
import PublishAnswer from "@/shared/components/RecordStoryModal/PublishAnswer";

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
    <Dialog open={isOpen}>
      <DialogOverlay onClick={handleOnClose}>
        <DialogContent
          onClick={(e) => e.stopPropagation()}
          className={`max-h-[1000px] bg-transparent h-[100svh] w-full max-w-screen-sm  lg:max-w-[1200px] sm:h-[90svh] overflow-hidden lg:pr-12 pt-[20px]`}
        >
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
          <PublishAnswer />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default Story;
