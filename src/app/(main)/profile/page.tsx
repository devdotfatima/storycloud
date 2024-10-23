import React from "react";
import ProfileView from "./components/ProfileView";
import ProfileImage from "../../../assets/images/profile_image.png";

const Profile = () => {
  return (
    <ProfileView
      userId={null}
      userName="Lauren Li"
      userHandle="lauren_li"
      userBio="Foodie, wine lover, and world traveler. Join me on a culinary adventure as we dive into different flavors across the world!"
      postCount={15}
      friendCount={15}
      profileImage={ProfileImage}
    />
  );
};

export default Profile;
