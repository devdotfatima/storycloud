import Image from "next/image";
import React from "react";
import QuestionCard from "./components/QuestionCard";
import BookImage from "../../../assets/images/book.png";
import CatOnWallImage from "../../../assets/images/cat_on_wall.png";

const Page = () => {
  return (
    <div className="flex flex-col gap-10 pl-8 md:pl-16 xl:pl-28 py-10  sm:mb-0 overflow-y-auto h-full ">
      <div className="flex flex-col md:flex-row gap-8 pr-8 md:pr-16 xl:pr-28 ">
        <div className="flex flex-col gap-3 lg:gap-6 md:w-1/2">
          <h2 className="text-purple">freestyle</h2>
          <Image
            src={BookImage}
            alt="book image"
            className="rounded-2xl h-96 w-full object-cover"
            layout="responsive"
            width={400}
            height={400}
          />
        </div>

        <div className="flex flex-col gap-3 lg:gap-6 md:w-1/2">
          <h2 className="text-purple">question of the week</h2>
          <div className="relative w-full h-fit">
            <p className="absolute font-crimson font-medium text-2xl sm:text-3xl lg:text-4xl w-2/3 lg:w-1/2 top-2/3 transform -translate-y-1/2 left-1/3  -translate-x-1/3">
              Tell us about your first pet!
            </p>
            <Image
              src={CatOnWallImage}
              alt="cat image"
              className="rounded-2xl h-96 w-full object-cover"
              layout="responsive"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6  h-fit  ">
        <h3 className="text-purple">questions from your friends</h3>
        <div className="flex gap-10 pr-8 md:pr-16 pb-4 xl:pr-28 overflow-x-auto">
          {Array.from({ length: 20 }, (_, index) => (
            <QuestionCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
