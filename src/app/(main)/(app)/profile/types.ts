import { UserT } from "@/shared/types";
import { StaticImageData } from "next/image";

export type ProfileViewPropsT = {
  userId: string; // Assuming userId can be null for the edit profile case
  userName: string;
  userHandle: string;
  userBio: string;
  postCount: number;
  friendCount: number;
  isFriend?: boolean;
  profileImage: StaticImageData | string;
  loggedInUser: UserT;
};

export type UserStoriesPropsT = {
  userId: string;
  loggedInUser: UserT;
};
