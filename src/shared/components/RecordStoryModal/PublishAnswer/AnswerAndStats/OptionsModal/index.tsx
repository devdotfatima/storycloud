"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
  Dialog,
} from "@/shared/components/ui/dialog";
import ClosePurpleIcon from "@/assets/icons/close-purple.svg";
import ReturnPurpleIcon from "@/assets/icons/return-purple.svg";
import CopyPurpleIcon from "@/assets/icons/copy-purple.svg";
import { OptionsModalPropsT } from "../../types";
import { useDeleteStory } from "./mutations";
import { useSessionContext } from "@/app/providers/SessionProvider";
import LoadingButton from "@/shared/components/LoadingButton";

const OptionsModal = ({
  toggleEditMode,
  story,
  onClose,
}: OptionsModalPropsT) => {
  const [showLink, setShowLink] = useState(false);
  const [deleteStory, setDeleteStory] = useState(false);
  const pathname = usePathname();
  const user = useSessionContext();
  const myStory = true;
  const handleCopyClick = () => {
    navigator.clipboard.writeText(` http://localhost:3000${pathname}`);
  };
  const { mutate: deleteStoryMutation, isPending: isDeleting } = useDeleteStory(
    story ? story.story_id : "",
    user
  );

  const handleDeleteStory = () => {
    deleteStoryMutation(undefined, {
      onSuccess: () => {
        setDeleteStory(true);

        onClose?.();
      },
      onError: (error) => {
        console.log("error", error);

        alert("Failed to delete the story: " + error.message);
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-4 h-10 flex items-center justify-center py-1.5 sm:py-2 bg-purple-400 text-white w-24 sm:w-32 border-0 hover:bg-purple">
          options
        </button>
      </DialogTrigger>
      <DialogContent className="bg-transparent h-screen w-full lg:max-w-[450px] max-h-[330px]  overflow-y-auto lg:overflow-hidden border-0 ">
        <DialogClose className="z-50  absolute top-2 right-2 text-purple ">
          <Image src={ClosePurpleIcon} alt="close modal" />
        </DialogClose>

        {!showLink && !deleteStory ? (
          <div className="relative flex flex-col items-center justify-between  h-full gap-2 px-8 py-6 bg-white rounded-2xl ">
            <DialogTitle className="flex items-center justify-center pt-4 ">
              options
            </DialogTitle>
            {myStory ? (
              // <DialogClose className="w-full">
              <button
                onClick={() => {
                  toggleEditMode();
                }}
                className="p-2 transition duration-150 ease-in mt-6 text-center text-purple bg-purple-100 w-full  "
              >
                edit story
              </button>
            ) : // </DialogClose>
            null}
            <button
              type="button"
              onClick={() => setShowLink(true)}
              className="p-2 transition duration-150 ease-in  my-auto text-purple bg-purple-100 w-full  "
            >
              share link
            </button>
            {myStory ? (
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteStory(true)}
                className="p-2 transition duration-150 mb-6 ease-in  text-purple bg-purple-100 w-full  "
              >
                delete
              </button>
            ) : null}
          </div>
        ) : null}
        {showLink ? (
          <div className="relative flex flex-col  h-full gap-4 px-8 py-6  bg-white rounded-2xl ">
            <button type="button" onClick={() => setShowLink(false)}>
              <Image src={ReturnPurpleIcon} alt="go back" />
            </button>

            <DialogTitle className="flex items-center justify-center ">
              share link
            </DialogTitle>
            <div className="bg-purple-100 px-5 relative  flex-col  mt-4 text-purple w-full h-full rounded-2xl flex items-center justify-center">
              http://localhost:3000{pathname}
              <button
                type="button"
                onClick={handleCopyClick}
                className=" self-end absolute bottom-4 flex items-end "
              >
                <Image src={CopyPurpleIcon} alt="go back" />
              </button>
            </div>
          </div>
        ) : null}
        {deleteStory ? (
          <div className="relative flex flex-col  h-full gap-4 px-8 py-6  bg-white rounded-2xl ">
            <button type="button" onClick={() => setDeleteStory(false)}>
              <Image src={ReturnPurpleIcon} alt="go back" />
            </button>
            <DialogTitle className="flex items-center justify-center ">
              delete story?
            </DialogTitle>
            <div className="my-auto ">
              <LoadingButton
                disabled={isDeleting}
                loading={isDeleting}
                type="button"
                onClick={handleDeleteStory}
                className="p-2 transition duration-150 mb-6 ease-in text-red bg-red-100 hover:bg-red hover:text-red-100 w-full  "
              >
                delete
              </LoadingButton>
              <button></button>{" "}
              <button
                type="button"
                onClick={() => setDeleteStory(false)}
                className="p-2 transition duration-150 ease-in text-purple bg-purple-100 w-full  "
              >
                cancel
              </button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default OptionsModal;
