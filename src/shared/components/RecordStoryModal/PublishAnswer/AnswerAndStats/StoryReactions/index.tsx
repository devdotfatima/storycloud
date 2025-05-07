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

  // Fetch if user has reacted to the story using the new API
  const { data: hasUserReacted, isLoading ,refetch} = useQuery<boolean>({
    queryKey: ["hasUserReacted", storyId],
    queryFn: async () => {
      const response = await fetch(
        `https://www.storycloudapi.com/reactions/has-user-reacted-to-story?story_id=${storyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.jwt_token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to check user reaction status");
      }

      return response.json(); // Returns true or false
    },
    enabled: !!storyId && !!user?.jwt_token,
  });

  // Mutation for adding/removing a reaction
  const { mutate: reactToStory, isPending } = useMutation({
    mutationFn: async () => {
      const url = hasUserReacted
        ? `https://www.storycloudapi.com/reactions/unreact?story_id=${storyId}&author_id=${userId}`
        : `https://www.storycloudapi.com/reactions/react?story_id=${storyId}&author_id=${userId}`;

      const response = await fetch(url, {
        method: hasUserReacted ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.jwt_token}`,
        },
        body: hasUserReacted
          ? JSON.stringify({ reaction: "\\u2764\\ufe0f" }) // Unicode for ❤️
          : JSON.stringify({ reaction: "\\u2764\\ufe0f" }), // Unicode for ❤️
      });
refetch()
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update reaction");
      }

      return response.json(); // Assuming a successful JSON response
    },
    onMutate: async () => {
      // Cancel outgoing queries for this story to prevent overwrites
      await queryClient.cancelQueries({ queryKey: [storyId, userId] });
      await queryClient.cancelQueries({queryKey: ["hasUserReacted", storyId] })

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

          const updatedReactions = hasUserReacted
            ? oldData.items.filter(
                (reaction) => reaction.user_id !== user?.user_id
              ) // Remove reaction
            : [
                ...oldData.items,
                {
                  story_id: storyId,
                  user_id_reaction: "\\u2764\\ufe0f",
                  reaction_emoji: "\\u2764\\ufe0f", // Unicode for ❤️
                  timestamp: new Date().toISOString(),
                  user_id: user?.user_id,
                  user_handle: user?.user_handle,
                  user_name: user?.user_name,
                  user_photo: user?.user_profile_image,
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
          reactions_count: hasUserReacted
            ? old.reactions_count - 1
            : old.reactions_count + 1,
        };
      });
      queryClient.setQueryData<boolean>(["hasUserReacted", storyId], !hasUserReacted);

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
  });

  // Check if user is still loading the reaction status
  if (isLoading) return <div>Loading...</div>;

  

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <button
        onClick={() => !isPending && reactToStory()}
        className={`h-5 w-5 sm:h-6 sm:w-6 cursor-pointer ${
          hasUserReacted ? "text-red-500" : "text-gray-500"
        } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isPending}
      >
        {hasUserReacted ? (
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