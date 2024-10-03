import React from "react";
import { ArrowLeft } from "lucide-react";
import SingleSelect from "@/shared/components/SingleSelect";

const HelpAndSupport = () => {
  return (
    <div className="absolute top-0 left-0 z-50 flex flex-col w-screen h-screen gap-8 p-10 lowercase md:p-0 md:w-full md:h-full md:relative ">
      <a href="/settings" className="md:hidden">
        {" "}
        <ArrowLeft />
      </a>
      <div className="flex items-center gap-4 mb-5 text-purple ">
        <img src={"/help-purple.svg"} /> Help & Support
      </div>
      <form className="flex flex-col gap-4 ">
        <div className="flex flex-col ">
          <SingleSelect label={"Topic"} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="subject"
            id="subject"
            className="w-full p-2 pl-5 lg:w-1/2 max-w-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message">Message</label>
          <textarea
            name=""
            placeholder="type in your message"
            id="message"
            className="w-full p-2 pl-5 lg:w-1/2 max-w-sm rounded-2xl resize-none"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="p-2 mt-6  text-white w-60  bg-purple-400"
        >
          send
        </button>
      </form>
    </div>
  );
};

export default HelpAndSupport;
