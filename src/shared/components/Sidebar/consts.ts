import MicrophoneIcon from "@/assets/icons/microphone.svg";
import SearchIcon from "@/assets/icons/search.svg";
import BookmarkIcon from "@/assets/icons/bookmark.svg";
import BellIcon from "@/assets/icons/bell.svg";
import UserIcon from "@/assets/icons/user.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import { menuItem } from "./types";

export const menuItems: menuItem[] = [
  {
    name: "record",
    path: "/",
    icon: MicrophoneIcon,
  },
  {
    name: "explore",
    path: "/explore",
    icon: SearchIcon,
  },
  {
    name: "saved",
    path: "/saved",
    icon: BookmarkIcon,
  },
  {
    name: "notifications",
    path: "/notifications",
    icon: BellIcon,
  },
  {
    name: "profile",
    path: "/profile",
    icon: UserIcon,
  },
  {
    name: "settings",
    path: "/settings",
    icon: SettingsIcon,
  },
];
