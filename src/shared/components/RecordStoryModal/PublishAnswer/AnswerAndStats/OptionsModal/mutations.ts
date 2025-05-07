import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteStory } from "./actions";
import { UserT } from "@/shared/types";

export const useDeleteStory = (story_id: string, user: UserT|null) => {
  const queryClient = useQueryClient();


  const queryFilter: QueryFilters = {
    queryKey: ["userStories", user?.user_id, user],
  };
  return useMutation({
    mutationFn: () => deleteStory(story_id, user),
    onSuccess: () => {
      queryClient.invalidateQueries(queryFilter);
    },
    onError: (error) => {
      console.error("Failed to delete the story:", error);
    },
  });
};
