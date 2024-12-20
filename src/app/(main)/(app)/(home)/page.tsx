import React, { Suspense } from "react";
import QuestionsFromFriends from "./components/QuestionsFromFriends";
import { Loader } from "lucide-react";
import Freestyle from "./components/Freestyle";
import QuestionOfTheWeek from "./components/QuestionOfTheWeek";

const Page = () => {
  return (
    <div className="flex flex-col gap-10 pl-8 md:pl-16 xl:pl-28 md:py-10  sm:mb-0 overflow-y-auto h-full ">
      <div className="flex flex-col md:flex-row gap-8 pr-8 md:pr-16 xl:pr-28 ">
        <Freestyle />
        <QuestionOfTheWeek />
      </div>

      <div className="flex flex-col gap-6 h-full">
        <h3 className="text-purple">questions from your friends</h3>
        <Suspense
          fallback={
            <Loader fill="#6A6FD5" className="mx-auto my-auto animate-spin" />
          }
        >
          <QuestionsFromFriends />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
