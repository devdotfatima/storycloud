import React from "react";
import Image from "next/image";
import UploadImagePurpleIcon from "@/assets/icons/image_file_input-purple.svg";
import TrashPurpleIcon from "@/assets/icons/trash-purple.svg";
import { ImageDropzonePropsT } from "./types";

const index = ({
  selectedImage,
  index,
  onImageSelect,
}: ImageDropzonePropsT) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onImageSelect(file);
  };

  const handleRemoveImage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onImageSelect(null);
  };

  return (
    <>
      <label
        htmlFor={`dropzone-file-${index}`}
        className={`flex flex-col items-center justify-center w-full h-full rounded-lg overflow-hidden cursor-pointer ${
          selectedImage ? " pointer-events-none object-cover" : "bg-purple-100"
        }  `}
      >
        {selectedImage ? (
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="upload image"
            width={576}
            height={384}
            objectFit="cover"
            className="h-96 max-w-xl w-full"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 pt-5 pb-6">
            <Image src={UploadImagePurpleIcon} alt="upload image" />
            <span className="text-purple font-medium">upload</span>
          </div>
        )}
        <input
          id={`dropzone-file-${index}`}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </label>
      {selectedImage ? (
        <button
          onClick={handleRemoveImage}
          className="absolute rounded-full bg-white top-4 right-4 p-1.5 z-50"
        >
          <Image src={TrashPurpleIcon} alt="remove image" />
        </button>
      ) : null}
    </>
  );
};

export default index;
