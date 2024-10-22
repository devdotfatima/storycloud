import React from "react";
import Image from "next/image";
import {
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from "@/shared/components/ui/dialog";
import StorySentModal from "./StorySentModal";
type Props = {};

const RequestStoryModal = (props: Props) => {
  return (
    <DialogContent className="bg-transparent w-full  h-[100svh] sm:h-[90svh]  lg:overflow-hidden sm:max-w-[600px] lg:max-h-[600px]  pt-[20px] lg:pr-10 border-0 outline-none rounded-2xl ">
      <DialogClose className="absolute z-50 p-0 rounded-full cursor-pointer top-2 right-4 outline-none  w-fit lg:top-5 lg:-right-0 bg-white">
        <img src={"/close-purple.svg"} alt="Close" className="w-6 h-6" />
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
  );
};

export default RequestStoryModal;
