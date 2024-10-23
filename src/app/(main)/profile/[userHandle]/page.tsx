"use client";
import { useParams } from "next/navigation";
import React from "react";
import ProfileView from "../components/ProfileView";
import { profiles } from "@/shared/consts";

const Profile = () => {
  const { userHandle } = useParams();
  const profile = profiles.find((profile) => profile.userHandle === userHandle);

  // If no profile is found, you can display a fallback or 404 message
  if (!profile) {
    return <p>Profile not found!</p>;
  }

  return (
    <ProfileView
      userId={profile.userId.toString()}
      userName={profile.userName}
      userHandle={profile.userHandle}
      userBio={profile.userBio}
      postCount={profile.postCount}
      friendCount={profile.friendCount}
      isFriend={profile.isFriend}
      profileImage={profile.profileImage} // Assuming ProfileView supports image rendering
    />
  );
};

export default Profile;
