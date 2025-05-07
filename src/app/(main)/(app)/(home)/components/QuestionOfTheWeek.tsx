"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import RecordStoryModal from "@/shared/components/RecordStoryModal";
import CatOnWallImage from "@/assets/images/cat_on_wall.png";

const QuestionOfTheWeek = () => {
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
          className="flex flex-col gap-3 lg:gap-6 md:w-1/2 cursor-pointer"
          onClick={openDialog}
        >
          <h2 className="text-purple">question of the week</h2>
          <div className="relative w-full h-fit">
            <p className="absolute font-crimson font-medium text-2xl sm:text-3xl lg:text-4xl w-2/3 lg:w-1/2 top-2/3 transform -translate-y-1/2 left-1/3  -translate-x-1/3">
              Tell us about your first pet!
            </p>
            <Image
              src={CatOnWallImage}
              alt="cat image"
              className="rounded-2xl h-96 w-full object-cover"
              layout="responsive"
              width={400}
              height={400}
            />
          </div>
        </div>
      </DialogTrigger>
      <RecordStoryModal
        onClose={closeDialog}
        questionOfTheWeek="What is your favorite travel destination?"
        requestId={null}
        requestText={null}
      />
    </Dialog>
  );
};

export default QuestionOfTheWeek;
