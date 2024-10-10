import React from "react";
import {
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/shared/components/ui/dialog";
import { DeleteAudioModalT } from "./types";

const DeleteAudioModal = ({ handleDelete }: DeleteAudioModalT) => {
  return (
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
  );
};

export default DeleteAudioModal;
