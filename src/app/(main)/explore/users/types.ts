import { UserT } from "@/shared/types";

export type SearchUsersPropsT = {
  status: string;
  error: unknown;
  data: any;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
};

export type searchUsersT = {
  items: UserT[];
  last_evaluated_key?: { user_id: string };
};
