import React from "react";
import Image from "next/image";
import {
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/shared/components/ui/dialog";

const StorySentModal = () => {
  return (
    <DialogContent className="bg-transparent w-full  h-[100svh] sm:h-[90svh]  lg:overflow-hidden sm:max-w-[600px] lg:max-h-[600px]  pt-[20px] lg:pr-10 border-0 outline-none rounded-2xl ">
      <DialogClose className="absolute z-50 p-0 rounded-full cursor-pointer top-2 right-4 outline-none  w-fit lg:top-5 lg:-right-0 bg-white">
        <Image
          src={"/close-purple.svg"}
          alt="Close modal"
          className="w-6 h-6"
        />
      </DialogClose>
      <div className="flex flex-col items-center w-full h-full  py-6  px-5 sm:px-10 mx-auto overflow-hidden bg-white shadow-md rounded-t-2xl sm:rounded-2xl gap-5 lg:gap-7 lg:py-10 justify-between  ">
        <DialogTitle className="text-purple ">
          your story has been sent!
        </DialogTitle>

        <p className="bg-purple-100 text-purple h-16 sm:min-h-20 px-5 rounded-xl flex items-center w-full justify-center ">
          what is your favorite travel destination?
        </p>

        <h3 className="">
          you’ll be notified when the user answers your question
        </h3>
        <div className="h-full flex items-center ">
          <Image
            src={"/story_sent.png"}
            width={237}
            height={160}
            alt="story has been sent"
            className="mt-5 h-32 w-44 md:min-w-60 md:min-h-40 "
          />
        </div>

        {/* <section className="flex flex-col  items-center gap-7 w-full overflow-y-auto pr-1"> */}
        <footer className="flex   gap-6 sm:gap-10 w-full self-end  justify-between mt-auto ">
          <button className="bg-red-100 text-red w-full h-11">unsend</button>
          <button className="bg-purple-100 text-purple w-full h-11">
            done
          </button>
        </footer>
      </div>
    </DialogContent>
  );
};

export default StorySentModal;
