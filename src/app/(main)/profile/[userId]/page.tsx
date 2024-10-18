"use client";
import { useParams } from "next/navigation";
import React from "react";
import ProfileView from "../components/ProfileView";

const Profile = () => {
  const { userId } = useParams();
  const userName = "Lauren Li"; // Replace with fetched data
  const userHandle = "lauren_li"; // Replace with fetched data
  const userBio =
    "Foodie, wine lover, and world traveler. Join me on a culinary adventure as we dive into different flavors across the world!";
  const postCount = 15; // Replace with fetched data
  const friendCount = 15;

  return (
    <ProfileView
      userId={userId.toString()}
      userName={userName}
      userHandle={userHandle}
      userBio={userBio}
      postCount={postCount}
      friendCount={friendCount}
    />
  );
};

export default Profile;
