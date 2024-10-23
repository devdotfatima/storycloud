import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/shared/components/ui/dialog";
import CloseIcon from "../../../../assets/icons/close.svg";

const SignOutConfirmationModal = () => {
  return (
    <DialogContent className="bg-transparent h-screen w-full     lg:max-w-[450px] max-h-[324px]  overflow-y-auto lg:overflow-hidden   border-0  pt-[20px] sm:pr-8 ">
      <DialogClose className="absolute z-50 p-1.5 rounded-full outline-none cursor-pointer top-2.5 right-3 sm:top-5 sm:right-0 bg-purple-400 w-fit">
        <Image
          src={CloseIcon}
          alt="Close button"
          className="w-2 h-2"
          width={8}
          height={8}
        />
      </DialogClose>
      <div className="relative flex flex-col items-center h-full gap-4 p-10  bg-white rounded-2xl ">
        <DialogTitle className="flex items-center justify-center gap-3 mb-10 ">
          <h1 className=" font-normal">sign out?</h1>
        </DialogTitle>

        <Link
          href={"/login"}
          className="p-2 text-center transition duration-150 ease-in text-red bg-red-100 w-full "
        >
          yes
        </Link>
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

export default SignOutConfirmationModal;
