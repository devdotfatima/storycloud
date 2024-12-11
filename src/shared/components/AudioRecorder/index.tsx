"use client";
import Image from "next/image";
import { VoiceVisualizer } from "react-voice-visualizer";
import React, { useMemo } from "react";
import { AudioRecorderT } from "./types";
import DeleteAudioModal from "./DeleteAudioModal";
import RestartAudioModal from "./RestartAudioModal";
import PauseIcon from "@/assets/icons/pause.svg";
import MicrophonePurpleIcon from "@/assets/icons/microphone-purple.svg";
import { convertTimeToSeconds, formatTime, TotalRecordingTime } from "./utils";

const AudioRecorder = ({
  formattedRecordingDuration,
  recordingTime,
  recorderControls,
  toggleRecording,
  isPaused,
  isRecording,
  handleDelete,
  handleRestart,
}: AudioRecorderT) => {
  const recordingDurationInSeconds = useMemo(
    () => convertTimeToSeconds(formattedRecordingDuration),
    [formattedRecordingDuration]
  );

  const remainingTimeInSeconds = useMemo(
    () => TotalRecordingTime - recordingDurationInSeconds,
    [recordingDurationInSeconds]
  );

  const remainingTime = useMemo(
    () => formatTime(remainingTimeInSeconds),
    [remainingTimeInSeconds]
  );
  return (
    <div className="flex flex-col relative items-center   justify-center overflow-hidden  h-fit space-y-0 xl:space-y-6 max-w-[600px] mx-auto w-full">
      <div className="flex w-full max-w-[600px] mx-auto h-14 items-center relative">
        <div className="text-purple block font-medium w-fit  ">
          {remainingTime}
        </div>
        <div
          // className="relative w-[70%] sm:w-[78.5%] md:w-[77.5%] lg:w-[80%] "
          style={{
            width: `calc(100% - ${remainingTime ? "60px" : "0px"} - ${
              formattedRecordingDuration ? "60px" : "0px"
            })`,
          }}
          className="relative mx-auto"
        >
          <hr className="border-b-1.5 z-[0] absolute top-[29px] left-0 rounded-full border-grey w-full" />
          <VoiceVisualizer
            controls={recorderControls}
            mainBarColor="#6A6FD5"
            secondaryBarColor="#B1B1B1"
            fullscreen={true}
            barWidth={5}
            height={60}
            isProgressIndicatorShown={false}
            isControlPanelShown={false}
            isDefaultUIShown={false}
          />
        </div>
        <span className="text-red  font-medium w-fit ">
          {formattedRecordingDuration}
        </span>
      </div>
      <div className="flex justify-between w-full h-fit ">
        <RestartAudioModal
          recordingTime={recordingTime}
          handleRestart={handleRestart}
        />

        <button
          onClick={toggleRecording}
          className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full text-white  focus:outline-none bg-purple-100 flex justify-center items-center`}
        >
          {isRecording && !isPaused ? (
            <Image
              src={PauseIcon}
              alt="pause the recording"
              width={48}
              height={48}
              className="w-10 h-10 lg:w-12 lg:h-12 text-blue-500"
            />
          ) : (
            <Image
              src={MicrophonePurpleIcon}
              alt="start the recording"
              width={48}
              height={48}
              className="w-10 h-10 lg:w-12 lg:h-12 text-blue-500"
            />
          )}
        </button>

        <DeleteAudioModal
          handleDelete={handleDelete}
          recordingTime={recordingTime}
        />
      </div>
    </div>
  );
};

export default AudioRecorder;
