import { CommentT, Controls, StoryAnswerT } from "@/shared/types";

export type PublishAnswerPropsT = {
  recorderControls: Controls;
  goToPreviousStep: () => void;
  onClose: () => void;
  story: StoryAnswerT | null;
  isFreeStyle?: boolean;
  setStory: React.Dispatch<React.SetStateAction<StoryAnswerT | null>>;
};

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
  setStory: React.Dispatch<React.SetStateAction<StoryAnswerT | null>>;
};

export type TranscriptAndCommentsPropsT = {
  isEditing: boolean;
  story?: StoryAnswerT | null;
};

export type OptionsModalPropsT = {
  toggleEditMode: () => void;
  story: StoryAnswerT | null;
};

export type PublishModalPropsT = {
  onClose: () => void;
  isPublished: boolean;
  handlePublish: () => Promise<void>;
  isPublishing: boolean;
};

export type CancelEditChangesModalPropsT = {
  onClose: () => void;
};

export type CommentsPropsT = {
  story?: StoryAnswerT | null;
};

export type CommentPropT = {
  comment: CommentT;
  myStory: boolean;
};

export type commentsT = {
  items: CommentT[];
  last_evaluated_key?: { comment_id: string };
};
