import { Controls } from "@/shared/types";

export type RecordAnswerPropsT = {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  recorderControls: Controls;
};
