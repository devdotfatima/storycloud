export type StoryRequestT = {
  request_id: string;
  receiver_id: string;
  requestor_id: string;
  request_text: string;
  creation_time: string;
};

export type StoryRequestsResponseT = {
  items: StoryRequestT[];
  last_evaluated_key: string | null;
};
