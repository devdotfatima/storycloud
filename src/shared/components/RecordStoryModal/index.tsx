"use client";
import { useVoiceVisualizer } from "react-voice-visualizer";
import Image from "next/image";
import React, { useState } from "react";
import { DialogContent, DialogClose } from "../ui/dialog";
import { steps } from "./consts";
import ClosePurpleIcon from "../../../assets/icons/close-purple.svg";

const RecordStoryModal = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const recorderControls = useVoiceVisualizer();

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const goToPreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <DialogContent
      aria-describedby="record your story to the question "
      className={`max-h-[940px]  bg-transparent h-[100svh] w-full max-w-screen-sm ${
        currentStep === 0 ? "lg:max-w-[850px]" : "lg:max-w-[1200px]"
      } sm:h-[90svh] overflow-hidden lg:pr-12 pt-[15px]`}
    >
      <DialogClose className="absolute z-50 p-0 rounded-full outline-none cursor-pointer top-1 right-3 lg:top-5 lg:right-0  w-fit">
        <Image
          src={ClosePurpleIcon}
          alt="Close button"
          className="w-7 h-7 bg-white rounded-full p-0"
          width={30}
          height={30}
        />
      </DialogClose>

      <CurrentStepComponent
        goToPreviousStep={goToPreviousStep}
        recorderControls={recorderControls}
        goToNextStep={goToNextStep}
      />
    </DialogContent>
  );
};

export default RecordStoryModal;
