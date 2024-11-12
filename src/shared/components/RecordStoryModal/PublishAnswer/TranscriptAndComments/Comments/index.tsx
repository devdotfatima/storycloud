import React from "react";
import SendGreyIcon from "../../../../../../assets/icons/send-grey.svg";
// import SendPurpleIcon from "../../../../../../assets/icons/send.svg";

import Comment from "./Comment";
import Image from "next/image";
import { useParams } from "next/navigation";
import { mockStories } from "@/shared/consts";

const Comments = () => {
  const { storyId } = useParams();
  const story = mockStories.find((story) => story.id.toString() === storyId);
  return (
    <div
      className={` min-h-[460px] lg:min-h-[26vh] overflow-auto  h-full w-full bg-purple-100 rounded-2xl  py-5 pl-5 pr-1  ${
        !storyId
          ? "text-center sm:px-24 flex justify-center items-center text-purple"
          : " "
      } `}
    >
      {!storyId ? (
        <span> comments on your posts will appear here</span>
      ) : (
        <div className="flex justify-between flex-col h-full ">
          <div className="h-[90%] max-h-[350px] lg:max-h-[600px] space-y-3 overflow-y-auto">
            {story?.comments.map((comment, index) => (
              <Comment
                myStory={story?.isMyStory}
                key={comment.id || index}
                comment={comment}
              />
            ))}
          </div>

          <div className="flex items-center justify-between w-[96%] h-11 gap-2 px-2 bg-white rounded-xl">
            <textarea
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment"
              className="w-full h-10 pt-2.5 overflow-y-auto text-base font-light leading-tight outline-none resize-none caret-secondaryBlue   ring-0"
            />
            <button
              aria-label="Send Comment"
              type="button"
              className="text-secondaryBlue"
            >
              <Image src={SendGreyIcon} alt="Send" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
