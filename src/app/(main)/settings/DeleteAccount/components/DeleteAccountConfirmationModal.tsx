import Image from "next/image";
import React from "react";
import {
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/shared/components/ui/dialog";

const DeleteAccountConfirmationModal = () => {
  return (
    <DialogContent className="bg-transparent h-screen w-full  lg:max-w-[450px] max-h-[324px]  overflow-y-auto lg:overflow-hidden   border-0 rounded-2xl pt-[20px] sm:pr-8 ">
      <DialogClose className="absolute z-50 p-1.5 rounded-full outline-none cursor-pointer top-2.5 right-3 sm:top-5 sm:right-0 bg-purple-400 w-fit">
        <span className="sr-only">Close</span>
        <Image
          src={"/close.svg"}
          alt="Close modal icon"
          className="w-2 h-2"
          width={8}
          height={8}
        />
      </DialogClose>
      <div className="relative flex flex-col items-center h-full gap-6 p-10   bg-white rounded-2xl ">
        <DialogTitle className="flex items-center justify-center  mb-10 ">
          delete account?
        </DialogTitle>

        <button
          type="button"
          className="p-2 transition duration-150 ease-in text-red w-full  bg-red-100   all"
        >
          delete account
        </button>
        <button
          type="button"
          className="p-2 transition duration-150 ease-in text-purple w-full  bg-purple-100 hover:bg-purple-400  all"
        >
          <DialogClose> cancel</DialogClose>
        </button>
      </div>
    </DialogContent>
  );
};

export default DeleteAccountConfirmationModal;
