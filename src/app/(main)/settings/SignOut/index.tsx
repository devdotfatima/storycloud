import React from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import SignOutConfirmationModal from "./SignOutConfirmationModal";

const SignOut = () => {
  return (
    <div className="absolute top-0 left-0 z-50 flex flex-col w-screen h-screen gap-6 p-10 md:p-0 md:w-full md:h-full md:relative bg-purple-100">
      <a href="/settings" className="md:hidden">
        {" "}
        <ArrowLeft />
      </a>
      <div className="flex items-center gap-4 md:mb-5 text-purple">
        <Image
          src={"/log-out-purple.svg"}
          alt="logout icon"
          width={30}
          height={30}
        />
        Sign Out
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="p-2 md:mt-6  text-center text-white w-full md:w-72  bg-purple-400">
            sign out
          </button>
        </DialogTrigger>
        <SignOutConfirmationModal />
      </Dialog>
    </div>
  );
};

export default SignOut;
