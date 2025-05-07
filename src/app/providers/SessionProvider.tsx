"use client";

import { UserT } from "@/shared/types";
import { createContext, useContext } from "react";

const SessionContext = createContext<UserT | null>(null);

const SessionProvider = ({
  children,
  value,
}: React.PropsWithChildren<{ value: UserT|null }>) => (
  <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
);

export const useSessionContext = () => {
  return useContext(SessionContext); // UserT | null
};

export default SessionProvider;
