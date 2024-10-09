import RecordStory from "@/shared/components/RecordStory";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import Image from "next/image";
import React from "react";

const QuestionCard = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col p-5 gap-10 bg-white min-w-80 md:w-2/4 rounded-xl h-[320px] cursor-pointer hover:scale-95 transition-all ease-in duration-300">
          <div className="flex items-center gap-4 font-medium">
            <Image
              className="rounded-full h-16 w-16"
              src={"/profile_image.png"}
              alt="profile image"
              width={60}
              height={60}
            />
            <p className="text-purple">candice_li</p>
          </div>

          <h4 className="font-crimson text-4xl">How did you meet dad?</h4>
        </div>
      </DialogTrigger>
      <RecordStory />
    </Dialog>
  );
};

export default QuestionCard;
