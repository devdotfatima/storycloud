import { StoryRequestT } from "@/lib/validations";
import { useMutation } from "@tanstack/react-query";
import { sendStoryRequest } from "./actions";
import { UserT } from "@/shared/types";

export const useSendStoryRequest = (user: UserT) => {
  return useMutation({
    mutationFn: (payload: StoryRequestT) => sendStoryRequest(payload, user),
  });
};
