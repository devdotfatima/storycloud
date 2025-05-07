"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UploadIcon from "@/assets/icons/image_file_input.svg";
import { StoryCardPropsT } from "./types";
import { formatDate } from "@/lib/formatDate";
import UserIcon from "@/assets/icons/user-purple.svg";
import { timeAgo } from "@/lib/timeAgo";

const StoryCard = ({ story }: StoryCardPropsT) => {
  const imageArray = Object.values(story.story_images ?? {});

  return (
    <div className="flex flex-col sm:h-[610px] max-w-[400px] sm:max-w-[500px] w-full  p-4 sm:p-6 bg-white gap-3 sm:gap-6 rounded-2xl ">
      <div className=" flex items-center gap-2.5 sm:gap-3 text-sm sm:text-lg">
        <Link
          href={`/profile/${story.user_id}`}
          className=" flex items-center gap-3"
        >
          <Image
            src={story.user_profile_image || UserIcon}
            alt="profile"
            height={40}
            width={40}
            className="rounded-full w-6 h-6 sm:w-10 sm:h-10"
          />
          <span>{story.user_handle}</span>
        </Link>

        <time dateTime={story.creation_time} className="text-grey font-medium">
          {timeAgo(story.creation_time || new Date())}
        </time>
      </div>
      <Link
        href={`/story/${story.story_id}/${story.user_id}`}
        passHref
        className="h-full"
      >
        {story.story_images && Object.keys(story.story_images).length > 0 ? (
          <div className=" flex flex-col gap-3 items-center h-full ">
            <div className="w-full max-h-64 min-h-64 sm:max-h-96 sm:h-full h-96 md:min-h-64 md:h-full lg:min-h-56 xl:lg:min-h-72 rounded-xl flex flex-col items-center justify-center bg-purple-100 sm:bg-white cursor-pointer">
              <Image
                src={imageArray[0]}
                alt="cover picture for story"
                height={"100"}
                width={"100"}
                className="rounded-2xl h-full w-full object-contain"
              />
            </div>
          </div>
        ) : (
          <div className=" flex flex-col gap-3 items-center h-full  ">
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
        href={`/story/${story.story_id}/${story.user_id}`}
        passHref
        className="font-crimson text-xl sm:text-3xl font-medium"
      >
        {story.story_title}
      </Link>
      <time suppressHydrationWarning
        dateTime="2024-10-17"
        className=" text-sm sm:text-lg text-purple font-medium"
      >
        {formatDate(story.creation_time)}
      </time>
    </div>
  );
};

export default StoryCard;
