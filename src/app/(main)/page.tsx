import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-14">
      <div className=" flex gap-8">
        <div className="flex flex-col gap-6">
          <h2 className="text-purple">freestyle</h2>
          <Image
            src={"/book.png"}
            alt="book image"
            className=" rounded-2xl"
            width={594}
            height={420}
          />
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-purple">question of the week</h2>
          <div className="relative w-fit h-fit">
            <p className="absolute font-crimson font-medium text-4xl w-1/2 bottom-28 left-20">
              Tell us about your first pet!{" "}
            </p>
            <Image
              src={"/cat_on_wall.png"}
              alt="book image"
              className=" rounded-2xl"
              width={594}
              height={420}
            />
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default page;
