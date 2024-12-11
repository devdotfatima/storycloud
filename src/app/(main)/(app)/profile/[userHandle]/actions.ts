import "server-only";
import { cache } from "react";
import { UserT } from "@/shared/types";
import { validateUser } from "@/lib/dal";

export const getUser = cache(
  async (
    userId: string
  ): Promise<{ user: UserT | null } | { error: string }> => {
    try {
      const { user } = await validateUser();
      if (!user) {
        return { error: "Unauthorized" };
      }

      // Fetch the user from the API to get the most recent data
      const response = await fetch(
        `https://storycloudapi.com/users/get-user?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.jwt_token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(`Failed to fetch user: HTTP ${response.status}`);
        return { user: null };
      }

      const userFromApi: UserT = await response.json();

      // Return the user wrapped in an object
      return { user: userFromApi };
    } catch (error) {
      console.error("Error during user revalidation:", error);
      return { user: null };
    }
  }
);
