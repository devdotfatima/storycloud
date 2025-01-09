import { UserT } from "@/shared/types";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
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
  friendStatus?: string;
  refetchUserData?: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      | {
          user: null;
          friendStatus: null;
        }
      | {
          user:
            | UserT
            | {
                error: string;
              };
          friendStatus: string;
        },
      Error
    >
  >;
};

export type UserStoriesPropsT = {
  userId: string;
  loggedInUser: UserT;
};

export type FriendRequestButtonPropsT = {
  friendStatus: string | undefined;
  userId: string;
  setFriendStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
  refetchUserData:
    | ((options?: RefetchOptions) => Promise<
        QueryObserverResult<
          | {
              user: null;
              friendStatus: null;
            }
          | {
              user:
                | UserT
                | {
                    error: string;
                  };
              friendStatus: string;
            },
          Error
        >
      >)
    | undefined;
};
