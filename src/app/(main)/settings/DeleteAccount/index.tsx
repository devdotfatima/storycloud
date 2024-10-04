import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import DeleteAccountConfirmationModal from "./components/DeleteAccountConfirmationModal";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";

const DeleteAccount = () => {
  return (
    <div className="absolute top-0 left-0 z-50 flex flex-col w-screen h-screen gap-6 p-10 md:p-0 md:w-full md:h-full md:relative bg-purple-100 ">
      <a href="/settings" className="md:hidden">
        {" "}
        <ArrowLeft />
      </a>
      <div className="flex items-center gap-4  md:mb-5 text-purple">
        <Image
          width={30}
          height={30}
          alt="delete account icon"
          src={"/trash-purple.svg"}
        />
        Delete account
      </div>

      <p className="w-full max-w-sm  lg:max-w-lg">
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
