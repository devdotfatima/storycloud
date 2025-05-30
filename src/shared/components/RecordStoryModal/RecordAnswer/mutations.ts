import { StoryCreationT } from "@/lib/validations";
import { useMutation } from "@tanstack/react-query";
import { createStory } from "./actions";
import { UserT } from "@/shared/types";

export const useCreateStory = (user: UserT|null,  requestId?: string | null ) => {
  return useMutation({
    mutationFn: (payload: StoryCreationT) => createStory(payload, user,requestId),
  });
};
