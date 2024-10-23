import React from "react";
import Image from "next/image";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import SignOutConfirmationModal from "./SignOutConfirmationModal";
import ReturnPurpleIcon from "../../../../assets/icons/return-purple.svg";
import LogOutPurpleIcon from "../../../../assets/icons/log-out-purple.svg";

const SignOut = () => {
  return (
    <div className="absolute top-0 left-0 z-50 flex flex-col w-screen h-screen gap-6 p-10 md:p-0 md:w-full md:h-full md:relative bg-purple-100">
      <div className="flex items-center gap-4 md:mb-4 text-purple">
        <a href="/settings" className="md:hidden">
          <Image
            src={ReturnPurpleIcon}
            alt="info icon"
            width={7}
            height={7}
            className="w-4 h-4 text-purple"
          />
        </a>
        <div className="flex items-center mx-auto md:mx-0 w-fit gap-2">
          <Image
            src={LogOutPurpleIcon}
            alt="logout icon"
            width={20}
            height={20}
            className="w-7 h-7 text-purple"
          />
          Sign Out
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="p-2   text-center text-white w-full md:w-72  bg-purple-400">
            sign out
          </button>
        </DialogTrigger>
        <SignOutConfirmationModal />
      </Dialog>
    </div>
  );
};

export default SignOut;
