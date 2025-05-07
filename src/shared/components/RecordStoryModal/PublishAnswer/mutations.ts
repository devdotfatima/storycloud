// hooks/useDeleteStory.ts
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { UserT } from "@/shared/types";
import { deleteStory } from "./AnswerAndStats/OptionsModal/actions";
import { updateStory } from "./actions";

export const useDeleteStory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { story_id: string; user: UserT|null }>({
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
 
export const useUpdateStory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success?: boolean; error?: string },
    Error,
    {
      story_id: string;
      title: string | null;
      images: Record<string, { file: File; url: string }> | File[]|Record<string, string>;
      transcript: string | null;
      synopsis: string | null;
      user: UserT|null;
      images_to_delete?: string[];
    }
  >({
    mutationFn: async ({
      story_id,
      title,
      // images,
      transcript,
      synopsis,
      user,
    }) =>
      updateStory(story_id, title, transcript, synopsis, user),

    onSuccess: (_, { story_id,user }) => {
       const queryFilter: QueryFilters = {
        queryKey: [ story_id,user?.user_id],
      };
      queryClient.invalidateQueries(queryFilter);
    },

    onError: (error) => {
      console.error("Failed to update story:", error.message);
    },
  });
};