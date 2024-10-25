"use client";
import React from "react";
import TranscriptAndComments from "./TranscriptAndComments";
import AnswerAndStats from "./AnswerAndStats";
import { PublishAnswerPropsT } from "./types";

const PublishAnswer = ({
  recorderControls,
  goToPreviousStep,
}: PublishAnswerPropsT) => {
  return (
    <div className="w-full h-full overflow-hidden bg-white rounded-2xl  flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
      {/* Answer Section */}
      <AnswerAndStats
        recorderControls={recorderControls}
        goToPreviousStep={goToPreviousStep}
      />
      {/* Transcript Section */}
      <TranscriptAndComments />
    </div>
  );
};

export default PublishAnswer;
