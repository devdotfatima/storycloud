import Image from "next/image";
import React from "react";
import {
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
  Dialog,
} from "@/shared/components/ui/dialog";
import { DeleteAudioModalT } from "./types";
import TrashIcon from "@/assets/icons/trash.svg";
import TrashGreyIcon from "@/assets/icons/trash-grey.svg";

const DeleteAudioModal = ({
  handleDelete,
  recordingTime,
}: DeleteAudioModalT) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex flex-col items-center justify-center gap-1.5"
          aria-label="delete recording"
          disabled={recordingTime === 0}
        >
          <Image
            alt="delete recording"
            width={60}
            height={60}
            className="w-10 h-10 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16"
            src={recordingTime === 0 ? TrashGreyIcon : TrashIcon}
          />
          <span
            className={`text-base ${
              recordingTime === 0 ? "text-grey" : "text-black"
            }`}
          >
            delete
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-transparent h-screen w-full     lg:max-w-[450px] max-h-[256px]  overflow-y-auto lg:overflow-hidden   border-0  pt-[20px] sm:pr-8 ">
        <div className="relative flex flex-col items-center h-full gap-4 p-8  bg-white rounded-2xl ">
          <DialogTitle className="flex items-center justify-center gap-3  mb-6 ">
            <h1 className=" font-normal">delete?</h1>
          </DialogTitle>
          <DialogClose className="w-full">
            <button
              onClick={handleDelete}
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

export default DeleteAudioModal;
