import Image from "next/image";
import React, { Suspense } from "react";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { ProfileViewPropsT } from "../../types";
import FriendsListModal from "../FriendsListModal";
import StoryRequestModal from "./StoryRequestModal";
import LockGreyIcon from "../../../../../assets/icons/lock-grey.svg";
import FriendRequestButton from "./FriendRequestButton";
import UserStories from "./UserStories";
import { Loader } from "lucide-react";
import Link from "next/link";

type ViewerType = "self" | "friend" | "stranger";
const ProfileView = ({
  userId,
  userName,
  userHandle,
  userBio,
  postCount,
  friendCount,
  isFriend = false,
  profileImage,
  loggedInUser,
}: ProfileViewPropsT) => {
  const viewerType: ViewerType = loggedInUser
    ? "self"
    : isFriend
    ? "friend"
    : "stranger";

  return (
    <div className="flex flex-col items-center  px-5 py-10 font-normal md:px-16 gap-5 md:gap-11 bg-lightBlue font-mukta overflow-y-auto h-full">
      <div className="flex flex-col gap-2 text-center items-center sm:gap-5 w-full">
        {/* ProfileView Image */}
        <Image
          height={120}
          width={120}
          src={profileImage}
          alt="ProfileView"
          priority
          className="w-24 h-24 mx-auto object-cover rounded-full"
        />
        {/* Name */}
        <h1 className="text-2xl font-medium font-crimson">{userName}</h1>
        {/* Username */}
        <p className="font-medium text-purple">@{userHandle}</p>

        {/* Bio */}
        <p className=" text-base md:text-xl max-w-96">{userBio}</p>
        {/* Stats */}
        <div className="flex justify-between text-purple text-xl max-w-44 sm:max-w-64 w-full">
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-medium">
            {postCount} posts
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button className=" text-base sm:text-lg lg:text-xl xl:text-2xl">
                {friendCount} friends
              </button>
            </DialogTrigger>
            <FriendsListModal />
          </Dialog>
        </div>

        {viewerType === "self" ? (
          <Dialog>
            <DialogTrigger asChild>
              <Link
                href="/profile/edit"
                className="px-6  max-w-96 py-2 mt-2 font-medium bg-white rounded-2xl text-purple w-full"
              >
                edit profile
              </Link>
            </DialogTrigger>
            {/* <UserProfileModal /> */}
          </Dialog>
        ) : (
          <div className="flex gap-10 w-full items-center justify-center">
            <FriendRequestButton isFriend={isFriend} />

            <StoryRequestModal isFriend={isFriend} />
          </div>
        )}
      </div>

      {viewerType === "stranger" ? (
        <div className="bg-white max-w-[1100px] gap-5 w-full h-[400px] md:h-[550px] flex flex-col justify-center items-center rounded-2xl">
          <Image src={LockGreyIcon} alt="dsj" height={60} width={60} />
          <h3 className="text-grey text-xl max-w-60 text-center">
            send me a friend request to view my stories!
          </h3>
        </div>
      ) : (
        <Suspense
          fallback={
            <Loader fill="#6A6FD5" className="mx-auto my-auto animate-spin" />
          }
        >
          <UserStories userId={userId} />
        </Suspense>
      )}
    </div>
  );
};

export default ProfileView;
