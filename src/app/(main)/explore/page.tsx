"use client";
import React, { useEffect, useRef, useState } from "react";
import { storiesAndUsersTabs } from "./consts";

const Explore = () => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  useEffect(() => {
    if (activeTabIndex === null) {
      return;
    }

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex];
      if (currentTab) {
        setTabUnderlineLeft(currentTab.offsetLeft); // Safely access offsetLeft
      }
    };

    setTabPosition();
  }, [activeTabIndex]);

  return (
    <div className="flex-1  flex flex-col px-5 md:p-12  w-full gap-10 h-full">
      <div className="relative flex w-full px-1.5 py-1 mx-auto text-purple  bg-white max-w-[800px]  flew-row rounded-2xl backdrop-blur-sm">
        <span
          className="absolute flex overflow-hidden transition-all duration-300 top-1 h-10 rounded-2xl -z-10"
          style={{ left: tabUnderlineLeft, width: "49.5%" }}
        >
          <span className="w-full h-20 rounded-xl bg-purple-400" />
        </span>
        {storiesAndUsersTabs.map((tab, index) => {
          const isActive = activeTabIndex === index;

          return (
            <button
              key={index}
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              className={`
                ${isActive ? `text-white` : `text-purple`}
               my-auto cursor-pointer select-none rounded-full h-10 flex items-center justify-center text-center font-normal w-full md:w-1/2`}
              onClick={() => setActiveTabIndex(index)}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {storiesAndUsersTabs.find((tab) => tab.id === activeTabIndex)?.content}
    </div>
  );
};

export default Explore;
