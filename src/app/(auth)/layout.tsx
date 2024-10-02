import { LayoutPropsT } from "@/shared/types";
import React from "react";

const Layout = ({ children }: LayoutPropsT) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen font-normal lowercase font-mukta lg:items-end lg:pr-48 bg-lightBlue">
      {children}
    </div>
  );
};

export default Layout;
