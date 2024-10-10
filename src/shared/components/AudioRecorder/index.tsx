import Image from "next/image";
import React from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { AudioRecorderT } from "./types";
import DeleteAudioModal from "./DeleteAudioModal";
import RestartAudioModal from "./RestartAudioModal";

const AudioRecorder = ({
  elapsedTime,
  formatTime,
  toggleRecording,
  isPaused,
  isRecording,
  handleDelete,
  handleRestart,
}: AudioRecorderT) => {
  return (
    <div className="flex flex-col items-center justify-center  space-y-4 max-w-[600px] mx-auto">
      <div className="relative w-full">
        <input
          type="range"
          value={elapsedTime}
          id="progressBar"
          // onChange={handleSeek}
          className="w-full custom-range mt-2"
          min="0"
          max="300" // Set max to 300 seconds for 5 minutes
          step="1" // Step of 1 second for the range
          style={{
            background: `linear-gradient(to right, #6a6fd5 ${Math.min(
              (elapsedTime / 300) * 100,
              100
            )}%, #b1b1b1 ${Math.min((elapsedTime / 300) * 100, 100)}%)`,
          }}
        />

        <div className="text-sm text-black w-full flex justify-between">
          <span className="block">{formatTime(elapsedTime)} </span>{" "}
          {/* Elapsed Time */}
          <span className="block">05:00</span> {/* Total Duration */}
        </div>
      </div>

      <div className="flex justify-between w-full ">
        <Dialog>
          <DialogTrigger
            asChild
            className={`${
              elapsedTime === 0
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
                width={40}
                height={40}
                src={`${
                  elapsedTime === 0 ? "./restart-grey.svg" : "./restart.svg"
                }`}
              />
              <span
                className={`text-base ${
                  elapsedTime === 0 ? "text-grey" : "text-black"
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
          className={`w-24 h-24 rounded-full text-white  focus:outline-none bg-purple-100 flex justify-center items-center`}
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
              elapsedTime === 0
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
                width={40}
                height={40}
                src={`${
                  elapsedTime === 0 ? "./trash-grey.svg" : "./trash.svg"
                }`}
              />
              <span
                className={`text-base ${
                  elapsedTime === 0 ? "text-grey" : "text-black"
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
