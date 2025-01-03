export type StoryRequestModalPropsT = {
  // handleStorySentClose: () => void;
  isFriend: boolean;
};

export type RequestStoryFormPropsT = {
  onSend: () => void;
  setRequest: React.Dispatch<React.SetStateAction<string>>;
  setRequestId: React.Dispatch<React.SetStateAction<string | null>>;
};

export type StoryRequestSentPropsT = {
  onClose: () => void;
  storyRequest: string;
  requestId: string | null;
};
