import { StoryAnswerT } from "@/shared/types";

export type RecordStoryModalPropsT = {
  onClose: () => void;
  isFreeStyle?: boolean;
  questionOfTheWeek?: string;
  freestyleStory?: StoryAnswerT | null;
};
