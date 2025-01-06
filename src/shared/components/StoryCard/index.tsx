import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProfileImage from "@/assets/images/profile_image.png";
import { StoryCardPropsT } from "./types";
import { formatDate } from "@/lib/formatDate";
import UploadIcon from "@/assets/icons/image_file_input.svg";
import { timeAgo } from "@/lib/timeAgo";

const StoryCard = ({ story }: StoryCardPropsT) => {
  return (
    <div className="flex flex-col sm:h-[610px] max-w-[400px] sm:max-w-[500px] w-full  p-4 sm:p-6 bg-white gap-3 sm:gap-6 rounded-2xl ">
      <div className=" flex items-center gap-2.5 sm:gap-3 text-sm sm:text-lg">
        <Link href={"/profile"} className=" flex items-center gap-3">
          {" "}
          <Image
            src={ProfileImage}
            alt="profile"
            height={40}
            width={40}
            className="rounded-full w-6 h-6 sm:w-10 sm:h-10"
          />
          <span>username</span>
        </Link>

        <time dateTime={story.creation_time} className="text-grey font-medium">
          {timeAgo(story.creation_time || new Date())}
        </time>
      </div>
      <Link href={`/story/${story.story_id}`} passHref className="h-full">
        {story.story_images && Object.keys(story.story_images).length > 0 ? (
          <Image
            src={story.story_images ? story.story_images.additionalProp1 : ""}
            alt="cover picture for story"
            height={"100"}
            width={"100"}
            className="rounded-2xl  h-60 w-full sm:h-[339px] object-cover"
          />
        ) : (
          <div className=" flex flex-col gap-3 items-center h-full ">
            <div className="w-full max-h-64 min-h-64 sm:max-h-96 h-full md:min-h-64 lg:min-h-56 xl:lg:min-h-72 rounded-xl flex flex-col items-center justify-center bg-purple-100 sm:bg-white cursor-pointer">
              <Image
                src={UploadIcon}
                alt="attach photo"
                height={"100"}
                width={"100"}
              />
            </div>
          </div>
        )}
      </Link>
      <Link
        href={"/story/1"}
        passHref
        className="font-crimson text-xl sm:text-3xl font-medium"
      >
        {story.story_title}
      </Link>
      <time
        dateTime="2024-10-17"
        className=" text-sm sm:text-lg text-purple font-medium"
      >
        {formatDate(story.creation_time)}
      </time>
    </div>
  );
};

export default StoryCard;
