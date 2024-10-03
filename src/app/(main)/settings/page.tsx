"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { settingTabs } from "./consts";

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
    <div className="absolute top-0 z-50 flex  lowercase md:z-10 md:relative  ">
      <div className={` w-screen md:w-72   h-screen `} aria-label="Sidebar">
        <ul className="flex flex-col justify-start h-full gap-2 px-10 py-4 bg-white border-l-2 border-purple-100">
          <li className="mt-8 mb-8 ">
            <Link href="/" className="flex items-center rounded-lg text-purple">
              <img
                src={"/settings-purple.svg"}
                className="w-7 h-7 text-purple"
              />
              <h2 className=" text-xl  ml-4 text-center  ">settings</h2>
            </Link>
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
                <img src={tab.icon} className=" w-7 h-7" />

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
      <div className="flex-1 block md:py-9 md:pl-8 lg:pl-20 bg-purple-100 ">
        {settingTabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Settings;
