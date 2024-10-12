import Image from "next/image";
import { VoiceVisualizer } from "react-voice-visualizer";
import React from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { AudioRecorderT } from "./types";
import DeleteAudioModal from "./DeleteAudioModal";
import RestartAudioModal from "./RestartAudioModal";

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
  return (
    <div className="flex flex-col relative items-center  justify-center overflow-hidden  h-fit space-y-0 xl:space-y-6 max-w-[600px] mx-auto w-full">
      <div className="relative   flex items-end flex-col justify-end w-full space-y-1 lg:space-y-3 ">
        <div className=" w-full max-w-[600px] mx-auto  h-16   relative ">
          <hr className="border-b-1.5 z-[0]  absolute top-[29px] rounded-full border-grey w-full  " />

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
        <div className="text-sm text-black w-full flex justify-between">
          <span className="block">{formattedRecordingDuration} </span>{" "}
          {/* recorder Audio Time */}
          <span className="block">05:00</span> {/* Total Duration */}
        </div>
      </div>

      <div className="flex justify-between w-full  h-fit ">
        <Dialog>
          <DialogTrigger
            asChild
            className={`${
              recordingTime === 0
                ? " pointer-events-none"
                : " pointer-events-auto"
            }`}
          >
            <button
              onClick={toggleRecording}
              className=" flex flex-col  items-center justify-center gap-1.5"
            >
              <Image
                alt="restart recording"
                className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                width={60}
                height={60}
                src={`${
                  recordingTime === 0 ? "./restart-grey.svg" : "./restart.svg"
                }`}
              />
              <span
                className={`text-base ${
                  recordingTime === 0 ? "text-grey" : "text-black"
                } `}
              >
                restart
              </span>
            </button>
          </DialogTrigger>
          <RestartAudioModal handleRestart={handleRestart} />
        </Dialog>

        <button
          onClick={toggleRecording}
          className={`w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full text-white  focus:outline-none bg-purple-100 flex justify-center items-center`}
        >
          {isRecording && !isPaused ? (
            <Image
              src={"/pause.svg"}
              alt="pause the recording"
              width={48}
              height={48}
              className="w-12 h-12 text-blue-500"
            />
          ) : (
            <Image
              src={"/microphone-purple.svg"}
              alt="start the recording"
              width={48}
              height={48}
              className="w-12 h-12 text-blue-500"
            />
          )}
        </button>

        <Dialog>
          <DialogTrigger
            asChild
            className={`${
              recordingTime === 0
                ? " pointer-events-none"
                : " pointer-events-auto"
            }`}
          >
            <button
              onClick={toggleRecording}
              className=" flex flex-col  items-center justify-center gap-1.5"
            >
              <Image
                alt="delete recording"
                width={60}
                height={60}
                className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                src={`${
                  recordingTime === 0 ? "./trash-grey.svg" : "./trash.svg"
                }`}
              />
              <span
                className={`text-base ${
                  recordingTime === 0 ? "text-grey" : "text-black"
                } `}
              >
                delete
              </span>
            </button>
          </DialogTrigger>
          <DeleteAudioModal handleDelete={handleDelete} />
        </Dialog>
      </div>
    </div>
  );
};

export default AudioRecorder;
