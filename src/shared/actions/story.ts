import { GetStoryParams, StoryAnswerT } from "../types";

export const getStory = async (
  params: GetStoryParams
): Promise<StoryAnswerT> => {
  const queryParams = new URLSearchParams({
    story_id: params.story_id,
    user_id: params.userId,
    include_audio: String(params.include_audio ?? true),
    include_transcript: String(params.include_transcript ?? true),
    include_images: String(params.include_images ?? true),
    include_synopsis: String(params.include_synopsis ?? true),
  });

  const response = await fetch(
    `https://www.storycloudapi.com/stories/get-story?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch story: ${response.statusText}`);
  }

  return response.json();
};
