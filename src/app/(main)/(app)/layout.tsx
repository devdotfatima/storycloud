"use client";
import React from "react";
import Sidebar from "@/shared/components/Sidebar";
import { MainLayoutPropsT } from "@/shared/types";
import { useSessionContext } from "@/app/providers/SessionProvider";

const Layout =  ({ children, modal }: MainLayoutPropsT) => {
  const user=useSessionContext()
  return (
    <div className="h-screen overflow-hidden">
      {user ? <Sidebar /> :null} 
      <div className={` mt-[9.55rem] pb-[152px] md:pb-0  ${user ?"xl:ml-64 md:ml-20":""}  md:mt-0 overflow-hidden h-[95svh] md:h-screen `}>
        {children}
      </div>
      {modal}
    </div>
  );
};

export default Layout;


