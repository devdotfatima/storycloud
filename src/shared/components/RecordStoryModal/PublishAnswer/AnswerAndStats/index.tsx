"use client";
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnswerAndStatsPropsT } from "../types";
import ProfileImage from "@/assets/images/profile_image.png";
import MessageIcon from "@/assets/icons/message.svg";
import UploadIcon from "@/assets/icons/image_file_input.svg";
import ArrowIcon from "@/assets/icons/arrow-red.svg";
import OptionsModal from "./OptionsModal";
import MusicPlayer from "./MusicPlayer";
import PublishModal from "./PublishModal";
import { formatDate } from "@/lib/formatDate";
import StoryReactions from "./StoryReactions";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { publishStory } from "../actions";
import StoryBookmark from "./StoryBookmark";
import ImageSlider from "@/shared/components/ImageSlider";
import LoadingButton from "@/shared/components/LoadingButton";

const AnswerAndStats = ({
  recorderControls,
  goToPreviousStep,
  handleShowUploadImageScreen,
  isEditing,
  toggleEditMode,
  onClose,
  story = null,
  isFreeStyle = false,
  setStory, isSavingEdits,
  requestText
}: AnswerAndStatsPropsT) => {
  const { audioSrc, stopRecording, clearCanvas } = recorderControls || {};
  const [isPublished, setIsPublished] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [title, setTitle] = useState(story?.story_title || requestText||"freestyle");
  const router = useRouter();
  const user = useSessionContext();

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    setStory(prevStory => prevStory
      ? { ...prevStory, story_title: e.target.value }
      : prevStory)
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    console.log(story, typeof story?.story_images);

    const response = await publishStory(
      story?.story_id || "",
      title,
      story?.story_images || [],
      "all_friends",
      user
    );

    if (response.success) {
      setIsPublishing(false);
      setStory(null);
      setIsPublished(true);
      router.push("/profile");
    } else {
      setIsPublishing(false);

      console.error(response.error);
    }
  };


  
  return (
    <div className="lg:w-1/2 lg:h-full custom-h760-w1024:h-fit flex-col flex gap-4 sm:gap-4 xl:gap-6 2xl:gap-9 md:bg-purple-100 p-5 sm:p-8 xl:p-10 2xl:p-12  ">
      {/* Header Section */}
      <div className="flex justify-between items-center ">
        {/* Profile Section */}
        <div className="flex items-center gap-3">
          <Image
            src={ProfileImage}
            width={60}
            height={60}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-purple">lauren_li</p>
          </div>
        </div>

        {/* Publish Button */}
        {goToPreviousStep ? (
          <div className="flex h-6 sm:h-12 items-center ">
            <Image
              src={ArrowIcon}
              alt="arrow pointing towards publish button"
              height={100}
              width={80}
              className="h-12 sm:h-12 w-20 "
            />{" "}
            {onClose ? (
              <PublishModal
                isPublishing={isPublishing}
                handlePublish={handlePublish}
                isPublished={isPublished}
                onClose={onClose}
              />
            ) : null}
          </div>
        ) : isEditing ? (
          <div className="flex h-6 sm:h-12 items-center ">
            <Image
              src={ArrowIcon}
              alt="arrow pointing towards save button"
              height={100}
              width={80}
              className="h-12 sm:h-12 w-20 "
            />{" "}
           
            
        
              <LoadingButton className="px-4 h-10 flex items-center justify-center py-1.5 sm:py-2 bg-purple-400 text-white w-24 sm:w-32 border-0 hover:bg-purple" onClick={toggleEditMode} loading={isSavingEdits}>  save</LoadingButton>
          </div>
        ) : (
         user? <OptionsModal
            toggleEditMode={toggleEditMode}
            story={story}
            onClose={onClose}
          />:null
        )}
      </div>

      {/* Question Section */}
      <div
        className={`text-center text-2xl sm:text-3xl font-crimson font-medium ${
          isEditing
            ? "bg-white border-purple border-2 sm:border-0 rounded-2xl"
            : "md:bg-purple-100"
        } w-full  rounded-xl`}
      >
        {story ? (
          isEditing || !story.is_published ? (
            <textarea
              className="border-0 outline-none overflow-y-auto h-16 pt-4 mt-1 w-full resize-none text-center rounded"
              value={title}
              onChange={handleTitleChange} // Update state on change
            />
          ) : (
            <p className="h-16"> {story?.story_title} </p>
          )
        ) : (
          <p className="">
            {" "}
            {isFreeStyle
              ? "freestyle"
              : "What is your favorite travel destination?"}
          </p>
        )}
      </div>

      {/* Stats (Likes, Comments, etc.) */}
      <div className="flex justify-between items-center space-x-4">
        <p className=" text-sm sm:text-xl text-purple">
          {formatDate(story?.creation_time)}
        </p>
        <div className="flex items-center gap-2 sm:gap-5">
          <StoryReactions story={story} />
          <div className="flex items-center  gap-1 sm:gap-2">
            <Image
              src={MessageIcon}
              alt="comments"
              height={22}
              width={22}
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
            <span className="text-sm sm:text-xl">
              {story?.is_published ? story.comments_count : 10}
            </span>
          </div>
          <StoryBookmark story={story}/>
        </div>
      </div>

      {/* Upload Section */}

      {goToPreviousStep  ? (
        <div className=" flex flex-col gap-3 items-center ">
          <div
            onClick={
              handleShowUploadImageScreen
                ? handleShowUploadImageScreen
                : undefined
            }
            className="w-full max-h-64 min-h-64 sm:max-h-96 h-full md:min-h-64 lg:min-h-96 xl:min-h-72 rounded-xl flex flex-col items-center justify-center bg-purple-100 sm:bg-white cursor-pointer"
          >
            <Image src={UploadIcon} alt="attach photo" width={50} height={50} />
            <p className="text-grey text-base">upload</p>
          </div>
          <div className={`rounded-full p-1 h-2 w-2 bg-purple-400`}></div>
        </div>
      ) : story?.story_images && Object.keys(story.story_images).length > 0 ? (
        <ImageSlider images={story.story_images} />
      
      ) : (
        <div className=" flex flex-col gap-3 items-center h-full ">
          <div className="w-full max-h-64 min-h-64 sm:max-h-96 h-full md:min-h-64 lg:min-h-56 xl:lg:min-h-72 rounded-xl flex flex-col items-center justify-center bg-purple-100 sm:bg-white cursor-pointer">
            <Image
              src={UploadIcon}
              alt="attach photo"
              height={"100"}
              width={"100"}
            />
          </div>
        </div>
      )}

      {/* Audio Player Controls */}
      <MusicPlayer
        story={story}
        isEditing={isEditing}
        goToPreviousStep={goToPreviousStep}
        clearCanvas={clearCanvas}
        stopRecording={stopRecording}
        soundURL={story ? story?.story_audio : audioSrc}
      />
    </div>
  );
};

export default AnswerAndStats;


