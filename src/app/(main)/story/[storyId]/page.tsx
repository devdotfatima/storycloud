"use client";
import React, { useState } from "react";
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

  const toggleUploadImageScreen = () => {
    setUploadImageScreenVisibility((prevState) => !prevState);
  };

  const handleImageSelect = (file: File | null, index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = file;
      return updatedImages;
    });
  };
  const toggleEditMode = () => {
    setIsEditing((prevState) => !prevState);
  };
  return (
    <div className="bg-purple-400 pb-36 sm:pb-[140px] md:pb-10 md:p-10 w-full min-h-screen h-full overflow-hidden ">
      {isUploadImageScreenVisible ? (
        <UploadStoryImages
          images={images}
          handleImageSelect={handleImageSelect}
          onToggleUploadImageScreen={toggleUploadImageScreen}
        />
      ) : (
        // <div
        //   className={`h-screen max-h-fit lg:max-h-[940px] bg-transparent w-full max-w-screen-sm  lg:max-w-[1200px]  overflow-hidden  mx-auto lg:h-full overflow-y-auto lg:overflow-hidden bg-white sm:rounded-2xl  flex flex-col lg:flex-row  custom-h760-w1024:overflow-y-auto `}
        // >
        <div className="w-full h-full md:max-w-screen-sm mx-auto overflow-hidden bg-white flex flex-col lg:flex-row md:rounded-2xl overflow-y-auto lg:overflow-hidden custom-h760-w1024:overflow-y-auto lg:max-w-[1200px]">
          <AnswerAndStats
            isEditing={isEditing}
            toggleEditMode={toggleEditMode}
            handleShowUploadImageScreen={toggleUploadImageScreen}
          />
          <TranscriptAndComments isEditing={isEditing} />
        </div>
      )}
    </div>
  );
};

export default Story;
