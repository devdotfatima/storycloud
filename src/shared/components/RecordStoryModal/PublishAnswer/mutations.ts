// hooks/useDeleteStory.ts
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { UserT } from "@/shared/types";
import { deleteStory } from "./AnswerAndStats/OptionsModal/actions";

export const useDeleteStory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { story_id: string; user: UserT }>({
    mutationFn: async ({ story_id, user }) => {
      await deleteStory(story_id, user);
    },
    onSuccess: (_, { story_id }) => {
      // Optionally invalidate or update queries
      const queryFilter: QueryFilters = {
        queryKey: ["freestyleStory", story_id],
      };
      queryClient.invalidateQueries(queryFilter);
    },
  });
};
