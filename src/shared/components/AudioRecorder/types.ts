import { Controls } from "./../../../../node_modules/react-voice-visualizer/dist/types/types.d";
export type AudioRecorderT = {
  formattedRecordingDuration: string;
  recordingTime: number;
  recorderControls: Controls;
  isRecording: boolean;
  isPaused: boolean;
  toggleRecording: () => void;
  handleRestart: () => void;
  handleDelete: () => void;
};

export type DeleteAudioModalT = { handleDelete: () => void };
export type RestartAudioModalT = {
  handleRestart: () => void;
};
