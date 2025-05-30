"use client";
import React, { useEffect, useRef, useState } from "react";
import { storiesAndUsersTabs } from "./consts";

const Explore = () => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0); 

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure it's client-side
    if (!tabsRef.current[activeTabIndex]) return;

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex];
      if (currentTab) {
        setTabUnderlineLeft(currentTab.offsetLeft); // Update only on the client
      }
    };

    setTabPosition();
    window.addEventListener("resize", setTabPosition); // Update on resize

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);


  return (
    <div className="flex-1  flex flex-col px-5 md:p-12  w-full gap-3 sm:gap-5 md:gap-10 h-full overflow-y-auto">
      <div className="relative flex w-full px-1 sm:px-1.5 sm:py-1 mx-auto text-purple  bg-white max-w-[800px]  flew-row rounded-2xl backdrop-blur-sm"> 
         <span
          className="absolute flex overflow-hidden transition-all duration-300 top-1 h-8 sm:h-10 rounded-2xl -z-10"
           style={{ left: `${tabUnderlineLeft}px`, width: "49.5%" }}
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
