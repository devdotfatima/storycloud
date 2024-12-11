import { UserT } from "@/shared/types";
import { searchUsersT } from "./types";

export const fetchUsers = async (
  user: UserT,
  pageParam: { user_id: string } | null,
  searchTerm = ""
): Promise<searchUsersT> => {
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
    : "";

  const response = await fetch(
    `https://storycloudapi.com/users/search-users?${
      searchTerm ? `&search_key=${searchTerm}` : ""
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

  return response.json(); // Ensure this aligns with searchUsersT type.
};
