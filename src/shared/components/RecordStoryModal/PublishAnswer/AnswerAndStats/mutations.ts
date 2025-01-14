import { StoryAnswerT, UserT } from "@/shared/types";
import { postReaction } from "./actions";
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useReactToStory = (
  user: UserT,
  story_id: string,
  userId: string
) => {
  const queryClient = useQueryClient();

  const queryFilter: QueryFilters = {
    queryKey: [story_id, userId],
  };

  return useMutation({
    mutationFn: async (reaction: string) =>
      postReaction(user, story_id, reaction),

    // Optimistic update
    onMutate: async () => {
      // Cancel any outgoing fetches or updates before applying the optimistic update
      await queryClient.cancelQueries(queryFilter);

      const previousStoryData = queryClient.getQueryData<StoryAnswerT>([
        "story",
        story_id,
      ]);

      // Optimistically update the story reaction count
      queryClient.setQueryData<StoryAnswerT>(["story", story_id], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          reactions_count: oldData.reactions_count + 1, // assuming 1 reaction added
        };
      });

      return { previousStoryData }; // Pass context data for rolling back in case of an error
    },
    onError: (err, variables, context) => {
      // Rollback the optimistic update in case of an error
      queryClient.setQueryData(["story", story_id], context?.previousStoryData);
    },
    onSettled: () => {
      // Invalidate the query to refetch the updated data from the server
      queryClient.invalidateQueries(queryFilter);
    },
  });
};
