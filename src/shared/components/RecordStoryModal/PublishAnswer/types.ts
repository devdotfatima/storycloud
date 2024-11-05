import { Controls } from "@/shared/types";

export type AnswerAndStatsPropsT = {
  recorderControls?: Controls;
  goToPreviousStep?: () => void;
  showUploadImageScreen?: boolean;
  handleShowUploadImageScreen?: () => void;
  isEditing: boolean;
  toggleEditMode: () => void;
};

export type PublishAnswerPropsT = {
  recorderControls: Controls;
  goToPreviousStep: () => void;
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
