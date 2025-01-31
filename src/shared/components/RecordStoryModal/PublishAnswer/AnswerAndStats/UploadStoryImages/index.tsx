"use client";
import React from "react";
import Image from "next/image";
import ReturnPurpleIcon from "@/assets/icons/return-purple.svg";
import { UploadStoryImagesPropsT } from "./types";
import ImageDropzone from "../../../../ImageDropzone";

const UploadStoryImages = ({
  onToggleUploadImageScreen,
  images,
  handleImageSelect,
}: UploadStoryImagesPropsT) => {
  return (
    <div className="w-full flex flex-col gap-6  h-full bg-white pr-1 rounded-2xl  sm:py-6 py-4">
      <div className=" flex w-full justify-between items-center px-4 sm:px-14">
        <button className=" w-8 h-8 " onClick={onToggleUploadImageScreen}>
          <Image
            alt="go back button"
            src={ReturnPurpleIcon}
            className=" w-6 h-6"
            width={24}
            height={24}
          />
        </button>
        <button
          onClick={onToggleUploadImageScreen}
          className="w-36 h-11 bg-purple-400 hover:bg-purple text-white"
        >
          save
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-8  pl-4 px-3 sm:px-14 overflow-y-auto h-[90%] ">
        {images.map((selectedImage, index) => (
          <div
            key={index}
            className=" min-h-[340px] lg:max-h-[130px] md:h-full lg:min-h-full max-w-xl mx-auto w-full bg-purple-100 rounded-2xl flex items-center justify-center relative"
          >
            <ImageDropzone
              index={index}
              selectedImage={selectedImage}
              onImageSelect={(file) => handleImageSelect(file, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadStoryImages;
