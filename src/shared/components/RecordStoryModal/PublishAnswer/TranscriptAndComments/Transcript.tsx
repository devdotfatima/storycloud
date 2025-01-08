"use client";
// import { mockStories } from "@/shared/consts";
import { useParams } from "next/navigation";
// import React, { useState } from "react";
import { TranscriptAndCommentsPropsT } from "../types";
import { useFetchTranscript } from "@/hooks/useFetchTranscript";

const Transcript = ({ isEditing, story }: TranscriptAndCommentsPropsT) => {
  const { storyId } = useParams();
  const {
    data: transcript,
    // isLoading: isTranscriptLoading,
    // error: transcriptError,
  } = useFetchTranscript(story?.story_transcript);

  // const [transcript, setTranscript] = useState("");

  // Set initial transcript from story if it exists
  // useEffect(() => {
  //   if (story) {
  //     setTranscript(story.transcript);
  //   }
  // }, [story]);

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
          // onChange={(e) => setTranscript(e.target.value)}
        />
      ) : (
        <p className="pr-3 overflow-y-auto h-full ">{transcript}</p>
      )}
    </div>
  );
};
export default Transcript;
