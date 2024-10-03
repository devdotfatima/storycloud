"use client";
import React, { useMemo, useState } from "react";
import { menuItems } from "./consts";
import SidebarItem from "./SidebarItem";
import NavLink from "./NavLink";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => setShowNotifications(!showNotifications);

  const memoizedMenuItems = useMemo(
    () => menuItems.filter((item) => item.name !== "settings"),
    []
  );
  return (
    <>
      {/* Desktop */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white  hidden xl:block `}
        aria-label="Sidebar"
      >
        <div className="h-full px-7 py-4 overflow-y-auto flex flex-col justify-between ">
          <ul className="space-y-2 ">
            <li className="pt-3 mb-10">
              <Link href="/" className="flex items-center px-5 pt-2 rounded-lg">
                <h2 className="text-3xl mx-auto text-center font-crimson font-medium">
                  storycloud
                </h2>
              </Link>
            </li>
            {memoizedMenuItems.map((item) => (
              <SidebarItem
                key={item.name}
                item={item}
                showNotifications={showNotifications}
                toggleNotifications={toggleNotifications}
              />
            ))}
          </ul>
          <div>
            <NavLink
              activeClassName="bg-purple bg-opacity-15"
              href={"/settings"}
              className={
                "hover:bg-purple hover:bg-opacity-15 flex items-center py-2 px-5  w-full text-black "
              }
            >
              <Image
                width={28}
                height={28}
                alt="settings icon"
                src={menuItems[menuItems.length - 1]?.icon || ""}
                className="h-[1.75rem] w-[1.75rem]"
              />
              <p className="flex-1 ml-5 whitespace-nowrap text-[1.25rem]">
                settings
              </p>
            </NavLink>
          </div>
        </div>
      </aside>

      <aside
        className={`fixed top-0 left-0 z-40 w-20 h-screen hidden md:block xl:hidden bg-white`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex flex-col justify-between h-full">
            <ul className="space-y-4 text-sm">
              <li className="pt-3 mb-10">
                <Link
                  href="/"
                  className="flex items-center justify-center px-2 pt-2 rounded-lg"
                >
                  <h2 className="text-4xl text-center font-medium font-crimson">
                    s
                  </h2>
                </Link>
              </li>
              {memoizedMenuItems.map((item) => (
                <SidebarItem
                  key={item.name}
                  item={item}
                  showNotifications={showNotifications}
                  toggleNotifications={toggleNotifications}
                />
              ))}
            </ul>
            <div>
              <NavLink
                href={"/settings"}
                activeClassName="bg-purple bg-opacity-15"
                className={
                  "hover:bg-secondaryBlue hover:bg-opacity-15 flex items-center py-2 px-2 justify-center rounded-lg text-black"
                }
              >
                <Image
                  alt="settings icon"
                  width={28}
                  height={28}
                  src={menuItems[menuItems.length - 1]?.icon || ""}
                  className="h-[1.75rem] w-[1.75rem]"
                />
              </NavLink>
            </div>
          </div>
        </div>
      </aside>

      <nav
        className="fixed z-40 w-full h-[9.56rem] top-0 md:hidden bg-lightBlue"
        aria-label="Navbar"
      >
        <div className="flex flex-col h-full px-5 py-5 gap-y-5">
          <div className="flex items-center justify-between h-10">
            <Link href="/" className="flex items-center rounded-lg">
              <h2 className="text-2xl text-center font-crimson font-medium">
                storycloud
              </h2>
            </Link>

            <NavLink href={"/settings"} className="flex items-center">
              <Image
                alt="settings icon"
                width={28}
                height={28}
                src={menuItems[menuItems.length - 1]?.icon || ""}
                className="h-[1.75rem] w-[1.75rem]"
              />
            </NavLink>
          </div>

          <ul className="flex justify-between items-center p-1 bg-white rounded-2xl h-[3.25rem] text-sm">
            {memoizedMenuItems.map((item) => (
              <SidebarItem
                key={item.name}
                item={item}
                showNotifications={showNotifications}
                toggleNotifications={toggleNotifications}
              />
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
