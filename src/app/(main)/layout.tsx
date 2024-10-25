import React from "react";
import Sidebar from "@/shared/components/Sidebar";
import { MainLayoutPropsT } from "@/shared/types";

const Layout = ({ children, modal }: MainLayoutPropsT) => {
  return (
    <div className="h-screen overflow-hidden   ">
      <Sidebar />
      <div className=" mt-[9.55rem] pb-[8.55rem] md:pb-0  xl:ml-64 md:mt-0 md:ml-20 overflow-hidden h-[95svh] md:h-screen ">
        {children}
      </div>
      {modal}
    </div>
  );
};

export default Layout;
