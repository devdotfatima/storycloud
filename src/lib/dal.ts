import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { UserT } from "@/shared/types";

export const validateUser = cache(
  async (): Promise<{ user: UserT } | { user: null }> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");

    if (!token) {
      console.log("No access token found in cookies.");
      return { user: null };
    }

    try {
      // Decode the JWT to extract user data
      const decoded = jwtDecode<{ user: string; exp?: number }>(token.value);

      // Check for token expiration
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        console.log("Access token has expired.");
        return { user: null };
      }

      // Parse the user data from the token
      const userFromToken: UserT = JSON.parse(decoded.user);

      // Fetch the user from the API to get the most recent data
      const response = await fetch(
        `https://storycloudapi.com/users/get-user?user_id=${userFromToken.user_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.value}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(`Failed to fetch user: HTTP ${response.status}`);
        return { user: null };
      }

      const userFromApi: UserT = await response.json();

      // Use API data as the source of truth, falling back to JWT data if API fails
      return { user: { ...userFromApi, jwt_token: token.value } };
    } catch (error) {
      console.error("Error during user revalidation:", error);
      return { user: null };
    }
  }
);
