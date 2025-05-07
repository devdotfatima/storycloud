"use client";
// import { mockStories } from "@/shared/consts";
import { useParams } from "next/navigation";
import React, { useState,useEffect } from "react";
import { TranscriptAndCommentsPropsT } from "../types";
import { useFetchTranscript } from "@/hooks/useFetchTranscript";

const Transcript = ({ isEditing, story,setStory }: TranscriptAndCommentsPropsT) => {
  const { storyId } = useParams();
  const [transcript, setTranscript] = useState( "");
  const {
    data,
    // isLoading: isTranscriptLoading,
    // error: transcriptError,
  } = useFetchTranscript(story?.story_transcript);

  const handleTranscriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTranscript = e.target.value;
    setTranscript(newTranscript);

    setStory((prevStory) =>
      prevStory
        ? { ...prevStory, story_transcript: newTranscript }
        : prevStory
    );
  };
  useEffect(() => {
    if (data) {
      
      setTranscript(data);
    }
  }, [data]);

  return (
    <div
      className={`min-h-[460px] h-full custom-h760-w1024:min-h-[60svh] w-full bg-purple-100 rounded-2xl py-5 pl-5 pr-1 ${
        storyId
          ? isEditing
            ? "bg-white border-2 border-purple"
            : ""
          : "text-center sm:px-24 flex justify-center items-center text-purple "
      }`}
    >
      {!storyId ? (
        <span>your transcript will finish generating after you publish</span>
      ) : // Editable transcript area
      isEditing ? (
        <textarea
          className="border-0 outline-none overflow-y-auto h-full w-full resize-none rounded"
          value={transcript}
          onChange={handleTranscriptChange}
        />
      ) : (
        <p className="pr-3 overflow-y-auto h-full ">{transcript}</p>
      )}
    </div>
  );
};
export default Transcript;
