import PublishAnswer from "./PublishAnswer";
import RecordAnswer from "./RecordAnswer";

import Transcript from "./PublishAnswer/TranscriptAndComments/Transcript";
import Comments from "./PublishAnswer/TranscriptAndComments/Comments";
export const steps = [
  { id: 1, component: RecordAnswer },
  { id: 2, component: PublishAnswer },
];

export const transcriptAndCommentsTabs = [
  {
    id: 0,
    name: "transcript",
    content: <Transcript />,
  },
  {
    id: 1,
    name: "comments",
    content: <Comments />,
  },
];
