export type StoryRequestModalPropsT = {
  // handleStorySentClose: () => void;
  isFriend: boolean;
};

export type RequestStoryFormPropsT = {
  onSend: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
};

export type StoryRequestSentPropsT = {
  onClose: () => void;
  storyRequest: string;
};
