"use client";
import { Loader } from "lucide-react";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProfileView from "../components/ProfileView";
import UserProfile from "@/assets/icons/user-purple.svg";
import { UserT } from "@/shared/types";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { fetchUser } from "./actions";

const Profile = () => {
  const router = useRouter();
  const { userHandle } = useParams();
  const loggedInUser = useSessionContext();
  const handle = typeof userHandle === "string" ? userHandle : "";

  const {
    data: userData,
    error,
    isLoading,
  } = useQuery<UserT | { error: string }>({
    queryKey: ["user", handle],
    queryFn: () => fetchUser(handle, loggedInUser),
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

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  if (userData && "error" in userData) {
    return <p className="text-red-500">Error: {userData.error}</p>;
  }

  const user = userData as UserT;

  if (!user) {
    return <p>User not found.</p>;
  }

  if (!loggedInUser) {
    router.push("/login");
    return null; // Prevent rendering during the redirect
  }

  return (
    <ProfileView
      loggedInUser={loggedInUser}
      userId={user.user_id}
      userName={user.user_name}
      userHandle={user.user_handle}
      userBio={user.user_bio}
      postCount={user.num_stories_posted}
      friendCount={user.num_friends}
      isFriend={false}
      profileImage={user.user_profile_image || UserProfile}
    />
  );
};

export default Profile;
