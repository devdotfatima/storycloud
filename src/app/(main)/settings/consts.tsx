import AccountInfo from "./AccountInfo";
import HelpAndSupport from "./HelpAndSupport";
import TermsAndConditions from "./TermsAndConditions";
import DeleteAccount from "./DeleteAccount";
import SignOut from "./SignOut/index";

export const settingTabs = [
  {
    id: 1,
    label: "Account Info",
    icon: "/user.svg",
    content: <AccountInfo />,
  },
  {
    id: 2,
    label: "Help & Support",
    icon: "/help.svg",
    content: <HelpAndSupport />,
  },
  {
    id: 3,
    label: "Terms & Conditions",
    icon: "/document.svg",
    content: <TermsAndConditions />,
  },
  {
    id: 4,
    label: "Delete Account",
    icon: "/trash.svg",
    content: <DeleteAccount />,
  },
  {
    id: 5,
    label: "Sign Out",
    icon: "/log-out.svg",
    content: <SignOut />,
  },
];
