"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { settingTabs } from "./consts";
import SettingsPurpleIcon from "@/assets/icons/settings-purple.svg";
import ReturnPurpleIcon from "@/assets/icons/return-purple.svg";

const Settings = () => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setActiveTab(0);
      } else {
        setActiveTab(1);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute top-0 z-50 flex   lowercase md:z-10 md:relative  overflow-hidden ">
      <div
        className={` w-screen md:w-72   h-screen overflow-hidden `}
        aria-label="settings tabs"
      >
        <ul className="flex flex-col justify-start h-full gap-2 px-10 py-4 bg-white border-l-2 border-purple-100">
          <li className="my-8 flex items-center justify-center md:justify-start relative gap-4 text-purple">
            <Link
              href="/"
              className=" absolute top-1/2 transform -translate-y-1/2 left-0 md:hidden"
            >
              <Image
                src={ReturnPurpleIcon}
                alt="info icon"
                width={7}
                height={7}
                className="w-4 h-4 text-purple"
              />
            </Link>
            <div className="flex items-center gap-0 text-purple">
              <Image
                src={SettingsPurpleIcon}
                className="w-7 h-7 text-purple"
                alt="Settings Icon"
                width={20}
                height={20}
              />
              <h2 className=" text-xl  ml-2 md:ml-4 text-center  ">settings</h2>
            </div>
          </li>

          {settingTabs.map((tab) => (
            <li key={tab.id} className="">
              <button
                className={`${
                  activeTab === tab.id
                    ? "  md:bg-purple-100  w-56 rounded-2xl"
                    : "  hover:font-medium"
                } flex items-center py-2 px-3  w-52 -ml-3  font-normal  justify-start  `}
                onClick={() => setActiveTab(tab.id)}
              >
                <Image
                  src={tab.icon}
                  alt={`${tab.label} icon`}
                  className=" w-7 h-7"
                  width={20}
                  height={20}
                />

                <span className="justify-start ml-4 lowercase whitespace-nowrap">
                  {tab.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="absolute block px-12 text-3xl md:hidden bottom-4 font-crimson "
        >
          storycloud
        </Link>
      </div>
      <div className="flex-1 block md:py-12 md:pl-8 lg:pl-20  overflow-hidden ">
        {settingTabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Settings;
