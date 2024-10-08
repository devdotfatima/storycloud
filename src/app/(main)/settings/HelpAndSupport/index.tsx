import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import TopicsDropdown from "./TopicsDropdown";

const HelpAndSupport = () => {
  return (
    <div className="absolute top-0 left-0 z-50 flex flex-col w-screen h-screen gap-6 p-10 lowercase md:p-0 md:w-full md:h-full md:relative bg-purple-100 ">
      <div className="flex items-center gap-4 md:mb-4 text-purple">
        <a href="/settings" className="md:hidden">
          <Image
            src={"/return-purple.svg"}
            alt="info icon"
            width={7}
            height={7}
            className="w-4 h-4 text-purple"
          />
        </a>
        <div className="flex items-center mx-auto md:mx-0 w-fit gap-2">
          <Image
            src={"/help-purple.svg"}
            alt="help and support icon"
            width={20}
            height={20}
            className="w-7 h-7 text-purple"
          />{" "}
          Help & Support
        </div>
      </div>

      <form className="flex flex-col gap-4  sm:mr-6 lg:mr-20">
        <div className="flex flex-col  gap-2">
          <label htmlFor="subject">topic</label>
          <TopicsDropdown />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="subject"
            id="subject"
            className="w-full p-2 pl-5  sm:max-w-sm lg:max-w-lg "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message">Message</label>
          <textarea
            name=""
            placeholder="type in your message"
            id="message"
            className="w-full p-2 pl-5  sm:max-w-sm lg:max-w-lg rounded-2xl resize-none"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="p-2 mt-6  text-white w-full sm:w-60  bg-purple-400"
        >
          send
        </button>
      </form>
    </div>
  );
};

export default HelpAndSupport;
