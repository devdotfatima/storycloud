"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSessionContext } from "../providers/SessionProvider";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSessionContext();

  const isModalStoryRoute = pathname.startsWith("/story/");
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!session && !isModalStoryRoute) {
      router.push("/login");
    } else {
      setShouldRender(true);
    }
  }, [session, isModalStoryRoute, router]);

  if (!shouldRender) return null; 

  return <>{children}</>;
};

export default ClientLayout;