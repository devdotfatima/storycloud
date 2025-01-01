export type StoryRequestModalPropsT = {
  // handleStorySentClose: () => void;
  isFriend: boolean;
};

export type RequestStoryFormPropsT = {
  onSend: () => void;
  setRequest: React.Dispatch<React.SetStateAction<string>>;
};

export type StoryRequestSentPropsT = {
  onClose: () => void;
  storyRequest: string;
};
