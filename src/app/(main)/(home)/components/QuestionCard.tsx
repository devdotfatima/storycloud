import Image from "next/image";
import React from "react";
import RecordStoryModal from "@/shared/components/RecordStoryModal";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import ProfileImage from "../../../../assets/images/profile_image.png";

const QuestionCard = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col p-5 gap-10 bg-white hover:shadow-md min-w-80 md:w-2/4 rounded-xl h-[320px] cursor-pointer  transition-all ease-in duration-300">
          <div className="flex items-center gap-4 font-medium">
            <Image
              className="rounded-full h-16 w-16"
              src={ProfileImage}
              alt="profile image"
              width={60}
              height={60}
            />
            <p className="text-purple">candice_li</p>
          </div>

          <h4 className="font-crimson text-4xl">How did you meet dad?</h4>
        </div>
      </DialogTrigger>
      <RecordStoryModal />
    </Dialog>
  );
};

export default QuestionCard;
