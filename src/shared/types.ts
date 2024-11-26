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

export type mockStoryT = {
  id: number;
  title: string;
  audioClip: string;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  transcript: string;
  comments: mockCommentT[];
  storyImages: StaticImageData[];
  isMyStory: boolean;
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
