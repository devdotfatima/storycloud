import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col gap-10 pl-8 md:pl-16 xl:pl-28 py-10 mb-6 sm:mb-0 ">
      <div className="flex flex-col md:flex-row gap-8 pr-8 md:pr-16 xl:pr-28 ">
        <div className="flex flex-col gap-3 lg:gap-6 md:w-1/2">
          <h2 className="text-purple">freestyle</h2>
          <Image
            src={"/book.png"}
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
              src={"/cat_on_wall.png"}
              alt="cat image"
              className="rounded-2xl h-96 w-full object-cover"
              layout="responsive"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="text-purple">questions from your friends</h3>
        <div className="flex gap-10 overflow-x-auto">
          {Array.from({ length: 10 }, (_, index) => (
            <div
              key={index}
              className="flex flex-col p-5 gap-10 bg-white min-w-80 w-full rounded-xl h-[320px] cursor-pointer hover:scale-95 transition-all ease-in duration-300"
            >
              <div className="flex items-center gap-4 font-medium">
                <Image
                  className="rounded-full h-16 w-16"
                  src={"/profile_image.png"}
                  alt="profile image"
                  width={60}
                  height={60}
                />
                <p className="text-purple">candice_li</p>
              </div>

              <h4 className="font-crimson text-4xl">How did you meet dad?</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
