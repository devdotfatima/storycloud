import { getStory } from "@/shared/actions/story";
import { StoryAnswerT, UserT } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

export const useGetStory = (story_id: string, user: UserT) => {
  return useQuery<StoryAnswerT, Error>({
    queryKey: [story_id, user.user_id],
    queryFn: () =>
      getStory({
        story_id,
        user,
        include_audio: true,
        include_transcript: true,
        include_images: true,
        include_synopsis: true,
      }),
  });
};
