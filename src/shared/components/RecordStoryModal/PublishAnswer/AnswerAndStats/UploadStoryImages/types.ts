import { StoryAnswerT } from "@/shared/types";

export type UploadStoryImagesPropsT = {
  onToggleUploadImageScreen: () => void;
  handleImageSelect: (file: File | null, index: number) => void;
  images: (File | null)[];
  setStory: React.Dispatch<React.SetStateAction<StoryAnswerT | null>>;
};
