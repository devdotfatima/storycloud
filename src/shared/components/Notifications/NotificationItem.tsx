import Image from "next/image";
import React from "react";
import { NotificationItemPropsT } from "./types";

const NotificationItem = ({ notification }: NotificationItemPropsT) => {
  return (
    <div className="flex flex-row items-start justify-center py-2 space-x-3 font-normal sm:items-center f">
      <div className="flex items-center flex-1 space-x-3">
        {" "}
        <Image
          src={"/profile_image.png"} // Replace with actual image path
          alt="Profile"
          className="w-10 rounded-full"
          width={40}
          height={40}
        />
        <p className="flex-1 font-medium">
          <span className="text-sm font-medium text-purple">
            {notification.userName}
            {notification.action === "started following you" ? <br /> : null}
          </span>
          <span className="text-sm  "> {notification.action}</span>

          {notification.story && (
            <span className="mx-1 text-sm font-medium font-crimson ">
              <br />
              {notification.story}
            </span>
          )}
          <br />
          <span className="mx-1 text-xs text-grey">
            {" "}
            {notification.timeAgo}
          </span>
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;
