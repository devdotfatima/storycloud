"use client";
import React, { useState } from "react";
import TranscriptAndComments from "./TranscriptAndComments";
import AnswerAndStats from "./AnswerAndStats";
import { PublishAnswerPropsT } from "./types";
import UploadStoryImages from "./AnswerAndStats/UploadStoryImages";

const PublishAnswer = ({
  recorderControls,
  goToPreviousStep,
  onClose,
  story = null,
  isFreeStyle = false,
  setStory,
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

  // const handleImageSelect = (file: File | null, index: number) => {
  //   setImages((prevImages) => {
  //     const updatedImages = [...prevImages];
  //     updatedImages[index] = file;
  //     console.log(updatedImages);
  //     const filteredImages = updatedImages.filter(
  //       (img) => img !== null
  //     ) as File[];

  //     console.log(filteredImages);

  //     setStory((prev) => {
  //       if (!prev) {
  //         return null; // Ensure compatibility when the previous state is `null`
  //       }

  //       return {
  //         ...prev, // Spread the existing `prev` object to retain all properties
  //         story_images: filteredImages, // Update the `story_images` field
  //       };
  //     });

  //     return updatedImages;
  //   });
  // };

  const handleImageSelect = (file: File | null, index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = file;

      setStory((prev) => {
        if (!prev) return null;

        // Convert File array to URL Record
        const imageRecord = updatedImages.reduce((acc, file, idx) => {
          if (file) acc[`image_${idx}`] = URL.createObjectURL(file);
          return acc;
        }, {} as Record<string, string>);

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

  const toggleEditMode = () => {
    setIsEditing((prevState) => !prevState);
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
            story={story}
            onClose={onClose}
            isEditing={isEditing}
            toggleEditMode={toggleEditMode}
            recorderControls={recorderControls}
            goToPreviousStep={goToPreviousStep}
            handleShowUploadImageScreen={toggleUploadImageScreen}
          />
          <TranscriptAndComments isEditing={isEditing} story={story} />
        </>
      )}
    </div>
  );
};

export default PublishAnswer;
