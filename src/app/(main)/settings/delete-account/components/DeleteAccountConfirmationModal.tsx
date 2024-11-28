import Image from "next/image";
import React from "react";
import {
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/shared/components/ui/dialog";
import CloseIcon from "../../../../../assets/icons/close.svg";
import { deleteAccount } from "./actions";

const DeleteAccountConfirmationModal = () => {
  return (
    <DialogContent className="bg-transparent w-[80svw] lg:max-w-[450px] h-[280px] md:max-h-[324px] md:h-full  overflow-y-auto lg:overflow-hidden   border-0 rounded-2xl pt-[20px] sm:pr-8 ">
      <DialogClose className="absolute z-50 p-1.5 rounded-full outline-none cursor-pointer top-2.5 right-3 sm:top-5 sm:right-0 bg-purple-400 w-fit">
        <span className="sr-only">Close</span>
        <Image
          src={CloseIcon}
          alt="Close modal icon"
          className="w-2 h-2"
          width={8}
          height={8}
        />
      </DialogClose>
      <div className="relative flex flex-col items-center h-full gap-6 p-8 md:p-10 bg-white rounded-2xl ">
        <DialogTitle className="flex items-center justify-center  mb-6 md:mb-8 lg:mb-10 ">
          delete account?
        </DialogTitle>

        <button
          type="button"
          className="p-2 transition duration-150 ease-in text-red w-full bg-red-100  hover:bg-red hover:text-white "
          onClick={deleteAccount}
        >
          delete account
        </button>

        <DialogClose className="p-2 transition duration-150 ease-in text-purple w-full  bg-purple-100 hover:bg-purple-400 hover:text-white">
          cancel
        </DialogClose>
      </div>
    </DialogContent>
  );
};

export default DeleteAccountConfirmationModal;
