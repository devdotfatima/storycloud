"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ClosePurpleIcon from "../../../../../assets/icons/close-purple.svg";
import AnswerAndStats from "@/shared/components/RecordStoryModal/PublishAnswer/AnswerAndStats";
import TranscriptAndComments from "@/shared/components/RecordStoryModal/PublishAnswer/TranscriptAndComments";
import UploadStoryImages from "@/shared/components/RecordStoryModal/PublishAnswer/AnswerAndStats/UploadStoryImages";

const Story = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [isUploadImageScreenVisible, setUploadImageScreenVisibility] =
    useState(false);
  const [images, setImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const handleImageSelect = (file: File | null, index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = file;
      return updatedImages;
    });
  };

  const toggleUploadImageScreen = () => {
    setUploadImageScreenVisibility((prevState) => !prevState);
  };
  const [isOpen, setIsOpen] = React.useState(true);

  const router = useRouter();
  const handleOnClose = () => {
    router.back();
    setIsOpen(false);
  };

  const toggleEditMode = () => {
    setIsEditing((prevState) => !prevState);
  };
  return (
    <Dialog open={isOpen}>
      <DialogOverlay onClick={handleOnClose}>
        <DialogContent
          onClick={(e) => e.stopPropagation()}
          className={`max-h-[940px] bg-transparent h-[100svh] w-full max-w-screen-sm lg:max-w-[1200px] sm:h-[90svh] overflow-hidden lg:pr-12 pt-[20px]`}
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
          <div className="w-full h-full overflow-hidden bg-white rounded-2xl  flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden custom-h760-w1024:overflow-y-auto">
            <DialogTitle className="hidden">Story</DialogTitle>

            {isUploadImageScreenVisible ? (
              <UploadStoryImages
                images={images}
                handleImageSelect={handleImageSelect}
                onToggleUploadImageScreen={toggleUploadImageScreen}
              />
            ) : (
              <>
                <AnswerAndStats
                  isEditing={isEditing}
                  toggleEditMode={toggleEditMode}
                  handleShowUploadImageScreen={toggleUploadImageScreen}
                />

                <TranscriptAndComments isEditing={isEditing} />
              </>
            )}
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default Story;
