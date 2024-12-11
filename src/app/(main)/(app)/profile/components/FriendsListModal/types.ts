export type FriendsListT = {
  items: FriendT[];
  last_evaluated_key?: { user_id: string };
};

export type FriendT = {
  user_id: string;
  friend_id: string;
  since: string;
  friend_status: string;
  close_friends: boolean;
  friend_profile_image: string;
  friend_user_name: string;
  friend_user_handle: string;
};
