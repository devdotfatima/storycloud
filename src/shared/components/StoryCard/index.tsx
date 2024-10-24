import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProfileImage from "../../../assets/images/profile_image.png";
import StoryCoverImage from "../../../assets/images/story_cover.png";

const StoryCard = () => {
  //  w-full
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

        <time dateTime="2024-10-14" className="text-grey font-medium">
          {" "}
          3d ago
        </time>
      </div>
      <Link href={"/story/1"} passHref>
        <Image
          src={StoryCoverImage}
          alt="cover picture for  story"
          height={"100"}
          width={"100"}
          className="rounded-2xl w-full h-60 sm:h-[339px] "
        />
      </Link>
      <Link
        href={"/story/1"}
        passHref
        className="font-crimson text-xl sm:text-3xl font-medium"
      >
        What is your favorite travel destination?{" "}
      </Link>
      <time
        dateTime="2024-10-17"
        className=" text-sm sm:text-lg text-purple font-medium"
      >
        October 17, 2024
      </time>
    </div>
  );
};

export default StoryCard;
