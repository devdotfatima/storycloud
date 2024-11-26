"use client";

import { UserT } from "@/shared/types";
import { createContext, useContext } from "react";

const SessionContext = createContext<UserT | null>(null);

const SessionProvider = ({
  children,
  value,
}: React.PropsWithChildren<{ value: UserT }>) => (
  <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
);

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within SessionProvider");
  }
  return context;
};
export default SessionProvider;
