import { StoryAnswerT } from "@/shared/types";

export type bookmarkedStoriesResponseT = {
  items: StoryAnswerT[]; // List of stories
  current_page_number: number; // Current page number
  last_evaluated_page_size: number; // Number of stories per page
};
