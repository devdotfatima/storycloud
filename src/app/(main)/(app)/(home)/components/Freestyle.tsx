"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import RecordStoryModal from "@/shared/components/RecordStoryModal";
import BookImage from "@/assets/images/book.png";

const Freestyle = () => {
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
          <h2 className="text-purple">freestyle</h2>
          <Image
            src={BookImage}
            alt="book image"
            className="rounded-2xl h-96 w-full object-cover"
            layout="responsive"
            width={400}
            height={400}
          />
        </div>
      </DialogTrigger>
      <RecordStoryModal onClose={closeDialog} isFreeStyle={true} />
    </Dialog>
  );
};

export default Freestyle;
