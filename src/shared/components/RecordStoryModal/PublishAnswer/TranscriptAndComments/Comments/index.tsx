import React, { useEffect, useState } from "react";
import SendGreyIcon from "@/assets/icons/send-grey.svg";
import SendPurpleIcon from "@/assets/icons/send.svg";
import Image from "next/image";
import { useAddComment, useFetchComments } from "./mutations";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { CommentsPropsT } from "../../types";
import Comment from "./Comment";
import { CommentT } from "@/shared/types";
import { Loader } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const Comments = ({ story = null }: CommentsPropsT) => {
  const { ref, inView } = useInView();
  const [commentText, setCommentText] = useState("");
  const user = useSessionContext();
  const addCommentMutation = useAddComment(user, story?.story_id || "");
  const {
    data: commentPages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchComments(user, story?.story_id || "");

  const handleAddComment = () => {
    if (commentText.trim() && story) {
      addCommentMutation.mutate({
        story_id: story?.story_id,
        comment_text: commentText,
        commenter_id: user?.user_id||"",
        author_id: story?.user_id || "",
      });
      setCommentText("");
    }
  };

  const comments: CommentT[] =
    commentPages?.pages.flatMap((page) =>
      "items" in page && Array.isArray(page.items) ? page.items : []
    ) || [];

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  return (
    <div
      className={` min-h-[460px] lg:min-h-[26vh] overflow-auto  h-full w-full bg-purple-100 rounded-2xl  py-5 pl-5 pr-1  ${
        !story?.story_id
          ? "text-center sm:px-24 flex justify-center items-center text-purple"
          : " "
      } `}
    >
      {!user ? (
        <div className="h-full w-full flex justify-center items-center">
          please &nbsp;<Link href="/login" className="text-purple hover:underline ">login</Link>&nbsp;to comment or like on this post.
        
        </div>
      ):!story?.story_id ? (
        <span> comments on your posts will appear here</span>
      ) : (
        <div className="flex justify-between flex-col h-full ">
          <div className="h-[90%] max-h-[350px] lg:max-h-[600px] space-y-3 overflow-y-auto">
            {isLoading ? (
              <Loader fill="#6A6FD5" className="animate-spin  m-auto h-full" />
            ) : (
              comments.map((comment: CommentT) => (
                <Comment
                  myStory={story?.user_id === user.user_id}
                  key={comment.comment_id}
                  comment={comment}
                />
              ))
            )}
            {hasNextPage && (
              <div
                ref={ref}
                className="w-full flex justify-center p-10 items-center"
              >
                {isFetchingNextPage && (
                  <Loader
                    fill="#6A6FD5"
                    className="mx-auto my-auto w-fit animate-spin"
                  />
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between w-[96%] h-12 gap-2 px-2 bg-white rounded-xl">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add comment"
              className="w-full h-8  mt-1 overflow-y-auto leading-tight outline-none resize-none caret-secondaryBlue ring-0"
            />
            <button
              onClick={handleAddComment}
              aria-label="Send Comment"
              type="button"
              disabled={
                addCommentMutation.isPending || commentText.length === 0
              }
              className="text-secondaryBlue disabled:cursor-auto"
            >
              <Image
                src={commentText.length === 0 ? SendGreyIcon : SendPurpleIcon}
                alt="Send"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
