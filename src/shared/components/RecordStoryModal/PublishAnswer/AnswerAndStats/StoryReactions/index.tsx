import Image from "next/image";
import React from "react";
import { useParams } from "next/navigation";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import HeartIcon from "@/assets/icons/heart.svg";
import { StoryReactionsPropsT, UserReactionsResponse } from "./types";
import { StoryAnswerT } from "@/shared/types";
import { Heart } from "lucide-react";

const StoryReactions = ({ story }: StoryReactionsPropsT) => {
  const queryClient = useQueryClient();
  const user = useSessionContext();
  const { userId } = useParams();
  const storyId = story?.story_id;

  // Fetch user's reactions for this story using the query hook
  const { data: userReactions } = useQuery<UserReactionsResponse>({
    queryKey: ["userReactions", storyId],
    queryFn: async () => {
      const response = await fetch(
        `https://www.storycloudapi.com/reactions/get-user-reactions?story_id=${storyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.jwt_token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user reactions");
      }

      return response.json(); // Assuming a successful JSON response
    },
    enabled: !!storyId && !!user?.jwt_token,
  });

  // Check if the current user has liked the story
  const hasLiked = userReactions?.items.some(
    (reaction) =>
      reaction.reaction_emoji === "\\u2764\\ufe0f" &&
      reaction.user_id === user.user_id
  );

  // Mutation for adding/removing a reaction
  const { mutate: reactToStory, isPending } = useMutation({
    mutationFn: async () => {
      const url = hasLiked
        ? `https://www.storycloudapi.com/reactions/unreact?story_id=${storyId}&author_id=${userId}`
        : `https://www.storycloudapi.com/reactions/react?story_id=${storyId}&author_id=${userId}`;

      const response = await fetch(url, {
        method: hasLiked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt_token}`,
        },
        body: hasLiked
          ? JSON.stringify({ reaction: "\\u2764\\ufe0f" })
          : JSON.stringify({ reaction: "\\u2764\\ufe0f" }), // Unicode for ❤️
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update reaction");
      }

      return response.json(); // Assuming a successful JSON response
    },
    onMutate: async () => {
      // Cancel outgoing queries for this story to prevent overwrites
      await queryClient.cancelQueries({ queryKey: [storyId, userId] });

      const previousReactions = queryClient.getQueryData<UserReactionsResponse>(
        ["userReactions", storyId]
      );
      const previousStory = queryClient.getQueryData<StoryAnswerT>([
        "story",
        storyId,
      ]);

      // Optimistic update: update the reactions array and reaction count
      queryClient.setQueryData(
        ["userReactions", storyId],
        (oldData: UserReactionsResponse | undefined) => {
          if (!oldData) return oldData;

          const updatedReactions = hasLiked
            ? oldData.items.filter(
                (reaction) => reaction.user_id !== user.user_id
              ) // Remove reaction
            : [
                ...oldData.items,
                {
                  story_id: storyId,
                  user_id_reaction: "\\u2764\\ufe0f",
                  reaction_emoji: "\\u2764\\ufe0f", // Unicode for ❤️
                  timestamp: new Date().toISOString(),
                  user_id: user.user_id,
                  user_handle: user.user_handle,
                  user_name: user.user_name,
                  user_photo: user.user_profile_image,
                },
              ];

          return {
            ...oldData,
            items: updatedReactions,
          };
        }
      );

      queryClient.setQueryData([storyId, userId], (old: StoryAnswerT) => {
        if (!old) return old;

        return {
          ...old,
          reactions_count: hasLiked
            ? old.reactions_count - 1
            : old.reactions_count + 1,
        };
      });

      return { previousReactions, previousStory };
    },
    onError: (err, variables, context) => {
      // Rollback optimistic update if the request fails
      if (context?.previousReactions) {
        queryClient.setQueryData(
          ["userReactions", storyId],
          context.previousReactions
        );
      }
      if (context?.previousStory) {
        queryClient.setQueryData(["story", storyId], context.previousStory);
      }
    },
    // onSettled: () => {
    //   // Refetch data to ensure accuracy after the mutation
    //   queryClient.invalidateQueries({ queryKey: [storyId, userId] });
    //   queryClient.invalidateQueries({ queryKey: ["userReactions", storyId] });
    // },
  });

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <button
        onClick={() => !isPending && reactToStory()}
        className={`h-5 w-5 sm:h-6 sm:w-6 cursor-pointer ${
          hasLiked ? "text-red-500" : "text-gray-500"
        } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isPending}
      >
        {hasLiked ? (
          <Heart fill="red" color="red" size={24} className="h-6 w-6 " />
        ) : (
          <Image
            src={HeartIcon}
            alt="likes"
            height={24}
            width={24}
            className=""
          />
        )}
      </button>

      <span className="text-sm sm:text-xl">{story?.reactions_count || 0}</span>
    </div>
  );
};

export default StoryReactions;
