"use client";
import React from "react";
import { sidebarItemProps } from "../types";
import Image from "next/image";
import useWindowDimensions from "@/hooks/useWindowDimensions";

const NotificationButton = ({
  item,
  showNotifications,
  toggleNotifications,
}: sidebarItemProps) => {
  const { width } = useWindowDimensions();

  const isMobile = width > 0 && width < 768;

  return (
    <div
      id="notification-btn"
      onClick={(e) => {
        toggleNotifications();
      }}
      className={`${
        showNotifications
          ? "bg-purple bg-opacity-15"
          : "hover:bg-purple hover:bg-opacity-15"
      } flex flex-col md:flex-row items-center  justify-center md:py-2 px-2 xl:px-5 sm:px-0 sm:w-14 md:w-full h-[2.85rem] rounded-xl md:rounded-2xl cursor-pointer w-16 `}
    >
      <Image
        src={item?.icon || ""}
        alt={`${item.name} icon`}
        width={28}
        height={28}
        className="w-4 h-4 sm:w-5 sm:h-5 md:h-[1.75rem] md:w-[1.75rem]"
      />

      <span className="md:flex-1 md:ml-5 whitespace-nowrap md:hidden  xl:block">
        {isMobile ? "notifs" : item.name}
      </span>
    </div>
  );
};

export default NotificationButton;
