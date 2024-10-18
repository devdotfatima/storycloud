"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import StoryCard from "@/shared/components/StoryCard";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";

const Profile = () => {
  const { userId } = useParams();

  return (
    <div className="flex flex-col items-center min-h-screen px-5 py-10 font-normal md:px-16 gap-5 md:gap-11 bg-lightBlue font-mukta">
      <div className="flex flex-col gap-2 text-center  items-center sm:gap-5 w-full">
        {/* Profile Image */}
        <Image
          height={120}
          width={120}
          src={"/profile_image.png"}
          alt="Profile"
          className="w-24 h-24 mx-auto rounded-full"
        />
        {/* Name */}
        <h1 className="text-2xl font-medium font-crimson  ">Lauren Li</h1>
        {/* Username */}
        <p className="font-medium text-purple ">@lauren_li</p>

        {/* Bio */}
        <p className=" font-light text-base md:text-xl max-w-96 ">
          Foodie, wine lover, and world traveler. Join me on a culinary
          adventure as we dive into different flavors across the world!
        </p>
        {/* Stats */}
        <div className="flex justify-between text-purple text-xl max-w-64 w-full">
          <p>15 posts</p>

          <Dialog>
            <DialogTrigger asChild>
              <button className="font-normal">15 friends</button>
            </DialogTrigger>
            {/* <FollowersModal /> */}
          </Dialog>
        </div>
        {/* Follow Button */}

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
              <button className="px-6 py-2 mt-2 font-medium bg-white rounded-2xl text-purple w-full">
                edit profile
              </button>
            </DialogTrigger>
            {/* <UserProfileModal /> */}
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-20 lg:grid-cols-2">
        {[1, 2, 3, 4, 5, 6].map((recipe) => (
          <StoryCard
            key={recipe}
            // {...recipe}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
