import React from "react";
import Image from "next/image";
import {
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
  Dialog,
} from "@/shared/components/ui/dialog";
import { RestartAudioModalT } from "./types";
import RestartIcon from "../../../assets/icons/restart.svg";
import RestartGreyIcon from "../../../assets/icons/restart-grey.svg";

const RestartAudioModal = ({
  handleRestart,
  recordingTime,
}: RestartAudioModalT) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex flex-col items-center justify-center gap-1.5"
          aria-label="restart recording"
          disabled={recordingTime === 0}
        >
          <Image
            alt="restart recording"
            className="w-10 h-10  lg:w-16 lg:h-16"
            width={60}
            height={60}
            src={recordingTime === 0 ? RestartGreyIcon : RestartIcon}
          />
          <span
            className={`text-base ${
              recordingTime === 0 ? "text-grey" : "text-black"
            }`}
          >
            restart
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-transparent h-screen w-full lg:max-w-[450px] max-h-[256px]  overflow-y-auto lg:overflow-hidden border-0 pt-[20px] sm:pr-8 ">
        <div className="relative flex flex-col items-center h-full gap-4 p-8  bg-white rounded-2xl ">
          <DialogTitle className="flex items-center justify-center gap-3 mb-6 ">
            <h1 className=" font-normal">restart?</h1>
          </DialogTitle>

          <DialogClose className="w-full">
            <button
              onClick={handleRestart}
              className="p-2 text-center transition duration-150 ease-in text-red bg-red-100 w-full "
            >
              yes
            </button>
          </DialogClose>

          <DialogClose
            type="button"
            className="p-2 transition duration-150 ease-in text-purple bg-purple-100 w-full  "
          >
            cancel
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RestartAudioModal;
