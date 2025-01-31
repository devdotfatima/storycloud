"use client";

import React from "react";
import QuestionsFromFriends from "./components/QuestionsFromFriends";
import Freestyle from "./components/Freestyle";
import QuestionOfTheWeek from "./components/QuestionOfTheWeek";
import { StoryRequestsProvider } from "./StoryRequestsProvider";

const Page = () => {
  return (
    <StoryRequestsProvider>
      <div className="flex w-full flex-col gap-10 pl-8 md:pl-16 xl:pl-28 md:py-10  sm:mb-0 overflow-y-auto h-full ">
        <div className="flex flex-col md:flex-row gap-8 pr-8 md:pr-16 xl:pr-28  max-w-screen-2xl mx-auto  w-full ">
          <Freestyle />
          <QuestionOfTheWeek />
        </div>

        <div className="flex flex-col gap-6 h-full  max-w-screen-2xl mx-auto  w-full">
          <h3 className="text-purple">questions from your friends</h3>

          <QuestionsFromFriends />
        </div>
      </div>
    </StoryRequestsProvider>
  );
};

export default Page;
