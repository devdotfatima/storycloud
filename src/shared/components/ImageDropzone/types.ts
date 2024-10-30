export type ImageDropzonePropsT = {
  selectedImage: File | null;
  onImageSelect: (file: File | null) => void;
  index: number;
};
