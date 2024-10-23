import React, { useState } from "react";
import Image from "next/image";
import {
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from "@/shared/components/ui/dialog";
import StorySentModal from "./StorySentModal";
import { RequestStoryModalPropsT } from "./types";

const RequestStoryModal = ({ isFriend }: RequestStoryModalPropsT) => {
  const [isRequestStoryModalOpen, setRequestStoryModalOpen] = useState(false);
  const [isStorySentModalOpen, setStorySentModalOpen] = useState(false);

  // Function to close both modals when StorySentModal is closed
  const handleCloseModals = () => {
    setRequestStoryModalOpen(false);
    setStorySentModalOpen(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild disabled={!isFriend}>
        <button
          className={`${
            isFriend
              ? "text-purple pointer-events-auto "
              : " text-grey pointer-events-none"
          }" py-1.5 sm:py-2 mt-2 max-w-60 w-full bg-white rounded-2xl"`}
        >
          request story
        </button>
      </DialogTrigger>
      <DialogContent className="bg-transparent w-full  h-[100svh] sm:h-[90svh]  lg:overflow-hidden sm:max-w-[600px] lg:max-h-[600px]  pt-[20px] lg:pr-10 border-0 outline-none rounded-2xl ">
        <DialogClose className="absolute z-50 p-0 rounded-full cursor-pointer top-2 right-4 outline-none  w-fit lg:top-5 lg:-right-0 bg-white">
          <Image
            src={"/close-purple.svg"}
            alt="Close modal"
            className="w-6 h-6"
            width={24}
            height={24}
          />
        </DialogClose>
        <div className="flex flex-col items-center w-full h-full  py-6  px-5 sm:px-10 mx-auto overflow-hidden bg-white shadow-md rounded-t-2xl sm:rounded-2xl gap-5 lg:gap-7 lg:py-10  ">
          <DialogTitle className="text-purple ">request a story</DialogTitle>
          <form className="w-full relative ">
            <input
              type="text"
              className="block px-5 h-16 sm:h-20 w-full z-20 placeholder:text-grey  rounded-xl  border border-purple focus:border-[1px] pr-10"
              placeholder="type your question"
              required
            />
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 h-full  font-medium text-white rounded-e-lg border-0   "
                >
                  <Image
                    src="/send-grey.svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    width={25}
                    height={25}
                    alt="send"
                  />
                </button>
              </DialogTrigger>
              <StorySentModal />
            </Dialog>
          </form>
          <h3 className="text-purple">suggestions</h3>

          {/* <section className="flex flex-col  items-center gap-7 w-full overflow-y-auto pr-1"> */}
          <section className="flex flex-col items-center gap-7 w-full  overflow-y-auto sm:overflow-visible pr-1">
            {" "}
            <div className="relative w-full min-h-20 max-h-20  rounded-xl   py-2  bg-purple-100  overflow-y-auto">
              <p className="text-purple px-5  w-full z-20 flex items-center  focus:border-[1px] pr-10">
                tell more about about your high school experience. what was that
                like?
              </p>
              <button
                type="submit"
                className="absolute top-0 end-2 p-2.5 h-full  font-medium text-white rounded-e-lg border-0  focus:ring-4 focus:outline-none  "
              >
                <Image
                  src="/send.svg"
                  width={25}
                  height={25}
                  alt="send"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                />
              </button>
            </div>
            <div className="relative w-full min-h-20 max-h-20  rounded-xl   py-2  bg-purple-100  overflow-y-auto">
              <p className="text-purple px-5  w-full z-20 flex items-center h-full  focus:border-[1px] pr-10">
                What is your favourite travel destination?
              </p>
              <button
                type="submit"
                className="absolute top-0 end-2 p-2.5 h-full  font-medium text-white rounded-e-lg border-0  focus:ring-4 focus:outline-none  "
              >
                <Image
                  src="/send.svg"
                  width={25}
                  height={25}
                  alt="send"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                />
              </button>
            </div>
            <div className="relative w-full min-h-20 max-h-20  rounded-xl   py-2  bg-purple-100  overflow-y-auto">
              <p className="text-purple px-5  w-full z-20 flex items-center  focus:border-[1px] pr-10">
                tell more about about your high school experience. what was that
                like?
              </p>
              <button
                type="submit"
                className="absolute top-0 end-2 p-2.5 h-full  font-medium text-white rounded-e-lg border-0  focus:ring-4 focus:outline-none  "
              >
                <Image
                  src="/send.svg"
                  width={25}
                  height={25}
                  alt="send"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                />
              </button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestStoryModal;
