import React from "react";
import Image from "next/image";
import SendPurpleIcon from "@/assets/icons/send.svg";

const SuggestionList = () => {
  return (
    <section className="flex flex-col items-center gap-7 w-full  overflow-y-auto sm:overflow-visible pr-1">
      {" "}
      <div className="relative w-full min-h-20 max-h-20  rounded-xl   py-2  bg-purple-100  overflow-y-auto">
        <p className="text-purple px-5  w-full z-20 flex items-center  focus:border-[1px] pr-10">
          tell more about about your high school experience. what was that like?
        </p>
        <button
          type="submit"
          className="absolute top-0 end-2 p-2.5 h-full  font-medium text-white rounded-e-lg border-0  focus:ring-4 focus:outline-none  "
        >
          <Image
            src={SendPurpleIcon}
            width={25}
            height={25}
            alt="send"
            className="h-5 w-5 sm:h-6 sm:w-6"
          />
        </button>
      </div>
      <div className="relative w-full min-h-20 max-h-20  rounded-xl   py-2  bg-purple-100  overflow-y-auto">
        <p className="text-purple px-5  w-full z-20 flex items-center h-full  focus:border-[1px] pr-10">
          What is your favourite travel destination?
        </p>
        <button
          type="submit"
          className="absolute top-0 end-2 p-2.5 h-full  font-medium text-white rounded-e-lg border-0  focus:ring-4 focus:outline-none  "
        >
          <Image
            src={SendPurpleIcon}
            width={25}
            height={25}
            alt="send"
            className="h-5 w-5 sm:h-6 sm:w-6"
          />
        </button>
      </div>
      <div className="relative w-full min-h-20 max-h-20  rounded-xl   py-2  bg-purple-100  overflow-y-auto">
        <p className="text-purple px-5  w-full z-20 flex items-center  focus:border-[1px] pr-10">
          tell more about about your high school experience. what was that like?
        </p>
        <button
          type="submit"
          className="absolute top-0 end-2 p-2.5 h-full  font-medium text-white rounded-e-lg border-0  focus:ring-4 focus:outline-none  "
        >
          <Image
            src={SendPurpleIcon}
            width={25}
            height={25}
            alt="send"
            className="h-5 w-5 sm:h-6 sm:w-6"
          />
        </button>
      </div>
    </section>
  );
};

export default SuggestionList;
