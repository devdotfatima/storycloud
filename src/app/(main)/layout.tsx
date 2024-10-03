import React from "react";
import Sidebar from "@/shared/components/Sidebar";
import { LayoutPropsT } from "@/shared/types";

const Layout = ({ children }: LayoutPropsT) => {
  return (
    <div className="h-screen overflow-hidden   ">
      <Sidebar />
      <div className="mt-[9.55rem] font-mukta font-normal xl:ml-64 md:mt-0 md:ml-20 lg:mt-0 overflow-y-auto h-[80vh] md:h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
