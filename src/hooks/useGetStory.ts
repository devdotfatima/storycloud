import { getStory } from "@/shared/actions/story";
import { StoryAnswerT } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

export const useGetStory = (story_id: string, 
  userId: string) => {
  return useQuery<StoryAnswerT, Error>({
    queryKey: [story_id, userId],
    queryFn: () =>
      getStory({
        story_id,
        userId,
        include_audio: true,
        include_transcript: true,
        include_images: true,
        include_synopsis: true,
      }),
  });
};
