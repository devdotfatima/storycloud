"use client";
import Image from "next/image";
import React, { useState } from "react";
import RecordStoryModal from "@/shared/components/RecordStoryModal";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import User from "@/assets/icons/user-purple.svg";
import { QuestionCardPropsT } from "../types";

const QuestionCard = ({ request }: QuestionCardPropsT) => {
  const [isRecordStoryModalOpen, setIsRecordStoryModalOpen] = useState(false);

  const openDialog = () => {
    setIsRecordStoryModalOpen(true);
  };

  const closeDialog = () => {
    setIsRecordStoryModalOpen(false);
  };
  return (
    <Dialog open={isRecordStoryModalOpen}>
      <DialogTrigger asChild>
        <div
          className="flex flex-col p-5 gap-10 bg-white hover:shadow-md min-w-80 md:w-2/4 rounded-xl h-[320px] cursor-pointer  transition-all ease-in duration-300"
          onClick={openDialog}
        >
          <div className="flex items-center gap-4 font-medium">
            <div className=" rounded-full h-16 w-16 overflow-hidden ">
              <Image
                className={` object-contain flex items-center mx-auto rounded-full`}
                src={request.requestor_profile_image || User}
                alt="profile image"
                width={64}
                height={64}
              />
            </div>

            <p className="text-purple">{request.requestor_name}</p>
          </div>

          <h4 className="font-crimson text-4xl">{request.request_text} </h4>
        </div>
      </DialogTrigger>
      <RecordStoryModal onClose={closeDialog} />
    </Dialog>
  );
};

export default QuestionCard;
