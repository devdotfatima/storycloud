import { LayoutPropsT } from "@/shared/types";
import React from "react";

const Layout = ({ children }: LayoutPropsT) => {
  return (
    <div className="h-screen  flex items-center justify-center">{children}</div>
  );
};

export default Layout;
