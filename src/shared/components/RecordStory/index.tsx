import React from "react";
import { DialogContent, DialogClose, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import AudioRecorder from "../AudioRecorder";

const RecordStory = () => {
  return (
    <DialogContent className=" lg:max-w-[860px]  max-h-[950px] bg-transparent w-full    h-[90vh] overflow-y-auto lg:overflow-hidden    lg:pr-8  pt-[20px] ">
      <DialogClose className="absolute z-50 p-0 rounded-full outline-none cursor-pointer top-1 right-3 md:top-5 md:right-0  w-fit">
        <Image
          src={"/close-purple.svg"}
          alt="Close button"
          className="w-7 h-7 bg-white rounded-full p-0"
          width={30}
          height={30}
        />
      </DialogClose>
      <div className="w-full h-full bg-white rounded-2xl p-6 md:p-10 flex flex-col  gap-6 md:gap-10 overflow-y-auto">
        <button className="bg-grey-100 text-grey w-32 py-2  self-end">
          next
        </button>
        <DialogTitle className="text-center text-xl md:text-4xl font-crimson max-w-[600px] mx-auto md:px-6">
          What is your favorite travel destination?
        </DialogTitle>
        <div className="max-w-[600px] w-full h-fit md:max-h-[450px] bg-purple-100 md:h-full mx-auto  rounded-2xl p-6  sm:p-10 text-center">
          <h2 className="text-purple">some advice</h2>
          <ul className="text-left mt-8 flex flex-col  gap-4">
            <li>
              <span className="text-purple">Be yourself.</span> Your audience
              values authenticity.
            </li>
            <li>
              <span className="text-purple">Don’t rush.</span> Take your time
              and flow at your own pace.
            </li>
            <li>
              <span className="text-purple">Paint a picture.</span> Describe the
              scenes in detail.
            </li>
            <li>
              <span className="text-purple">Stay on course.</span> Focus on the
              main plot or message.
            </li>
            <li>
              {" "}
              <span className="text-purple">Keep it below 5 min.</span> That’s
              the average attention span.
            </li>
          </ul>
        </div>
        <div className="">
          <AudioRecorder />
        </div>
      </div>
    </DialogContent>
  );
};

export default RecordStory;
