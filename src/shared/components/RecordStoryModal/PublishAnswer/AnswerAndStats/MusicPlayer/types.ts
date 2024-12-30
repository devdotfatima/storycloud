import { StoryAnswerT } from "@/shared/types";

export type MusicPlayerPropsT = {
  soundURL: string | undefined;
  clearCanvas: (() => void) | undefined;
  stopRecording: (() => void) | undefined;
  isEditing: boolean;
  goToPreviousStep: (() => void) | undefined;
  story: StoryAnswerT | null;
};
