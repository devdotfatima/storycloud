import Image from "next/image";
import React, { Suspense } from "react";
import BookImage from "@/assets/images/book.png";
import CatOnWallImage from "@/assets/images/cat_on_wall.png";
import QuestionsFromFriends from "./components/QuestionsFromFriends";
import { Loader } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col gap-10 pl-8 md:pl-16 xl:pl-28 md:py-10  sm:mb-0 overflow-y-auto h-full ">
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

      <div className="flex flex-col gap-6 h-full">
        <h3 className="text-purple">questions from your friends</h3>
        <Suspense
          fallback={
            <Loader fill="#6A6FD5" className="mx-auto my-auto animate-spin" />
          }
        >
          <QuestionsFromFriends />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
