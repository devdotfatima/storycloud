import Link from "next/link";
import Image from "next/image";
import React from "react";
import { DialogContent, DialogClose } from "@/shared/components/ui/dialog";
import { profiles } from "@/shared/consts";
import ClosePurpleIcon from "../../../../assets/icons/close-purple.svg";

const FriendsListModal = () => {
  return (
    <DialogContent className="bg-transparent w-full  h-[88svh] lg:h-[90svh]  lg:overflow-hidden sm:max-w-[640px] lg:max-h-[999px]  pt-[20px] lg:pr-10 border-0 outline-none rounded-2xl ">
      <DialogClose className="absolute z-50 p-0 rounded-full cursor-pointer top-2 right-4 outline-none  w-fit lg:top-5 lg:-right-0 bg-white">
        <Image src={ClosePurpleIcon} alt="Close" className="w-6 h-6" />
      </DialogClose>
      <div className="flex flex-col items-center w-full h-full gap-2 py-6 pl-6 pr-1 mx-auto overflow-hidden text-xl  bg-white shadow-md rounded-t-2xl sm:rounded-2xl lg:gap-6 lg:py-10 lg:pl-10 ">
        <h2>friends</h2>
        <hr className="w-full border-spacing-1.5 border-purple-100 mr-4 lg:mr-10" />
        <div className="flex flex-col w-full h-full gap-4 overflow-y-auto xl:h-fit ">
          {profiles
            .filter((profile) => profile.isFriend) // Only display friends
            .map((profile) => (
              <Link
                key={profile.userId}
                href={`${profile.userHandle}`}
                className="flex items-center gap-3"
              >
                <Image
                  src={profile.profileImage}
                  alt="User avatar"
                  height={88}
                  width={88}
                  className="mr-3 rounded-full w-[64px] h-[64px] sm:w-[88px] sm:h-[88px]"
                />
                <div className="flex flex-col justify-between gap-1.5 sm:gap-3">
                  <p className="text-xl font-medium font-crimson">
                    {profile.userName}
                  </p>
                  <p className=" text-purple">@{profile.userHandle}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </DialogContent>
  );
};

export default FriendsListModal;
