"use client";
import React, { useState } from "react";
import Image from "next/image";
import WavesurferPlayer from "@wavesurfer/react";
import { useParams } from "next/navigation";
import WaveSurfer from "wavesurfer.js";
import { AnswerAndStatsPropsT } from "../types";
import RestartAudioModal from "../../../AudioRecorder/RestartAudioModal";
import ProfileImage from "../../../../../assets/images/profile_image.png";
import HeartIcon from "../../../../../assets/icons/heart.svg";
import MessageIcon from "../../../../../assets/icons/message.svg";
import BookmarkIcon from "../../../../../assets/icons/bookmark.svg";
import PlayIcon from "../../../../../assets/icons/play.svg";
import PauseWhiteIcon from "../../../../../assets/icons/pause-white.svg";
import UploadIcon from "../../../../../assets/icons/image_file_input.svg";
import ArrowIcon from "../../../../../assets/icons/arrow-red.svg";
import NextIcon from "../../../../../assets/icons/next-black.svg";
import DeleteAudioModal from "../../../AudioRecorder/DeleteAudioModal";
import OptionsModal from "./OptionsModal";
import { mockStories } from "@/shared/consts";
import ImageSlider from "@/shared/components/ImageSlider";

const AnswerAndStats = ({
  recorderControls,
  goToPreviousStep,
  handleShowUploadImageScreen,
}: AnswerAndStatsPropsT) => {
  const { audioSrc, stopRecording, clearCanvas } = recorderControls || {};
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const { storyId } = useParams();
  const story = mockStories.find((story) => story.id.toString() === storyId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState(story?.title || "");

  const onReady = (ws: WaveSurfer) => {
    setWavesurfer(ws);
    setIsPlaying(false);

    // Get duration when the waveform is ready
    setDuration(ws.getDuration());

    // Add time update listener
    ws.on("audioprocess", () => {
      setCurrentTime(ws.getCurrentTime());
    });
    // Listen for when audio ends
    ws.on("finish", () => {
      setIsPlaying(false);
    });
  };

  const onPlayPause = () => {
    if (wavesurfer) wavesurfer.playPause();
  };

  const forwardAudioThirtySeconds = () => {
    if (wavesurfer) {
      wavesurfer.setTime(wavesurfer.getCurrentTime() + 30);
    }
  };

  // Format time function
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  const handleRestart = () => {
    if (storyId) {
      if (wavesurfer) wavesurfer.setTime(0);
      setCurrentTime(0);
      return;
    }
    stopRecording?.();
    clearCanvas?.();
    goToPreviousStep?.();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="lg:flex-1 lg:h-full flex-col flex gap-4 sm:gap-6 xl:gap-10 sm:bg-purple-100 p-5 sm:p-12">
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
            <button className="px-4 h-10 flex items-center justify-center py-1.5 sm:py-2 bg-purple-400 text-white w-24 sm:w-32 border-0 hover:bg-purple">
              publish
            </button>
          </div>
        ) : story?.isMyStory ? (
          <div className="flex h-6 sm:h-12 items-center ">
            <Image
              src={ArrowIcon}
              alt="arrow pointing towards publish button"
              height={100}
              width={80}
              className="h-12 sm:h-12 w-20 "
            />{" "}
            <button className="px-4 h-10 flex items-center justify-center py-1.5 sm:py-2 bg-purple-400 text-white w-24 sm:w-32 border-0 hover:bg-purple">
              save
            </button>
          </div>
        ) : (
          <OptionsModal />
        )}
      </div>

      {/* Question Section */}
      <div
        className={`text-center text-xl sm:text-3xl font-crimson font-medium ${
          story?.isMyStory
            ? "bg-white border-purple border-2 sm:border-0 rounded-2xl"
            : "sm:bg-purple-100"
        } w-full p-4 rounded-xl`}
      >
        {storyId ? (
          story?.isMyStory ? (
            <textarea
              className="border-0 outline-none overflow-y-auto  w-full resize-none text-center rounded"
              value={title}
              onChange={handleTitleChange} // Update state on change
            />
          ) : (
            <p> {story?.title} </p>
          )
        ) : (
          <p> What is your favorite travel destination?</p>
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
      {!story?.isMyStory ? (
        <ImageSlider images={story?.storyImages || [UploadIcon]} />
      ) : (
        <div
          onClick={handleShowUploadImageScreen}
          className="w-full max-h-64 min-h-64 sm:max-h-96 h-full md:min-h-64 lg:min-h-36 rounded-xl flex flex-col items-center justify-center bg-purple-100 sm:bg-white cursor-pointer"
        >
          <Image src={UploadIcon} alt="attach photo" width={50} height={50} />
          <p className="text-grey text-base">upload</p>
        </div>
      )}

      {/* Audio Player Controls */}
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-between gap-4 w-full items-center ">
          <span>{formatTime(currentTime)}</span>
          <div className="max-w-md w-full">
            <WavesurferPlayer
              height={50}
              waveColor="#6A6FD5"
              progressColor={"#AAADF4"}
              barWidth={1}
              barRadius={10}
              cursorColor="transparent"
              autoplay={false}
              url={storyId ? story?.audioClip : audioSrc}
              onReady={onReady}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>

          <span>{formatTime(duration)}</span>
        </div>

        <div className="flex justify-between w-full space-x-6 mt-6 items-start ">
          <RestartAudioModal
            handleRestart={handleRestart}
            recordingTime={duration}
          />

          <button
            onClick={onPlayPause}
            className={`w-14 h-14  lg:w-24 lg:h-24  bg-purple-400  rounded-full text-white flex justify-center items-center`}
          >
            <Image
              src={isPlaying ? PauseWhiteIcon : PlayIcon}
              alt="play recording"
              width={40}
              height={30}
              className="w-6 h-6 lg:w-12 lg:h-10 ml-1"
            />
          </button>

          {!storyId ? (
            <DeleteAudioModal
              recordingTime={duration}
              handleDelete={handleRestart}
            />
          ) : null}
          {storyId ? (
            <>
              {" "}
              <button
                className="flex flex-col items-center justify-center gap-1.5"
                aria-label="forward audio by 30 seconds"
                onClick={forwardAudioThirtySeconds}
              >
                <Image
                  alt="delete recording"
                  width={60}
                  height={60}
                  className="w-10 h-10  lg:w-16 lg:h-16"
                  src={NextIcon}
                />
                <span className={`text-base ${"text-black"}`}>next</span>
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AnswerAndStats;
