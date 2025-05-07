"use client";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { CommentPropT } from "../../types";
import { timeAgo } from "@/lib/timeAgo";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { useDeleteComment } from "./mutations";
import ProfileImage from "@/assets/icons/user-purple.svg";

const Comment = ({ comment, myStory }: CommentPropT) => {
  const [showDelete, setShowDelete] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);
  const user = useSessionContext();
  const deleteCommentMutation = useDeleteComment(user, comment.story_id || "");

  const toggleDeleteButton = () => {
    setShowDelete((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      commentRef.current &&
      !commentRef.current.contains(event.target as Node)
    ) {
      setShowDelete(false);
    }
  };

  const handleDelete = () => {
    deleteCommentMutation.mutate(comment.comment_id);
  };
  useEffect(() => {
    if (showDelete) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDelete]);
  return (
    <div ref={commentRef} className="relative flex items-start ">
      <div
        className={`flex transition-transform duration-300 ease-in-out ${
          showDelete ? "translate-x-[-100px] " : ""
        }`}
      >
        <Image
          src={comment.commenter_photo || ProfileImage}
          alt={` profile photo`}
          width={40}
          height={40}
          className="self-start w-10 h-10 rounded-full object-cover "
        />
        <div className="mt-0 ml-3">
          <p className="">
            <span className="mr-2 text-purple font-medium">
              {comment.commenter_user_handle}
            </span>
            {comment.comment_text}
          </p>
          <div className="flex items-center gap-2 text-grey">
            <span>{timeAgo(comment.creation_time)}</span>
            {myStory || comment.commenter_id === user?.user_id ? (
              <button>
                <Ellipsis
                  className="cursor-pointer"
                  onClick={toggleDeleteButton}
                />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {showDelete && (
        <div className="flex flex-col gap-2 h-fit absolute right-2">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteCommentMutation.isPending}
            className=" px-4 py-1 bg-white rounded-xl text-red"
          >
            delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
