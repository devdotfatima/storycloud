import { Controls, StoryAnswerT } from "@/shared/types";
import { RecordStoryModalPropsT } from "../types";

export type RecordAnswerPropsT = {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  recorderControls: Controls;
  story: StoryAnswerT | null;
  setStory: React.Dispatch<React.SetStateAction<StoryAnswerT | null>>;
} & RecordStoryModalPropsT;
