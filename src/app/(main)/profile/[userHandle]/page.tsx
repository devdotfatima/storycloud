import React from "react";
import ProfileView from "../components/ProfileView";
import { getUser } from "./actions";
import UserProfile from "../../../../assets/icons/user-purple.svg";
import { validateUser } from "@/lib/dal";

const Profile = async ({
  params,
}: {
  params: Promise<{ userHandle: string }>;
}) => {
  const userHandle = (await params).userHandle;
  const { user: loggedInUser } = await validateUser();

  const result = await getUser(userHandle);

  // Check for an error response
  if ("error" in result) {
    console.error("Error fetching user:", result.error);
    return <p>Error: {result.error}</p>;
  }

  // Extract the user object
  const { user } = result;
  if (!user) {
    return <p>User not found.</p>;
  }
  return (
    <ProfileView
      loggedInUser={loggedInUser?.user_id === user.user_id}
      userId={user.user_id}
      userName={user.user_name}
      userHandle={user.user_handle}
      userBio={user.user_bio}
      postCount={user.num_stories_posted}
      friendCount={user.num_friends}
      isFriend={false}
      profileImage={user.user_profile_image || UserProfile} // Assuming ProfileView supports image rendering
    />
  );
};

export default Profile;
