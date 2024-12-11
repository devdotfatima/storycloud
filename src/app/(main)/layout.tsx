import { redirect } from "next/navigation";
import React from "react";
import { MainLayoutPropsT } from "@/shared/types";
import { validateUser } from "@/lib/dal";
import SessionProvider from "../providers/SessionProvider";

const Layout = async ({ children }: MainLayoutPropsT) => {
  const { user } = await validateUser();
  if (!user) redirect("/login");
  return <SessionProvider value={user}>{children}</SessionProvider>;
};

export default Layout;
