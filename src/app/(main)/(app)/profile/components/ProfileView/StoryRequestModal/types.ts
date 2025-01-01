export type StoryRequestModalPropsT = {
  // handleStorySentClose: () => void;
  isFriend: boolean;
};

export type RequestStoryFormPropsT = {
  onSend: () => void;
};

export type StoryRequestSentPropsT = {
  onClose: () => void;
  storyRequest: string;
};
