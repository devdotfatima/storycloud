import React from "react";
import QuestionCard from "../QuestionCard";
import { getStoryRequestsFromFriends } from "./actions";

const QuestionsFromFriends = async () => {
  const result = await getStoryRequestsFromFriends();
  if ("error" in result) {
    return <div className="text-red-500">Error: {result.error}</div>;
  }

  const { items: questions } = result;

  // Filter out freestyle questions
  const filteredQuestions = questions.filter(
    (request) =>
      !request.request_id.startsWith("00000000-0000-0000-0000-000000000000")
  );

  return (
    <div className="flex gap-10 pr-8 md:pr-16 pb-4 xl:pr-28 overflow-x-auto">
      {filteredQuestions.map((request) => (
        <QuestionCard key={request.request_id} />
      ))}
    </div>
  );
};

export default QuestionsFromFriends;
