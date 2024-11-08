"use client";
import React, { useState } from "react";
import TranscriptAndComments from "./TranscriptAndComments";
import AnswerAndStats from "./AnswerAndStats";
import { PublishAnswerPropsT } from "./types";
import UploadStoryImages from "./AnswerAndStats/UploadStoryImages";

const PublishAnswer = ({
  recorderControls,
  goToPreviousStep,
}: PublishAnswerPropsT) => {
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

  const toggleEditMode = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <div className="w-full h-full overflow-hidden bg-white rounded-2xl  flex flex-col lg:flex-row lg:overflow-hidden ">
      {/* Answer Section */}
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
            recorderControls={recorderControls}
            goToPreviousStep={goToPreviousStep}
            handleShowUploadImageScreen={toggleUploadImageScreen}
          />
          <TranscriptAndComments isEditing={isEditing} />
        </>
      )}
    </div>
  );
};

export default PublishAnswer;
