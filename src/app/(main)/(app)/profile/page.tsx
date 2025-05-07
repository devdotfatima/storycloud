"use client";
import { useRouter } from "next/navigation";
import ProfileView from "./components/ProfileView";
import ProfileImage from "@/assets/icons/user-purple.svg";
import { useSessionContext } from "@/app/providers/SessionProvider";

const Profile = () => {
  const user = useSessionContext();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null; // Prevent further rendering
  }


  return (
    <ProfileView
      loggedInUser={user}
      userId={user.user_id}
      userName={user.user_name}
      userHandle={user.user_handle}
      userBio={user.user_bio}
      postCount={user.num_stories_posted}
      friendCount={user.num_friends}
      profileImage={user.user_profile_image || ProfileImage}
    />
  );
};

export default Profile;
