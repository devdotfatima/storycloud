"use client";
import { Loader } from "lucide-react";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProfileView from "../components/ProfileView";
import UserProfile from "@/assets/icons/user-purple.svg";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { fetchUser } from "./actions";
import { getFriendStatus } from "../components/ProfileView/FriendRequestButton/actions";
import { FriendStatusT, UserT } from "@/shared/types";

const Profile = () => {
  const router = useRouter();
  const { userHandle } = useParams();
  const loggedInUser = useSessionContext();
  const handle = typeof userHandle === "string" ? userHandle : "";

  const {
    data: userData,
    error,
    isLoading,
    refetch: refetchUserData,
  } = useQuery({
    queryKey: ["user", handle],
    queryFn: async () => {
      if (!handle || !loggedInUser) return { user: null, friendStatus: null };

      const [user, friendStatus] = await Promise.all([
        fetchUser(handle, loggedInUser),
        getFriendStatus(handle, loggedInUser),
      ]);
      return { user, friendStatus };
    },
    enabled: !!userHandle && !!loggedInUser?.jwt_token,
  });

  if (!userHandle) {
    return <p>Error: User handle not found in the URL.</p>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error || !userData) {
    return (
      <p className="text-red-500">
        Error: {error?.message || "Data fetch failed"}
      </p>
    );
  }

  if ("error" in userData) {
    return <p className="text-red-500">Error: {userData.error as string}</p>;
  }
  const { user, friendStatus } = userData as {
    user: UserT;
    friendStatus: FriendStatusT | null;
  };

  if (!user) {
    return <p>User not found.</p>;
  }

  if (!loggedInUser) {
    router.push("/login");
    return null; // Prevent rendering during the redirect
  }

  return (
    <ProfileView
      refetchUserData={refetchUserData}
      loggedInUser={loggedInUser}
      userId={user.user_id}
      userName={user.user_name}
      userHandle={user.user_handle}
      userBio={user.user_bio}
      postCount={user.num_stories_posted}
      friendCount={user.num_friends}
      isFriend={
        friendStatus
          ? friendStatus.items[0]?.friend_status === "accepted"
          : false
      }
      friendStatus={
        friendStatus ? friendStatus.items[0]?.friend_status : undefined
      }
      profileImage={user.user_profile_image || UserProfile}
    />
  );
};

export default Profile;
