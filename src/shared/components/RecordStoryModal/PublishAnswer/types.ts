import { Controls } from "@/shared/types";

export type AnswerAndStatsPropsT = {
  recorderControls?: Controls;
  goToPreviousStep?: () => void;
  showUploadImageScreen?: boolean;
  handleShowUploadImageScreen?: () => void;
};

export type PublishAnswerPropsT = {
  recorderControls: Controls;
  goToPreviousStep: () => void;
};
