import React from "react";
import TranscriptAndComments from "./TranscriptAndComments";
import AnswerAndStats from "./AnswerAndStats";

const PublishAnswer = () => {
  return (
    <div className="w-full h-full overflow-hidden bg-white rounded-2xl  flex">
      {/* Answer Section */}
      <AnswerAndStats />
      {/* Transcript Section */}
      <TranscriptAndComments />
    </div>
  );
};

export default PublishAnswer;
