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
  return (
    <div
      onClick={toggleNotifications}
      className={`${
        showNotifications
          ? "bg-purple bg-opacity-15"
          : "hover:bg-purple hover:bg-opacity-15"
      } flex flex-col md:flex-row items-center justify-center md:py-2 px-2 xl:px-5 drop-shadow text-black sm:px-0 sm:w-14 md:w-full h-[2.85rem] rounded-xl md:rounded-2xl cursor-pointer w-16 `}
    >
      <Image
        src={item?.icon || ""}
        alt={`${item.name} icon`}
        width={28}
        height={28}
        className="w-4 h-4 sm:w-5 sm:h-5 md:h-[1.75rem] md:w-[1.75rem]"
      />

      <span className="md:flex-1 md:ml-5 whitespace-nowrap md:hidden  md:text-[1.25rem] xl:block">
        {!!width && width < 768 ? "notifs" : item.name}
      </span>
    </div>
  );
};

export default NotificationButton;
