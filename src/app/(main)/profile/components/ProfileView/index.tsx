// components/ProfileView.tsx
"use client";
import Image from "next/image";
import React, { useState } from "react";
import StoryCard from "@/shared/components/StoryCard";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { ProfileViewPropsT } from "../../types";
import FriendsListModal from "../FriendsListModal";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/lib/utils";
import StoryRequestModal from "./StoryRequestModal";
import LockGreyIcon from "../../../../../assets/icons/lock-grey.svg";
import { mockStories } from "@/shared/consts";

const ProfileView = ({
  userId,
  userName,
  userHandle,
  userBio,
  postCount,
  friendCount,
  isFriend = false,
  profileImage,
}: ProfileViewPropsT) => {
  const [hasSentRequest, setHasSentRequest] = useState(false);
  return (
    <div className="flex flex-col items-center  px-5 py-10 font-normal md:px-16 gap-5 md:gap-11 bg-lightBlue font-mukta overflow-y-auto h-full">
      <div className="flex flex-col gap-2 text-center items-center sm:gap-5 w-full">
        {/* ProfileView Image */}
        <Image
          height={120}
          width={120}
          src={profileImage}
          alt="ProfileView"
          className="w-24 h-24 mx-auto object-cover rounded-full"
        />
        {/* Name */}
        <h1 className="text-2xl font-medium font-crimson">{userName}</h1>
        {/* Username */}
        <p className="font-medium text-purple">@{userHandle}</p>

        {/* Bio */}
        <p className=" text-base md:text-xl max-w-96">{userBio}</p>
        {/* Stats */}
        <div className="flex justify-between text-purple text-xl max-w-64 w-full">
          <p>{postCount} posts</p>
          <Dialog>
            <DialogTrigger asChild>
              <button className="font-normal">{friendCount} friends</button>
            </DialogTrigger>
            <FriendsListModal />
          </Dialog>
        </div>

        {userId ? (
          <div className="flex gap-10 w-full items-center justify-center">
            {isFriend ? (
              <Select>
                <SelectTrigger className="flex text-base sm:text-xl items-center  justify-between  max-w-60 w-full py-[16px] sm:py-[22px] mt-2 sm:pr-3 pl-[14%] sm:pl-[68px] text-center text-grey bg-white outline-none rounded-2xl">
                  <SelectValue placeholder="friends" />
                </SelectTrigger>
                <SelectContent className=" w-full overflow-auto  rounded-2xl border-0 h-full  ring-0 focus:outline-none p-0  bg-transparent">
                  <button
                    className={cn(
                      "relative flex w-full h-12 rounded-2xl bg-purple-400 text-white justify-center cursor-pointer select-none  border-0 items-center px-10  outline-none transition-all p-0"
                    )}
                  >
                    unfriend
                  </button>
                </SelectContent>
              </Select>
            ) : (
              <>
                {hasSentRequest ? (
                  <Select>
                    <SelectTrigger className="flex text-base sm:text-xl items-center  justify-between  max-w-60 w-full py-[16px] sm:py-[22px] mt-2 sm:pr-3 pl-[10vw] sm:pl-[68px] text-center text-grey bg-white outline-none rounded-2xl">
                      <SelectValue placeholder="requested" />
                    </SelectTrigger>
                    <SelectContent className=" w-full overflow-auto  rounded-2xl border-0 h-full  ring-0 focus:outline-none p-0  bg-transparent">
                      <button
                        onClick={() => {
                          setHasSentRequest(false);
                        }}
                        className={cn(
                          "relative flex w-full h-12 rounded-2xl bg-purple-400 text-white justify-center cursor-pointer select-none  border-0 items-center px-10  outline-none transition-all p-0"
                        )}
                      >
                        cancel request
                      </button>
                    </SelectContent>
                  </Select>
                ) : (
                  <button
                    onClick={() => setHasSentRequest(true)}
                    className=" py-2 mt-2 max-w-60 w-full bg-white rounded-2xl text-purple"
                  >
                    add friend
                  </button>
                )}
              </>
            )}

            {/*  */}
            <StoryRequestModal isFriend={isFriend} />
          </div>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-6  max-w-96 py-2 mt-2 font-medium bg-white rounded-2xl text-purple w-full">
                edit profile
              </button>
            </DialogTrigger>
            {/* <UserProfileModal /> */}
          </Dialog>
        )}
      </div>

      {userId && !isFriend ? (
        <div className="bg-white max-w-[1100px] gap-5 w-full h-[400px] md:h-[550px] flex flex-col justify-center items-center rounded-2xl">
          <Image src={LockGreyIcon} alt="dsj" height={60} width={60} />
          <h3 className="text-grey text-xl max-w-60 text-center">
            send me a friend request to view my stories!
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:gap-20 max-w-[1100px] w-full h-fit lg:grid-cols-2">
          {mockStories
            .filter((story) => story.isMyStory) // Filter stories that are the user's
            .map((story, index) => (
              <div
                className="mx-auto justify-center items-center flex w-full"
                key={index}
              >
                <StoryCard story={story} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProfileView;
