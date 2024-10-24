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
