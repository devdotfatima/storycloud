"use client";
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { AnswerAndStatsPropsT } from "../types";
import ProfileImage from "../../../../../assets/images/profile_image.png";
import HeartIcon from "../../../../../assets/icons/heart.svg";
import MessageIcon from "../../../../../assets/icons/message.svg";
import BookmarkIcon from "../../../../../assets/icons/bookmark.svg";
import UploadIcon from "../../../../../assets/icons/image_file_input.svg";
import ArrowIcon from "../../../../../assets/icons/arrow-red.svg";
import OptionsModal from "./OptionsModal";
import { mockStories } from "@/shared/consts";
import ImageSlider from "@/shared/components/ImageSlider";
import MusicPlayer from "./MusicPlayer";
import PublishModal from "./PublishModal";

const AnswerAndStats = ({
  recorderControls,
  goToPreviousStep,
  handleShowUploadImageScreen,
  isEditing,
  toggleEditMode,
  onClose,
}: AnswerAndStatsPropsT) => {
  const { audioSrc, stopRecording, clearCanvas } = recorderControls || {};
  const { storyId } = useParams();
  const story =
    mockStories.find((story) => story.id.toString() === storyId) ||
    mockStories[0];
  const [title, setTitle] = useState(story?.title || "");

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
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
            {onClose ? <PublishModal onClose={onClose} /> : null}
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
            <button
              onClick={toggleEditMode}
              className="px-4 h-10 flex items-center justify-center py-1.5 sm:py-2 bg-purple-400 text-white w-24 sm:w-32 border-0 hover:bg-purple"
            >
              save
            </button>
          </div>
        ) : (
          <OptionsModal toggleEditMode={toggleEditMode} />
        )}
      </div>

      {/* Question Section */}
      <div
        className={`text-center text-2xl sm:text-3xl font-crimson font-medium ${
          isEditing
            ? "bg-white border-purple border-2 sm:border-0 rounded-2xl"
            : "md:bg-purple-100"
        } w-full p-4 rounded-xl`}
      >
        {storyId ? (
          isEditing ? (
            <textarea
              className="border-0 outline-none overflow-y-auto h-16 w-full resize-none text-center rounded"
              value={title}
              onChange={handleTitleChange} // Update state on change
            />
          ) : (
            <p className="h-16"> {story?.title} </p>
          )
        ) : (
          <p className=""> What is your favorite travel destination?</p>
        )}
      </div>

      {/* Stats (Likes, Comments, etc.) */}
      <div className="flex justify-between items-center space-x-4">
        <p className=" text-sm sm:text-xl text-purple">sep 17 2024</p>
        <div className="flex items-center gap-2 sm:gap-5">
          <div className="flex items-center  gap-1 sm:gap-2">
            <Image
              src={HeartIcon}
              alt="likes"
              height={24}
              width={24}
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
            <span className="text-sm sm:text-xl">{story?.totalLikes}</span>
          </div>
          <div className="flex items-center  gap-1 sm:gap-2">
            <Image
              src={MessageIcon}
              alt="comments"
              height={22}
              width={22}
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
            <span className="text-sm sm:text-xl">{story?.totalComments}</span>
          </div>
          <div className="flex items-center  gap-1 sm:gap-2">
            <Image
              src={BookmarkIcon}
              alt="saves"
              height={24}
              width={24}
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
            <span className="text-sm sm:text-xl">{story?.totalShares}</span>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      {goToPreviousStep || isEditing ? (
        <div className=" flex flex-col gap-3 items-center ">
          <div
            onClick={
              handleShowUploadImageScreen
                ? handleShowUploadImageScreen
                : undefined
            }
            className="w-full max-h-64 min-h-64 sm:max-h-96 h-full md:min-h-64 lg:min-h-56 xl:lg:min-h-72 rounded-xl flex flex-col items-center justify-center bg-purple-100 sm:bg-white cursor-pointer"
          >
            <Image src={UploadIcon} alt="attach photo" width={50} height={50} />
            <p className="text-grey text-base">upload</p>
          </div>
          <div className={`rounded-full p-1 h-2 w-2 bg-purple-400`}></div>
        </div>
      ) : (
        <ImageSlider images={story.storyImages} />
      )}

      {/* Audio Player Controls */}
      <MusicPlayer
        isEditing={isEditing}
        goToPreviousStep={goToPreviousStep}
        clearCanvas={clearCanvas}
        stopRecording={stopRecording}
        soundURL={storyId ? story.audioClip : audioSrc}
      />
    </div>
  );
};

export default AnswerAndStats;
