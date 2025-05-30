"use client";
import React, { useEffect, useState } from "react";
import AnswerAndStats from "@/shared/components/RecordStoryModal/PublishAnswer/AnswerAndStats";
import TranscriptAndComments from "@/shared/components/RecordStoryModal/PublishAnswer/TranscriptAndComments";
import UploadStoryImages from "@/shared/components/RecordStoryModal/PublishAnswer/AnswerAndStats/UploadStoryImages";
import { useParams } from "next/navigation";
import { StoryAnswerT } from "@/shared/types";
import { Loader } from "lucide-react";
import { useGetStory } from "@/hooks/useGetStory";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { useUpdateStory } from "@/shared/components/RecordStoryModal/PublishAnswer/mutations";

const Story = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadImageScreenVisible, setUploadImageScreenVisibility] =
    useState(false);
  const { storyId, userId } = useParams();
  const id = typeof storyId === "string" ? storyId : "";
  const user = useSessionContext();
  const { data: story, isLoading: isStoryLoading } = useGetStory(
    id ?? "",
    // user,
    typeof userId === "string" ? userId : ""
  );
  const [, setstory] = useState<StoryAnswerT | null>(
    story ? story : null
  );
  const [images, setImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);

   const { mutateAsync: updateStoryMutation, isPending: isUpdating } = useUpdateStory();
    const [currentStory, setStory] = useState<StoryAnswerT | null>(
       story ? story : null
     );
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



  const toggleEditMode = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      const response = await updateStoryMutation({
        story_id: currentStory?.story_id || "",
        title: currentStory?.story_title || "",
        images: currentStory?.story_images || {},
        transcript: currentStory?.story_transcript !== story?.story_transcript ? currentStory?.story_transcript || "" : null,
        synopsis: currentStory?.story_synopsis || "",
        user,
      });

      if (response.success) {
        setIsEditing(false);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Error updating story:", error);
    }
  };

    useEffect(() => {
      if (story) {
        setStory(story);
      }
    }, [story]);
  if (isStoryLoading) {
    return (
      <div className="bg-purple-400 pb-36 sm:pb-[140px] md:pb-10 md:p-10 w-full min-h-screen h-full overflow-hidden ">
        <Loader fill="#6A6FD5" className="mx-auto my-auto animate-spin" />
      </div>
    );
  }
  return (
    <div className="bg-purple-400 pb-36 sm:pb-[140px] md:pb-10 md:p-10 w-full min-h-screen h-full overflow-hidden ">
      {isUploadImageScreenVisible ? (
        <UploadStoryImages
          setStory={setstory}
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
            setStory={setStory}
            isEditing={isEditing}
            toggleEditMode={toggleEditMode}
            handleShowUploadImageScreen={toggleUploadImageScreen}
            story={story}
            isSavingEdits={isUpdating}
            requestId={null}
            requestText={null}
          />
          <TranscriptAndComments story={story} isEditing={isEditing} setStory={setStory}  />
        </div>
      )}
    </div>
  );
};

export default Story;
