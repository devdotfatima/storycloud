import { StoryAnswerT } from "@/shared/types";

export type StoryReactionsPropsT = {
  story: StoryAnswerT | null;
};
export interface ReactionItem {
  story_id: string;
  user_id_reaction: string;
  reaction_emoji: string;
  timestamp: string;
  user_id: string;
  user_handle: string;
  user_name: string;
  user_photo: string;
}

// Type for user reactions response from API
export interface UserReactionsResponse {
  items: ReactionItem[];
  last_evaluated_key: string | null;
}



export type BookmarkT = {
  story_id: string;
  user_id: string;
};

export type UserBookmarksResponseT = {
  items: BookmarkT[];
  last_evaluated_page_size: number;
  current_page_number: number;
};