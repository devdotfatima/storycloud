import { Controls, StoryAnswerT } from "@/shared/types";

export type AnswerAndStatsPropsT = {
  recorderControls?: Controls;
  goToPreviousStep?: () => void;
  showUploadImageScreen?: boolean;
  handleShowUploadImageScreen?: () => void;
  isEditing: boolean;
  toggleEditMode: () => void;
  onClose?: () => void;
  story?: StoryAnswerT | null;
  isFreeStyle?: boolean;
};

export type PublishAnswerPropsT = {
  recorderControls: Controls;
  goToPreviousStep: () => void;
  onClose: () => void;
  story: StoryAnswerT | null;
  isFreeStyle?: boolean;
};

export type TranscriptAndCommentsPropsT = { isEditing: boolean };

export type OptionsModalPropsT = {
  toggleEditMode: () => void;
};

export type PublishModalPropsT = {
  onClose: () => void;
};

export type CancelEditChangesModalPropsT = {
  onClose: () => void;
};
