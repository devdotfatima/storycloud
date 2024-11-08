"use client";
import React, { useEffect, useRef, useState } from "react";
import { getTranscriptAndCommentsTabs } from "../../consts";
import { TranscriptAndCommentsPropsT } from "../types";

// Explicitly typing the ref to hold HTMLButtonElement or null
const TranscriptAndComments = ({ isEditing }: TranscriptAndCommentsPropsT) => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabs = getTranscriptAndCommentsTabs(isEditing);
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
    <div className=" h-full max-h-fit flex-1  p-5 gap-5 flex flex-col sm:p-12 sticky top-0">
      <div className="relative flex w-full px-[3px] text-purple mx-auto bg-purple-100 h-[48px] flew-row rounded-xl backdrop-blur-sm ">
        <span
          className="absolute flex overflow-hidden transition-all duration-300 top-[3px] rounded-lg -z-10 w-1/2"
          style={{ left: tabUnderlineLeft, width: "49.5%" }}
        >
          <span
            className="absolute flex overflow-hidden transition-all duration-300 transform -translate-y-1/2 top-1/2 rounded-xl -z-10 w-1/2"
            style={{ left: tabUnderlineLeft, width: "40%" }}
          ></span>

          <span className="w-full h-[38px] rounded-xl bg-purple-400" />
        </span>
        {tabs.map((tab, index) => {
          const isActive = activeTabIndex === index;

          return (
            <button
              key={index}
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              className={`
                ${isActive ? `text-white` : `text-secondaryBlue`}
               my-auto cursor-pointer select-none rounded-full h-[44px] flex items-center justify-center text-center font-light w-full  md:w-1/2`}
              onClick={() => setActiveTabIndex(index)}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {tabs.find((tab) => tab.id === activeTabIndex)?.content}
    </div>
  );
};

export default TranscriptAndComments;
