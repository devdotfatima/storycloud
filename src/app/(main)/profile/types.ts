export type ProfileViewPropsT = {
  userId: string | null; // Assuming userId can be null for the edit profile case
  userName: string;
  userHandle: string;
  userBio: string;
  postCount: number;
  friendCount: number;
};
