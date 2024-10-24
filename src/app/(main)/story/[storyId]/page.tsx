// import Image from "next/image";
import React from "react";

const Story = () => {
  console.log("sad.,m.");

  return (
    <div className="bg-transparent w-full  h-[100svh] sm:h-[90svh]  lg:overflow-hidden sm:max-w-[600px] lg:max-h-[600px]  pt-[20px] lg:pr-10 border-0 outline-none rounded-2xl ">
      <div className="flex flex-col items-center w-full h-full  py-6  px-5 sm:px-10 mx-auto overflow-hidden bg-white shadow-md rounded-t-2xl sm:rounded-2xl gap-5 lg:gap-7 lg:py-10 justify-between  ">
        <h2 className="text-purple ">your story has been sent!</h2>
      </div>
    </div>
  );
};

export default Story;
