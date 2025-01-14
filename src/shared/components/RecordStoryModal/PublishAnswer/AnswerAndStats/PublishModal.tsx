import React from "react";
import {
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
  Dialog,
} from "@/shared/components/ui/dialog";
import { PublishModalPropsT } from "../types";

const PublishModal = ({
  onClose,
  isPublished,
  handlePublish,
}: PublishModalPropsT) => {
  return (
    <Dialog open={isPublished} onOpenChange={handlePublish}>
      <DialogTrigger asChild>
        <button className="px-4 h-10 flex items-center justify-center py-1.5 sm:py-2 bg-purple-400 text-white w-24 sm:w-32 border-0 hover:bg-purple">
          publish
        </button>
      </DialogTrigger>
      <DialogContent className="bg-transparent md:h-full w-[90svw] lg:max-w-[450px] md:max-h-[260px] h-[200px] sm:h-[220px]  overflow-y-auto lg:overflow-hidden border-0 ">
        <div className="relative flex flex-col items-center justify-end gap-6 md:gap-10 h-full px-4 sm:px-8 py-6 bg-white rounded-2xl ">
          <DialogTitle className="flex items-center md:pt-4 md:w-1/2 text-center leading-6 mb-4">
            your story has been published successfully!
          </DialogTitle>

          <DialogClose
            type="button"
            onClick={onClose}
            className="p-2 transition duration-150 mb-3 sm:mb-4  ease-in  text-purple bg-purple-100 w-full  "
          >
            done
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PublishModal;

// open={isPublished} onOpenChange={onClose}
