import React from "react";
import Image from "next/image";
import DeleteAccountConfirmationModal from "./components/DeleteAccountConfirmationModal";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import ReturnPurpleIcon from "../../../../assets/icons/return-purple.svg";
import TrashPurpleIcon from "../../../../assets/icons/trash-purple.svg";

const DeleteAccount = () => {
  return (
    <div className="absolute top-0 left-0 z-50 flex flex-col w-screen h-screen gap-6 p-10 md:p-0 md:w-full md:h-full md:relative bg-purple-100 ">
      <div className="flex items-center justify-center relative gap-4 md:mb-4 text-purple">
        <a
          href="/settings"
          className=" absolute top-1/2 transform -translate-y-1/2 left-0 md:hidden"
        >
          <Image
            src={ReturnPurpleIcon}
            alt="info icon"
            width={7}
            height={7}
            className="w-4 h-4 text-purple"
          />
        </a>
        <div className="flex items-end mx-auto md:mx-0 w-fit gap-2">
          <Image
            width={20}
            height={20}
            className="w-7 h-7 text-purple"
            alt="delete account icon"
            src={TrashPurpleIcon}
          />
          Delete account
        </div>
      </div>

      <p className="w-full max-w-sm  lg:max-w-lg mb-3">
        Deleting your account will permanently remove all your profile
        information, including recordings, photos, videos, comments, likes, and
        friends.
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="p-2  text-white  w-full md:w-72   bg-purple-400"
          >
            delete account
          </button>
        </DialogTrigger>
        <DeleteAccountConfirmationModal />
      </Dialog>
    </div>
  );
};

export default DeleteAccount;
