"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import React from "react";
import { sidebarItemProps } from "../types";
import NavLink from "../NavLink";

const NotificationButton = dynamic(() => import("./NotificationButton"), {
  ssr: false,
});

const SidebarItem = ({
  item,
  showNotifications,
  toggleNotifications,
}: sidebarItemProps) => {
  if (item.name === "notifications") {
    return (
      <NotificationButton
        item={item}
        showNotifications={showNotifications}
        toggleNotifications={toggleNotifications}
      />
    );
  }
  return (
    <NavLink
      href={item.path}
      showNotifications={showNotifications}
      activeClassName="bg-purple bg-opacity-15"
      className={
        "hover:bg-purple hover:bg-opacity-15 font-normal flex flex-col md:flex-row items-center justify-center md:py-2 px-2 xl:px-5    sm:px-0 w-[60px]  h-[2.85rem] md:w-full  py-2    "
      }
    >
      {item?.icon ? (
        <Image
          alt={`${item.name} icon`}
          src={item.icon}
          width={28}
          height={28}
          className="w-4 h-4 mb-0.5 sm:mb-0 sm:w-5 sm:h-5 md:h-[1.75rem] md:w-[1.75rem]"
        />
      ) : null}
      <span className="md:flex-1 md:ml-5 whitespace-nowrap  md:hidden xl:block ">
        {item.name}
      </span>
    </NavLink>
  );
};

export default SidebarItem;
