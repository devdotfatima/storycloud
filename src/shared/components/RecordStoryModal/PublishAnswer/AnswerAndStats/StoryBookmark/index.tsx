
import Image from "next/image";
import React from "react";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BookmarkIcon from "@/assets/icons/bookmark.svg";
import { StoryReactionsPropsT } from "./types";
import { Bookmark } from "lucide-react";

const StoryBookmark = ({ story }: StoryReactionsPropsT) => {
  const queryClient = useQueryClient();
  const user = useSessionContext();
  const storyId = story?.story_id;
  const authorId = story?.user_id;

  // Fetch bookmark status for the current story
  const { data: isBookmarked } = useQuery<boolean>({
    queryKey: ["isBookmarked", storyId],
    queryFn: async () => {
      const res = await fetch(
        `https://www.storycloudapi.com/bookmarks/is_story_bookmarked_by_user?story_id=${storyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.jwt_token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to check bookmark status");

      const data = await res.json();
      return data; // if response is {} → not bookmarked
    },
    enabled: !!storyId && !!user?.jwt_token,
  });

  // Toggle bookmark status with optimistic update
  const { mutate: toggleBookmark, isPending } = useMutation({
    mutationFn: async () => {
      const url = isBookmarked
        ? `https://www.storycloudapi.com/bookmarks/unbookmark-story?story_id=${storyId}&user_id_of_story=${authorId}`
        : `https://www.storycloudapi.com/bookmarks/bookmark-story?story_id=${storyId}&user_id_of_story=${authorId}`;

      const method = isBookmarked ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.jwt_token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to toggle bookmark");
    },
    onMutate: async () => {
      // Optimistically update the bookmark status
      await queryClient.cancelQueries({ queryKey: ["isBookmarked", storyId] });

      const previousBookmarkStatus = queryClient.getQueryData<boolean>(["isBookmarked", storyId]);

      // Optimistically update the data in the query cache
      queryClient.setQueryData<boolean>(["isBookmarked", storyId], !isBookmarked);

      return { previousBookmarkStatus }; // Return previous state for rollback
    },
    onError: (err, variables, context) => {
      // Rollback to previous state in case of error
      if (context?.previousBookmarkStatus !== undefined) {
        queryClient.setQueryData<boolean>(["isBookmarked", storyId], context.previousBookmarkStatus);
      }
    },
    onSettled: () => {
      // Invalidate the query to refetch fresh data after mutation
      queryClient.invalidateQueries({ queryKey: ["isBookmarked", storyId] });
    },
  });

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => !isPending && toggleBookmark()}
        className={`h-6 w-6 cursor-pointer ${isBookmarked ? "text-blue-500" : "text-gray-500"
          } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isPending}
      >
        {isBookmarked ? (
          <Bookmark fill="#6A6FD5" color="#6A6FD5" size={24} />
        ) : (
          <Image
            src={BookmarkIcon}
            alt="bookmark"
            height={24}
            width={24}
            className=""
          />
        )}
      </button>
    </div>
  );
};

export default StoryBookmark;