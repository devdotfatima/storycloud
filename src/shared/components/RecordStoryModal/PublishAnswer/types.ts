import { Controls } from "@/shared/types";

export type AnswerAndStatsPropsT = {
  recorderControls: Controls;
  goToPreviousStep: () => void;
};

export type PublishAnswerPropsT = {
  recorderControls: Controls;
  goToPreviousStep: () => void;
};
