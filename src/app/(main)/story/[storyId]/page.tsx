// import Image from "next/image";
import PublishAnswer from "@/shared/components/RecordStoryModal/PublishAnswer";
import React from "react";

const Story = () => {
  console.log("sad.,m.");

  return (
    <div className="mb-0 bg-purple-400 pb-40 sm:p-10 w-full min-h-screen h-full overflow-y-auto lg:overflow-hidden ">
      <div
        className={` h-fit lg:h-full lg:max-h-[1000px]   mx-auto w-full max-w-screen-sm  lg:max-w-[1200px]  overflow-hidden  `}
      >
        <PublishAnswer />
      </div>
    </div>
  );
};

export default Story;
