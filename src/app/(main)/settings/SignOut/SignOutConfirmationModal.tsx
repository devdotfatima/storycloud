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
    <DialogContent className="bg-transparent w-[85svw] lg:max-w-[450px] h-[260px] md:max-h-[324px] md:h-full overflow-y-auto lg:overflow-hidden border-0  pt-[20px] sm:pr-8 ">
      <DialogClose className="absolute z-50 p-1.5 rounded-full outline-none cursor-pointer top-2.5 right-3 sm:top-5 sm:right-0 bg-purple-400 w-fit">
        <Image
          src={CloseIcon}
          alt="Close button"
          className="w-2 h-2"
          width={8}
          height={8}
        />
      </DialogClose>
      <div className="relative flex flex-col items-center h-full gap-6 p-8 md:p-10 bg-white rounded-2xl ">
        <DialogTitle className="flex items-center justify-center gap-3  mb-6 md:mb-8 lg:mb-10  ">
          sign out?
        </DialogTitle>

        <Link
          href={"/login"}
          className="p-2 transition duration-150 ease-in text-red w-full bg-red-100 text-center hover:bg-red hover:text-white "
        >
          yes
        </Link>
        <DialogClose
          type="button"
          className="p-2 transition duration-150 ease-in text-purple w-full  bg-purple-100 hover:bg-purple-400 hover:text-white"
        >
          cancel
        </DialogClose>
      </div>
    </DialogContent>
  );
};

export default SignOutConfirmationModal;
