import { useInfiniteQuery } from "@tanstack/react-query";
import { UserT } from "@/shared/types";
import { fetchUsers } from "./actions";

export const useFetchUsers = (user: UserT, searchTerm: string) => {
  return useInfiniteQuery({
    queryKey: ["users", searchTerm],
    queryFn: ({ pageParam }: { pageParam: { user_id: string } | null }) =>
      fetchUsers(user, pageParam, searchTerm),
    initialPageParam: null,
    getNextPageParam: (lastPage: {
      last_evaluated_key?: { user_id: string };
    }) => lastPage.last_evaluated_key || null,
  });
};
