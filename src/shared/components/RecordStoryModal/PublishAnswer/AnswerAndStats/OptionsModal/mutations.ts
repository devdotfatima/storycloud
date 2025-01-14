import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteStory } from "./actions";
import { UserT } from "@/shared/types";

export const useDeleteStory = (story_id: string, user: UserT) => {
  const queryClient = useQueryClient();

  const queryFilter: QueryFilters = {
    queryKey: [story_id, user.user_id],
  };
  return useMutation({
    mutationFn: () => deleteStory(story_id, user),

    // No optimistic updates; we wait for confirmation
    onSuccess: () => {
      // Remove the story from the cache after successful deletion
      queryClient.invalidateQueries(queryFilter); // Refetch story list or details as needed
    },
    onError: (error) => {
      console.error("Failed to delete the story:", error);
    },
  });
};
