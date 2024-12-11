import { StoryRequestT } from "@/shared/types";

export type StoryRequestsResponseT = {
  items: StoryRequestT[];
  last_evaluated_key: string | null;
};
