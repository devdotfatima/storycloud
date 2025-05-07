"use client";
import React, { useState } from "react";
import TranscriptAndComments from "./TranscriptAndComments";
import AnswerAndStats from "./AnswerAndStats";
import { PublishAnswerPropsT } from "./types";
import UploadStoryImages from "./AnswerAndStats/UploadStoryImages";
import { updateStory } from "./actions";
import { useSessionContext } from "@/app/providers/SessionProvider";

const PublishAnswer = ({
  recorderControls,
  goToPreviousStep,
  onClose,
  story = null,
  isFreeStyle = false,
  setStory,
  requestText,
  requestId
}: PublishAnswerPropsT) => {
  const [isEditing, setIsEditing] = useState(false);
  
   const user = useSessionContext();
  const [isUploadImageScreenVisible, setUploadImageScreenVisibility] =
    useState(false);
  const [images, setImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [isSavingEdits, setIsSavingEdits] = useState(false);
  


  const handleImageSelect = (file: File | null, index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = file;

      setStory((prev) => {
        if (!prev) return null;

        // Convert File array to URL Record
        const imageRecord = updatedImages.reduce((acc, file, idx) => {
          if (file) acc[`image_${idx}`] =  { file, url: URL.createObjectURL(file) };
          return acc;
        }, {} as Record<string, { file: File; url: string }>)

        return {
          ...prev,
          story_images: imageRecord,
        };
      });

      return updatedImages;
    });
  };

  const toggleUploadImageScreen = () => {
    setUploadImageScreenVisibility((prevState) => !prevState);
  };


  const toggleEditMode = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setIsSavingEdits(true);

    try {
      console.log("here");
      
      const response = await updateStory(
        story?.story_id || "",
        story?.story_title || "",
        story?.story_transcript || "",
        story?.story_synopsis || "",
       user
      );

      if (response.success) {
        setIsEditing(false);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Error updating story:", error);
    }

    setIsSavingEdits(false);
  };
  return (
    <div className="w-full h-full overflow-hidden bg-white rounded-2xl  flex flex-col lg:flex-row lg:overflow-hidden [@media(max-height:760px)]:overflow-y-auto ">
      {/* Answer Section */}
      {isUploadImageScreenVisible ? (
        <UploadStoryImages
          images={images}
          setStory={setStory}
          handleImageSelect={handleImageSelect}
          onToggleUploadImageScreen={toggleUploadImageScreen}
        />
      ) : (
        <>
          <AnswerAndStats
            setStory={setStory}
            isFreeStyle={isFreeStyle}
            requestId={requestId}
            requestText={requestText}
            story={story}
            onClose={onClose}
            isSavingEdits={isSavingEdits}
            isEditing={isEditing}
            toggleEditMode={toggleEditMode}
            recorderControls={recorderControls}
            goToPreviousStep={goToPreviousStep}
            handleShowUploadImageScreen={toggleUploadImageScreen}
          />
          <TranscriptAndComments isEditing={isEditing} story={story}   setStory={setStory} />
        </>
      )}
    </div>
  );
};

export default PublishAnswer;
