import React from "react";
import QuestionCard from "../QuestionCard";
import { useStoryRequests } from "../../StoryRequestsProvider";
import { Loader } from "lucide-react";

const QuestionsFromFriends = () => {
  const { storyRequests: questions, isLoading } = useStoryRequests();
  // Filter out freestyle questions
  const filteredQuestions = questions.filter(
    (request) =>
      !request.request_id.startsWith("00000000-0000-0000-0000-000000000000")
  );
  if (isLoading)
    return <Loader fill="#6A6FD5" className="mx-auto my-auto animate-spin" />;

  return (
    <div className="flex gap-10 pr-8 md:pr-16 pb-4 xl:pr-28 overflow-x-auto">
      {filteredQuestions.map((request) => (
        <QuestionCard key={request.request_id} request={request} />
      ))}
    </div>
  );
};

export default QuestionsFromFriends;
