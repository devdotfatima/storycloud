"use client";
import { mockStories } from "@/shared/consts";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Transcript = () => {
  const { storyId } = useParams();
  const story = mockStories.find((story) => story.id.toString() === storyId);
  const [transcript, setTranscript] = useState("");

  // Set initial transcript from story if it exists
  useEffect(() => {
    if (story) {
      setTranscript(story.transcript);
    }
  }, [story]);

  return (
    <div
      className={`min-h-[460px] h-full w-full bg-purple-100 rounded-2xl py-5 pl-5 pr-1 ${
        storyId
          ? story?.isMyStory
            ? "bg-white border-2 border-purple"
            : ""
          : "text-center sm:px-24 flex justify-center items-center text-purple"
      }`}
    >
      {!storyId ? (
        <span>Your transcript will finish generating after you publish</span>
      ) : // Editable transcript area
      story?.isMyStory ? (
        <textarea
          className="border-0 outline-none overflow-y-auto h-full w-full resize-none rounded"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)} // Update state on change
        />
      ) : (
        <p className="pr-3 overflow-y-auto h-full">{story?.transcript}</p>
      )}
    </div>
  );
};
export default Transcript;
