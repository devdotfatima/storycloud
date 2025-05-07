import { UserT } from "@/shared/types";
import { FriendsListT } from "./types";

export const fetchFriends = async (
  user: UserT | null,
  pageParam: { user_id: string } | null,

  userId = ""
): Promise<FriendsListT> => {
  if (!user) {
    throw new Error("Unauthorized");
  }

  const encodePagingKey = (key: { user_id: string }) => {
    try {
      return encodeURIComponent(JSON.stringify(key));
    } catch (e: unknown) {
      console.log(e);
      throw new Error("Failed to encode paging key");
    }
  };

  const exclusiveStartKey = pageParam
    ? `&exclusive_start_key=${encodePagingKey(pageParam)}`
    : ""; // You can also omit this if `pageParam` is null.

  const response = await fetch(
    `https://storycloudapi.com/relationships/list-user-relations?&only_accepted=true${
      userId ? `&user_id=${userId}` : ""
    }${exclusiveStartKey}&page_size=10`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.jwt_token}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json() as Promise<FriendsListT>; // Ensure this matches the FriendsListT type.
};
