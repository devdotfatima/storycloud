import React from "react";
import ProfileView from "./components/ProfileView";
import ProfileImage from "@/assets/icons/user-purple.svg";
import { validateUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const Profile = async () => {
  const { user } = await validateUser();
  if (!user) redirect("/login");

  return (
    <ProfileView
      loggedInUser={true}
      userId={user.user_id}
      userName={user.user_name}
      userHandle={user.user_handle}
      userBio={user.user_bio}
      postCount={user.num_stories_posted}
      friendCount={user.num_stories_posted}
      profileImage={user.user_profile_image || ProfileImage}
    />
  );
};

export default Profile;
