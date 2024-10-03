"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { NavLinkProps } from "./types";

const NavLink = ({
  href,
  children,
  className = "",
  activeClassName = "active",
  showNotifications = false,
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${
        isActive && !showNotifications ? activeClassName : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
