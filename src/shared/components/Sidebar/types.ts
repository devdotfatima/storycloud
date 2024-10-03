import React from "react";

export type menuItem = {
  name: string;
  path: string;
  icon?: string;
};

export type sidebarItemProps = {
  item: menuItem;
  toggleNotifications: () => void;
  showNotifications: boolean;
};

export type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  showNotifications?: boolean;
};
