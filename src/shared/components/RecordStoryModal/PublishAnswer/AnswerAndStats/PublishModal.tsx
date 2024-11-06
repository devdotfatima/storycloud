import React from "react";
import {
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
  Dialog,
} from "@/shared/components/ui/dialog";

// type Props = {};

// const PublishModal = (props: Props) => {
const PublishModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-4 h-10 flex items-center justify-center py-1.5 sm:py-2 bg-purple-400 text-white w-24 sm:w-32 border-0 hover:bg-purple">
          publish
        </button>
      </DialogTrigger>
      <DialogContent className="bg-transparent h-screen w-full lg:max-w-[450px] max-h-[260px]  overflow-y-auto lg:overflow-hidden border-0 ">
        <div className="relative flex flex-col items-center justify-end gap-10  h-full px-8 py-6 bg-white rounded-2xl ">
          <DialogTitle className="flex items-center pt-4 w-1/2 text-center leading-6 ">
            your story has been published successfully!
          </DialogTitle>

          <DialogClose className=" w-full">
            <button
              type="button"
              className="p-2 transition duration-150 mb-6 ease-in  text-purple bg-purple-100 w-full  "
            >
              done
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PublishModal;
