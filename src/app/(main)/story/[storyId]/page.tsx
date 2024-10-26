"use client";
import AnswerAndStats from "@/shared/components/RecordStoryModal/PublishAnswer/AnswerAndStats";
import TranscriptAndComments from "@/shared/components/RecordStoryModal/PublishAnswer/TranscriptAndComments";
import React from "react";

const Story = () => {
  return (
    <div className="mb-0  bg-purple-400 pb-36 sm:pb-40 md:pb-10 sm:p-10 w-full min-h-screen h-full overflow-hidden ">
      <div
        className={`lg:max-h-[1000px] bg-transparent w-full max-w-screen-sm  lg:max-w-[1200px]  overflow-hidden   mx-auto h-full overflow-y-auto lg:overflow-hidden bg-white sm:rounded-2xl  flex flex-col lg:flex-row `}
      >
        <AnswerAndStats />

        <TranscriptAndComments />
      </div>
    </div>
  );
};

export default Story;
