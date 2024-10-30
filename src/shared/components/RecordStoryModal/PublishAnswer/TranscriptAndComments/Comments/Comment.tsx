"use client";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { mockCommentT } from "@/shared/types";
import { MY_STORY } from "@/shared/consts";

const Comment = ({ comment }: { comment: mockCommentT }) => {
  const [showDelete, setShowDelete] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);

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
          src={comment.profileImage}
          alt={`${comment.user}'s profile`}
          className="self-start w-10 h-10 rounded-full"
        />
        <div className="mt-0 ml-3">
          <p className="">
            <span className="mr-2 text-purple font-medium">{comment.user}</span>
            {comment.comment}
          </p>
          <div className="flex items-center gap-2 text-grey">
            <span>3d ago</span>
            {MY_STORY ? (
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
        <button className="absolute right-2 px-4 py-1 bg-white rounded-xl text-red">
          delete
        </button>
      )}
    </div>
  );
};

export default Comment;
