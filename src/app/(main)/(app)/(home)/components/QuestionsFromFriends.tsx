import React from "react";
import QuestionCard from "./QuestionCard";
import { validateUser } from "@/lib/dal";
import { StoryRequestsResponseT } from "../types";

export const getStoryRequestsFromFriends = async (): Promise<
  StoryRequestsResponseT | { error: string }
> => {
  try {
    const { user } = await validateUser();
    if (!user) {
      return { error: "Unauthorized" };
    }
    const response = await fetch(
      "https://storycloudapi.com/requests/list-story-requests",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt_token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "API response error:",
        response.status,
        response.statusText
      );
      return { error: "Something went wrong." };
    }

    const data: StoryRequestsResponseT = await response.json();
    console.log("Story requests data:", data);

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};

const QuestionsFromFriends = async () => {
  const result = await getStoryRequestsFromFriends();
  if ("error" in result) {
    return <div className="text-red-500">Error: {result.error}</div>;
  }

  const { items: questions } = result;

  return (
    <div className="flex gap-10 pr-8 md:pr-16 pb-4 xl:pr-28 overflow-x-auto">
      {questions.map((request) => (
        <QuestionCard key={request.request_id} />
      ))}
    </div>
  );
};

export default QuestionsFromFriends;
