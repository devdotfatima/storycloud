import PublishAnswer from "./PublishAnswer";
import RecordAnswer from "./RecordAnswer";

import Transcript from "./PublishAnswer/TranscriptAndComments/Transcript";
import Comments from "./PublishAnswer/TranscriptAndComments/Comments";
import { StoryAnswerT } from "@/shared/types";

export const steps = [
  { id: 1, component: RecordAnswer },
  { id: 2, component: PublishAnswer },
];

export const getTranscriptAndCommentsTabs = (
  isEditing: boolean,
  story?: StoryAnswerT | null
) => [
  {
    id: 0,
    name: "transcript",
    content: <Transcript isEditing={isEditing} story={story} />, // Pass isEditing prop to Transcript
  },
  {
    id: 1,
    name: "comments",
    content: <Comments />,
  },
];
