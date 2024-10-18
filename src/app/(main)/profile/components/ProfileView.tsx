// components/ProfileView.tsx
"use client";
import Image from "next/image";
import React from "react";
import StoryCard from "@/shared/components/StoryCard";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { ProfileViewPropsT } from "../types";
import FriendsListModal from "./FriendsListModal";

const ProfileView = ({
  userId,
  userName,
  userHandle,
  userBio,
  postCount,
  friendCount,
}: ProfileViewPropsT) => {
  return (
    <div className="flex flex-col items-center min-h-screen px-5 py-10 font-normal md:px-16 gap-5 md:gap-11 bg-lightBlue font-mukta overflow-y-auto h-full">
      <div className="flex flex-col gap-2 text-center items-center sm:gap-5 w-full">
        {/* ProfileView Image */}
        <Image
          height={120}
          width={120}
          src={"/profile_image.png"}
          alt="ProfileView"
          className="w-24 h-24 mx-auto rounded-full"
        />
        {/* Name */}
        <h1 className="text-2xl font-medium font-crimson">{userName}</h1>
        {/* Username */}
        <p className="font-medium text-purple">@{userHandle}</p>

        {/* Bio */}
        <p className="font-light text-base md:text-xl max-w-96">{userBio}</p>
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
            <button className=" py-2 mt-2 max-w-60 w-full bg-white rounded-2xl text-purple">
              add friend
            </button>
            <button className=" py-2 mt-2 max-w-60 w-full bg-white rounded-2xl text-purple">
              request story
            </button>
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

      {userId ? (
        <div className="bg-white max-w-[1100px] gap-5 w-full h-[400px] md:h-[550px] flex flex-col justify-center items-center rounded-2xl">
          <Image src={"/lock-grey.svg"} alt="dsj" height={60} width={60} />
          <h3 className="text-grey text-xl max-w-60 text-center">
            send me a friend request to view my stories!
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:gap-20  max-w-[1100px] w-full lg:grid-cols-2">
          {[1, 2, 3, 4, 5, 6].map((recipe) => (
            <StoryCard
              key={recipe}
              // {...recipe}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileView;
