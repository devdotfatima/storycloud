import { UserT } from "@/shared/types";
import { InfiniteData } from "@tanstack/react-query";

export type SearchUsersPropsT = {
  status: string;
  error: unknown;
  data: InfiniteData<searchUsersT> | undefined;

  isLoading: boolean;
};

export type searchUsersT = {
  items: UserT[];
  last_evaluated_key?: { user_id: string };
};
