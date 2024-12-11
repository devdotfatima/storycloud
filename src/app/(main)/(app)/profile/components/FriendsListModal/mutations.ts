import { useInfiniteQuery } from "@tanstack/react-query";
import { UserT } from "@/shared/types";
import { fetchFriends } from "./actions";

export const useFetchFriends = (user: UserT, onlyFriends: boolean = true) => {
  return useInfiniteQuery({
    queryKey: ["friends", onlyFriends],
    queryFn: ({ pageParam }: { pageParam: { user_id: string } | null }) =>
      fetchFriends(user, pageParam, onlyFriends),
    initialPageParam: null,
    getNextPageParam: (lastPage: {
      last_evaluated_key?: { user_id: string };
    }) => lastPage.last_evaluated_key || null,
  });
};
