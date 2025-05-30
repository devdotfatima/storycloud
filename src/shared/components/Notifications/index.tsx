"use client";

import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { NotificationsPropsT } from "./types";
import { notifications } from "./consts";
import NotificationItem from "./NotificationItem";
import BellIcon from "@/assets/icons/bell.svg";

const Notifications = ({ onClose }: NotificationsPropsT) => {
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const notificationButton = document.getElementById("notification-btn");

    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node) &&
        notificationButton &&
        !notificationButton.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={notificationsRef}
      className="fixed z-50 top-36 md:top-0 w-[94%] sm:w-[95%] left-[3%] sm:left-[2.4%] md:left-20 xl:left-64 bg-white rounded-2xl border-l-2 border-lightBlue md:pt-10  pr-1  md:w-[480px] max-h-full overflow-hidden md:rounded-none drop-shadow shadow-md notificationsContainer"
    >
      {/* Header section with notification bell */}
      <div className="items-center hidden gap-4 px-6  md:flex">
        <Image
          src={BellIcon}
          alt="notification icon"
          className="w-6 h-6"
          height={24}
          width={24}
        />
        <h2 className="text-lg font-semibold">Notifications</h2>
      </div>

      {/* Notification items container */}
      <div className="w-full h-[92%] px-2 space-y-1.5 md:space-y-4 overflow-y-auto mt-4 md:mt-10  sm:px-6">
        {notifications.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
