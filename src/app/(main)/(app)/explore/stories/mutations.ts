import { useInfiniteQuery } from "@tanstack/react-query";
import { UserT } from "@/shared/types";
import { fetchStories } from "./actions";

export const useFetchStories = (user: UserT, searchTerm: string) => {
  return useInfiniteQuery({
    queryKey: ["stories", searchTerm],
    queryFn: ({ pageParam }: { pageParam: { story_id: string } | null }) =>
      fetchStories(user, pageParam, searchTerm),
    initialPageParam: null,
    getNextPageParam: (lastPage: {
      last_evaluated_key?: { story_id: string };
    }) => lastPage.last_evaluated_key || null,
  });
};
