
import React from "react";
import { MainLayoutPropsT } from "@/shared/types";
import { validateUser } from "@/lib/dal";
import SessionProvider from "../providers/SessionProvider";
import ClientLayout from "./ClientLayout";

const Layout = async ({ children }: MainLayoutPropsT) => {
  const { user } = await validateUser();

  return (
    <SessionProvider value={user ?? null}>
      <ClientLayout>{children}</ClientLayout>
    </SessionProvider>
  );
};

export default Layout;