import { UserT } from "@/shared/types";

export const fetchUser = async (
  userHandle: string,
  user: UserT
): Promise<UserT | { error: string }> => {
  const response = await fetch(
    `https://storycloudapi.com/users/get-user?user_id=${userHandle}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.jwt_token}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }

  const userFromApi: UserT = await response.json();

  return userFromApi;
};
