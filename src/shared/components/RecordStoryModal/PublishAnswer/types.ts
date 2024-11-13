import { Controls } from "@/shared/types";

export type AnswerAndStatsPropsT = {
  recorderControls?: Controls;
  goToPreviousStep?: () => void;
  showUploadImageScreen?: boolean;
  handleShowUploadImageScreen?: () => void;
  isEditing: boolean;
  toggleEditMode: () => void;
  onClose?: () => void;
};

export type PublishAnswerPropsT = {
  recorderControls: Controls;
  goToPreviousStep: () => void;
  onClose: () => void;
};

export type TranscriptAndCommentsPropsT = { isEditing: boolean };

export type OptionsModalPropsT = {
  toggleEditMode: () => void;
};

export type MusicPlayerPropsT = {
  soundURL: string;
  clearCanvas: (() => void) | undefined;
  stopRecording: (() => void) | undefined;
  isEditing: boolean;
  goToPreviousStep: (() => void) | undefined;
};

export type PublishModalPropsT = {
  onClose: () => void;
};

export type CancelEditChangesModalPropsT = {
  onClose: () => void;
};
