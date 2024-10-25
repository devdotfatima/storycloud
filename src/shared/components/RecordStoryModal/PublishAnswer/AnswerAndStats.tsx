import React, { useState } from "react";
import Image from "next/image";
import WavesurferPlayer from "@wavesurfer/react";
import WaveSurfer from "wavesurfer.js";
import { AnswerAndStatsPropsT } from "./types";
import RestartAudioModal from "../../AudioRecorder/RestartAudioModal";
import ProfileImage from "../../../../assets/images/profile_image.png";
import HeartIcon from "../../../../assets/icons/heart.svg";
import MessageIcon from "../../../../assets/icons/message.svg";
import BookmarkIcon from "../../../../assets/icons/bookmark.svg";
import PlayIcon from "../../../../assets/icons/play.svg";
import PauseWhiteIcon from "../../../../assets/icons/pause-white.svg";
import UploadIcon from "../../../../assets/icons/image_file_input.svg";
import DeleteAudioModal from "../../AudioRecorder/DeleteAudioModal";

const AnswerAndStats = ({
  recorderControls,
  goToPreviousStep,
}: AnswerAndStatsPropsT) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // State to track current time
  const [duration, setDuration] = useState(0); // State to track total duration

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

  const { audioSrc, stopRecording, clearCanvas } = recorderControls || {};

  // Format time function
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  const handleRestart = () => {
    stopRecording?.();
    clearCanvas?.();
    goToPreviousStep?.();
  };

  return (
    <div className="lg:flex-1 lg:h-full flex-col flex gap-10 sm:bg-purple-100 p-5 sm:p-12">
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
        <button className="px-4 py-1.5 sm:py-2 bg-purple-400 text-white w-24 sm:w-32 border-0 hover:bg-purple">
          publish
        </button>
      </div>

      {/* Question Section */}
      <div className="text-center text-xl sm:text-3xl font-crimson font-medium bg-white w-full p-4 rounded-xl">
        What is your favorite travel destination?
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
            <span className="text-sm sm:text-xl">00</span>
          </div>
          <div className="flex items-center  gap-1 sm:gap-2">
            <Image
              src={MessageIcon}
              alt="comments"
              height={22}
              width={22}
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
            <span className="text-sm sm:text-xl">00</span>
          </div>
          <div className="flex items-center  gap-1 sm:gap-2">
            <Image
              src={BookmarkIcon}
              alt="saves"
              height={24}
              width={24}
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
            <span className="text-sm sm:text-xl">00</span>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="w-full h-64 sm:h-96 rounded-xl flex flex-col items-center justify-center bg-purple-100 sm:bg-white">
        <Image src={UploadIcon} alt="attach photo" width={50} height={50} />
        <p className="text-grey text-base">upload</p>
      </div>

      {/* Audio Player Controls */}
      <div className="flex flex-col items-center  w-full ">
        <div className="flex justify-between gap-4 w-full items-center ">
          <span>{formatTime(currentTime)}</span>
          <WavesurferPlayer
            height={50}
            waveColor="#6A6FD5"
            progressColor={"#AAADF4"}
            barWidth={5}
            barRadius={10}
            width="370px"
            cursorColor="transparent"
            autoplay={false}
            url={audioSrc}
            onReady={onReady}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

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

          <DeleteAudioModal
            recordingTime={duration}
            handleDelete={handleRestart}
          />
        </div>
      </div>
    </div>
  );
};

export default AnswerAndStats;
