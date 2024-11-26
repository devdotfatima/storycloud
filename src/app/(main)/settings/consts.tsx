import AccountInfo from "./AccountInfo";
import HelpAndSupport from "./HelpAndSupport/index";
import TermsAndConditions from "./TermsAndConditions";
import SignOut from "./signout";
import DeleteAccount from "./DeleteAccount";
import UserIcon from "../../../assets/icons/user.svg";
import HelpIcon from "../../../assets/icons/help.svg";
import DocumentIcon from "../../../assets/icons/document.svg";
import TrashIcon from "../../../assets/icons/trash.svg";
import LogOutIcon from "../../../assets/icons/log-out.svg";

export const settingTabs = [
  {
    id: 1,
    label: "Account Info",
    icon: UserIcon,
    content: <AccountInfo />,
  },
  {
    id: 2,
    label: "Help & Support",
    icon: HelpIcon,
    content: <HelpAndSupport />,
  },
  {
    id: 3,
    label: "Terms & Conditions",
    icon: DocumentIcon,
    content: <TermsAndConditions />,
  },
  {
    id: 4,
    label: "Delete Account",
    icon: TrashIcon,
    content: <DeleteAccount />,
  },
  {
    id: 5,
    label: "Sign Out",
    icon: LogOutIcon,
    content: <SignOut />,
  },
];
