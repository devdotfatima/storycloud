"use client";
import React from "react";
import { DialogContent, DialogClose, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { useVoiceVisualizer } from "react-voice-visualizer";

import AudioRecorder from "../AudioRecorder";

const RecordStoryModal = () => {
  const recorderControls = useVoiceVisualizer();
  const {
    // recordedBlob,
    startRecording,
    // audioSrc,
    stopRecording,
    recordingTime,
    isPausedRecording,
    isRecordingInProgress,
    togglePauseResume,
    clearCanvas,
    formattedRecordingTime,
  } = recorderControls;

  const toggleRecording = () => {
    if (isRecordingInProgress) {
      togglePauseResume();
    } else {
      startRecording();
    }
  };

  const handleRestart = () => {
    stopRecording();
    clearCanvas();
    startRecording();
  };

  const handleDelete = () => {
    stopRecording();
  };

  const stopAudioRecorder: () => void = () => {
    stopRecording();
  };

  return (
    <DialogContent
      aria-describedby="record your story to the question "
      className=" w-full max-w-screen-sm lg:max-w-[860px]  max-h-[1000px] bg-transparent h-[100svh]  sm:h-[90svh]   overflow-hidden    lg:pr-12  pt-[20px] "
    >
      <DialogClose className="absolute z-50 p-0 rounded-full outline-none cursor-pointer top-1 right-3 lg:top-5 lg:right-0  w-fit">
        <Image
          src={"/close-purple.svg"}
          alt="Close button"
          className="w-7 h-7 bg-white rounded-full p-0"
          width={30}
          height={30}
        />
      </DialogClose>
      <div className="w-full h-full overflow-hidden  bg-white rounded-2xl p-6 md:p-10 flex flex-col  gap-6 md:gap-10">
        <button
          className={`${
            recordingTime > 0
              ? "bg-purple-100 text-purple "
              : " bg-grey-100 text-grey "
          } w-32 py-2  self-end`}
          onClick={stopAudioRecorder}
        >
          next
        </button>
        <DialogTitle className="text-center text-xl md:text-4xl font-crimson max-w-[600px] mx-auto md:px-6">
          What is your favorite travel destination?
        </DialogTitle>
        <div className=" pr-1  bg-purple-100 w-full  max-w-[600px]  mx-auto rounded-2xl lg:max-h-[450px] overflow-hidden min-h-[220px] h-full py-2 ">
          <div className="overflow-y-auto    text-center   h-full">
            <h2 className="text-purple pt-4 lg:pt-8">some advice</h2>
            <ul className="text-left px-6 lg:px-10 py-4 lg:py-8  flex flex-col  gap-4">
              <li>
                <span className="text-purple">Be yourself.</span> Your audience
                values authenticity.
              </li>
              <li>
                <span className="text-purple">Don’t rush.</span> Take your time
                and flow at your own pace.
              </li>
              <li>
                <span className="text-purple">Paint a picture.</span> Describe
                the scenes in detail.
              </li>
              <li>
                <span className="text-purple">Stay on course.</span> Focus on
                the main plot or message.
              </li>
              <li>
                {" "}
                <span className="text-purple">Keep it below 5 min.</span> That’s
                the average attention span.
              </li>
            </ul>
          </div>
        </div>

        <div className="  w-full  h-fit min-h-40 lg:min-h-56   items-end overflow-y-auto flex self-end ">
          <AudioRecorder
            recorderControls={recorderControls}
            toggleRecording={toggleRecording}
            isPaused={isPausedRecording}
            isRecording={isRecordingInProgress}
            formattedRecordingDuration={formattedRecordingTime}
            recordingTime={recordingTime}
            handleDelete={handleDelete}
            handleRestart={handleRestart}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default RecordStoryModal;
