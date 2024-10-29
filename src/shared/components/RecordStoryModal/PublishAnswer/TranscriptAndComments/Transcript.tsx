"use client";
import { mockStories } from "@/shared/consts";
import { useParams } from "next/navigation";
import React from "react";

const Transcript = () => {
  const { storyId } = useParams();
  const story = mockStories.find((story) => story.id.toString() === storyId);
  return (
    <div
      className={` min-h-[460px]  h-full w-full bg-purple-100 rounded-2xl  py-5 pl-5 pr-1  ${
        storyId
          ? ""
          : " text-center sm:px-24 flex justify-center items-center text-purple"
      } `}
    >
      {!storyId ? (
        <span> your transcript will finish generating after you publish</span>
      ) : (
        <p className="pr-3  overflow-y-auto h-full">{story?.transcript}</p>
      )}
    </div>
  );
};

export default Transcript;
