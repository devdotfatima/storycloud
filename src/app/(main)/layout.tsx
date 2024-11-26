import { redirect } from "next/navigation";
import React from "react";
import Sidebar from "@/shared/components/Sidebar";
import { MainLayoutPropsT } from "@/shared/types";
import { validateUser } from "@/lib/dal";
import SessionProvider from "../providers/SessionProvider";

const Layout = async ({ children, modal }: MainLayoutPropsT) => {
  const { user } = await validateUser();
  if (!user) redirect("/login");
  return (
    <SessionProvider value={user}>
      <div className="h-screen overflow-hidden">
        <Sidebar />
        <div className=" mt-[9.55rem] pb-[152px] md:pb-0  xl:ml-64 md:mt-0 md:ml-20 overflow-hidden h-[95svh] md:h-screen ">
          {children}
        </div>
        {modal}
      </div>
    </SessionProvider>
  );
};

export default Layout;
