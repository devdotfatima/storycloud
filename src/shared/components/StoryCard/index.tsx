import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const StoryCard = (props: Props) => {
  //  w-full
  return (
    <div className="flex flex-col sm:h-[610px] max-w-[400px] sm:max-w-[500px] w-full  p-4 sm:p-6 bg-white gap-3 sm:gap-6 rounded-2xl ">
      <div className=" flex items-center gap-2.5 sm:gap-3 text-sm sm:text-lg">
        <Link href={"/"} className=" flex items-center gap-3">
          {" "}
          <Image
            src={"/profile_image.png"}
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
      <div className="">
        <Image
          src={"/story_cover.png"}
          alt="cover picture for  story"
          height={"100"}
          width={"100"}
          className="rounded-2xl w-full h-60 sm:h-[339px] "
        />
      </div>
      <h3 className="font-crimson text-xl sm:text-3xl font-medium">
        What is your favorite travel destination?{" "}
      </h3>
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
