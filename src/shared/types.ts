import { StaticImageData } from "next/image";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

export type MainLayoutPropsT = {
  children: React.ReactNode;
  modal: React.ReactNode;
};
export type LayoutPropsT = {
  children: React.ReactNode;
};

export type MediaAudioTrackConstraintsT = Pick<
  MediaTrackConstraints,
  | "deviceId"
  | "groupId"
  | "autoGainControl"
  | "channelCount"
  | "echoCancellation"
  | "noiseSuppression"
  | "sampleRate"
  | "sampleSize"
>;

export interface Controls {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  isRecordingInProgress: boolean;
  isPausedRecording: boolean;
  audioData: Uint8Array;
  recordingTime: number;
  mediaRecorder: MediaRecorder | null;
  duration: number;
  currentAudioTime: number;
  audioSrc: string;
  isPausedRecordedAudio: boolean;
  isProcessingRecordedAudio: boolean;
  isCleared: boolean;
  isAvailableRecordedAudio: boolean;
  recordedBlob: Blob | null;
  bufferFromRecordedBlob: AudioBuffer | null;
  formattedDuration: string;
  formattedRecordingTime: string;
  formattedRecordedAudioCurrentTime: string;
  startRecording: () => void;
  togglePauseResume: () => void;
  stopRecording: () => void;
  saveAudioFile: () => void;
  clearCanvas: () => void;
  setCurrentAudioTime: Dispatch<SetStateAction<number>>;
  error: Error | null;
  isProcessingOnResize: boolean;
  isProcessingStartRecording: boolean;
  isPreloadedBlob: boolean;
  setPreloadedAudioBlob: (blob: Blob) => void;
  _setIsProcessingAudioOnComplete: Dispatch<SetStateAction<boolean>>;
  _setIsProcessingOnResize: Dispatch<SetStateAction<boolean>>;
}

export type mockCommentT = {
  id: number;
  profileImage: StaticImageData;
  user: string;
  comment: string;
  createdAt: string;
};

export type UserT = {
  user_name: string;
  user_email: string;
  user_handle: string;
  formatted_username_and_handle: string;
  user_id: string;
  phone_number: string | null;
  birthday: string | null;
  user_password: string | null;
  creation_time: string;
  user_bio: string;
  user_profile_image: string | null;
  num_friends: number;
  num_stories_posted: number;
  jwt_token: string | null;
};

export type StoryAnswerStoryRequestT = {
  request_id: string;
  receiver_id: string;
  requestor_id: string;
  request_text: string;
  creation_time: string;
};

export type StoryRequestT = {
  receiver_id: string;
  requestor_id: string;
  story_id: string;
  request_id: string;
  creation_time?: string;
  request_text: string;
  requestor_name: string;
  requestor_profile_image: string | null;
};

// api/story.ts
export type GetStoryParams = {
  story_id: string;
  include_audio?: boolean;
  include_transcript?: boolean;
  include_images?: boolean;
  include_synopsis?: boolean;
  userId: string;
};

export type StoryAnswerT = {
  user_id?: string; // UUID of the user who owns the story
  creation_time?: string; // ISO 8601 date string
  story_id: string; // UUID
  story_title: string;
  formatted_story_title: string;
  story_audio?: string; // Optional, URL for audio
  story_images?: Record<string, string> | Record<string, { file: File; url: string }>; 
  story_synopsis?: string; // Optional, synopsis text
  story_transcript?: string; // Optional, transcript text
  is_published: boolean;
  audience: "all_friends" | "private" | "public";
  reactions_count: number;
  comments_count: number;
  user_handle: string;
  user_profile_image: string;
};
export type FriendStatusT = {
  items: Array<{ friend_status: string }>;
};

export type CommentT = {
  comment_id: string;
  comment_text: string;

  commenter_photo: string | null;
  commenter_user_handle: string;
  creation_time: string;

  commenter_id?: string;
  story_id?: string;
};

export type searchStoriesT = {
  stories: StoryAnswerT[];
  last_evaluated_key?: {
    story_id: string;
    creation_time: string;
    user_id: string;
  };
};
