export type UploadStoryImagesPropsT = {
  onToggleUploadImageScreen: () => void;
  handleImageSelect: (file: File | null, index: number) => void;
  images: (File | null)[];
};
