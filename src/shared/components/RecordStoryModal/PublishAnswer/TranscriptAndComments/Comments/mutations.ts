import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  QueryFilters,
} from "@tanstack/react-query";
import { addComment, deleteComment, fetchComments } from "./actions";
import { UserT } from "@/shared/types";
import { commentsT } from "../../types";

type InfiniteComments = {
  pages: commentsT[];
  pageParams: (string | null)[];
};

export const useAddComment = (user: UserT, story_id: string) => {
  const queryClient = useQueryClient();
  const queryFilter: QueryFilters = {
    queryKey: ["comments", story_id],
  };

  return useMutation({
    mutationFn: (payload: {
      story_id: string;
      comment_text: string;
      author_id: string;
      commenter_id: string;
    }) => addComment(payload, user),

    onMutate: async (newComment) => {
      // Cancel outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous comments for rollback in case of failure

      const previousComments = queryClient.getQueryData<InfiniteComments>([
        "comments",
        story_id,
      ]);

      // Optimistically update the cache with the new comment
      queryClient.setQueryData<InfiniteComments>(
        ["comments", story_id],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page, index) =>
              index === 0 // Add the comment to the first page
                ? {
                    ...page,
                    items: [
                      {
                        comment_id: "temp-id", // Temporary ID for the optimistic update
                        commenter_user_handle: user.user_handle,
                        commenter_photo: user.user_profile_image,
                        comment_text: newComment.comment_text,
                        creation_time: new Date().toISOString(),
                        commenter_id: newComment.commenter_id,
                        story_id: newComment.story_id,
                      },
                      ...page.items,
                    ],
                  }
                : page
            ),
          };
        }
      );

      // Return the snapshot for rollback
      return { previousComments };
    },
    onError: (err, newComment, context) => {
      // Rollback to the previous state on error
      queryClient.setQueryData(
        ["comments", story_id],
        context?.previousComments
      );
    },
    onSettled: () => {
      // Refetch to ensure the server state is in sync
      queryClient.invalidateQueries(queryFilter);
    },
  });
};

export const useFetchComments = (user: UserT, story_id: string) => {
  return useInfiniteQuery({
    queryKey: ["comments", story_id],
    queryFn: ({
      pageParam,
    }: {
      pageParam: { story_id: string; creation_time: string } | null;
    }) => fetchComments(user, story_id, pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage: {
      last_evaluated_key?: { story_id: string; creation_time: string };
    }) => lastPage.last_evaluated_key || null,
  });
};

export const useDeleteComment = (user: UserT, story_id: string) => {
  const queryClient = useQueryClient();
  const queryFilter: QueryFilters = {
    queryKey: ["comments", story_id],
  };

  return useMutation({
    mutationFn: (comment_id: string) => deleteComment(comment_id, user),
    onMutate: async (comment_id) => {
      await queryClient.cancelQueries(queryFilter);

      const previousComments = queryClient.getQueryData<InfiniteComments>([
        "comments",
        story_id,
      ]);

      queryClient.setQueryData<InfiniteComments>(
        ["comments", story_id],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.filter(
                (comment) => comment.comment_id !== comment_id
              ),
            })),
          };
        }
      );

      return { previousComments };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(
        ["comments", story_id],
        context?.previousComments
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryFilter);
    },
  });
};
