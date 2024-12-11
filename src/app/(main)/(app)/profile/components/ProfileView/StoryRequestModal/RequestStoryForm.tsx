"use client";
import Image from "next/image";
import React from "react";
import SendGreyIcon from "@/assets/icons/send-grey.svg";
import SendPurpleIcon from "@/assets/icons/send.svg";
import { RequestStoryFormPropsT } from "./types";

const RequestStoryForm = ({
  onSend,
  handleInputChange,
  inputValue,
}: RequestStoryFormPropsT) => {
  return (
    <form
      className="w-full relative"
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
    >
      <input
        type="text"
        className="block px-5 h-16 sm:h-20 w-full z-20    rounded-xl  border border-purple focus:border-[1px] pr-10"
        placeholder="type your question"
        required
        maxLength={100}
        value={inputValue}
        onChange={handleInputChange}
      />

      <button
        type="submit"
        disabled={inputValue.length === 0}
        className="absolute top-0 end-0 p-2.5 h-full  font-medium text-white rounded-e-lg border-0   "
      >
        <Image
          src={inputValue ? SendPurpleIcon : SendGreyIcon}
          className="h-5 w-5 sm:h-6 sm:w-6"
          width={25}
          height={25}
          alt="send"
        />
      </button>
    </form>
  );
};

export default RequestStoryForm;
