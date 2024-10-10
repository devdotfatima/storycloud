export type AudioRecorderT = {
  elapsedTime: number;
  isRecording: boolean;
  isPaused: boolean;
  toggleRecording: () => void;
  formatTime: (time: number) => string;
  handleRestart: () => void;
  handleDelete: () => void;
};

export type DeleteAudioModalT = { handleDelete: () => void };
export type RestartAudioModalT = {
  handleRestart: () => void;
};
