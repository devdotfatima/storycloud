import React from "react";
import Image from "next/image";

const AnswerAndStats = () => (
  <div className="flex-1 h-full flex-col flex gap-10 bg-purple-100 p-12">
    {/* Header Section */}
    <div className="flex justify-between items-start">
      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <Image
          src={"/profile_image.png"}
          width={60}
          height={60}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className=" text-purple">lauren_li</p>
        </div>
      </div>

      {/* Publish Button */}
      <button className="px-4 py-2 bg-purple-400 text-white w-32  border-0 hover:bg-purple">
        publish
      </button>
    </div>

    {/* Question Section */}
    <div className="text-center text-3xl font-crimson font-medium bg-white w-full p-4 rounded-xl">
      What is your favorite travel destination?
    </div>

    {/* Stats (Likes, Comments, etc.) */}
    <div className="flex justify-between items-center space-x-4 ">
      <p className="text-xl text-purple">sep 17 2024</p>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Image src={"/heart.svg"} alt="likes" height={24} width={24} />
          <span>00</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src={"/message.svg"} alt="comments" height={22} width={22} />
          <span>00</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src={"/bookmark.svg"} alt="saves" height={24} width={24} />
          <span>00</span>
        </div>
      </div>
    </div>

    {/* Upload Section */}
    <div className="w-full h-96  rounded-xl flex flex-col items-center justify-center bg-white ">
      <Image
        src={"/image_file_input.svg"}
        alt="attach photo"
        width={50}
        height={50}
      />
      <p className="text-grey text-base">upload</p>
    </div>

    {/* Audio Player Controls */}
    <div className="flex flex-col items-center mt-5">
      <div className="w-full h-1 bg-gray-300 rounded-full my-2 relative">
        <div
          className="absolute left-0 h-1 bg-purple rounded-full"
          style={{ width: "50%" }}
        ></div>
      </div>
      <div className="flex justify-between w-full ">
        <span>0:00</span>
        <span>5:00</span>
      </div>

      <div className="flex justify-between w-full space-x-6 mt-10 items-center">
        <button className="flex flex-col items-center">
          <Image
            alt="restart recording"
            className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
            width={60}
            height={60}
            src={"/restart.svg"}
          />
          <span className="text-base">restart</span>
        </button>

        <button
          // onClick={toggleRecording}
          className={`w-20 h-20 md:w-24 md:h-24 lg:w-24 bg-purple-400 lg:h-24 rounded-full text-white  focus:outline-none  flex justify-center items-center`}
        >
          {/* {isRecording && !isPaused ? ( */}
          {/* <Image
              src={"/pause.svg"}
              alt="pause the recording"
              width={48}
              height={48}
              className="w-12 h-12 text-blue-500"
            /> */}
          <Image
            src={"/play.svg"}
            alt="play recording"
            width={40}
            height={30}
            className="w-12 h-10  ml-1 "
          />
          {/* ) 
            : (
            
            )} */}
        </button>

        <button className="flex flex-col items-center">
          <Image
            alt="delete recording"
            className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
            width={60}
            height={60}
            src={"/trash.svg"}
          />
          <span className="text-base">delete</span>
        </button>
      </div>
    </div>
  </div>
);

export default AnswerAndStats;
