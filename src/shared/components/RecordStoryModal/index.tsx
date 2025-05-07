"use client";
import { useVoiceVisualizer } from "react-voice-visualizer";
import Image from "next/image";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DialogContent, DialogClose, DialogTitle } from "../ui/dialog";
import { steps } from "./consts";
import ClosePurpleIcon from "@/assets/icons/close-purple.svg";
import { RecordStoryModalPropsT } from "./types";

const RecordStoryModal = ({
  onClose,
  isFreeStyle = false,
  questionOfTheWeek = "",
  freestyleStory = null,
  requestId=null,
  requestText=""
}: RecordStoryModalPropsT) => {
  const [currentStep, setCurrentStep] = useState(0);
  const recorderControls = useVoiceVisualizer();
  const [story, setStory] = useState(freestyleStory);

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const goToPreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const CurrentStepComponent = steps[currentStep].component;
  useEffect(() => {
    if (story) {
      setCurrentStep(1);
    }
  }, [story]);

  return (
    <DialogContent
      aria-describedby="record your story to the question "
      className={`max-h-[940px]  bg-transparent h-[100svh] w-full max-w-screen-sm ${
        currentStep === 0 ? "lg:max-w-[850px]" : "lg:max-w-[1200px]"
      } sm:h-[90svh] overflow-hidden lg:pr-12 pt-[15px]`}
    >
      {false ? (
        <>
          <DialogTitle hidden>Loading</DialogTitle>

          <Loader fill="#6A6FD5" className="mx-auto my-auto animate-spin" />
        </>
      ) : (
        <>
          <DialogTitle hidden>Record Story</DialogTitle>
          <DialogClose
            onClick={onClose}
            className="absolute z-50 p-0 rounded-full outline-none cursor-pointer top-1 right-3 lg:top-5 lg:right-0  w-fit"
          >
            <Image
              src={ClosePurpleIcon}
              alt="Close button"
              className="w-7 h-7 bg-white rounded-full p-0"
              width={30}
              height={30}
            />
          </DialogClose>

          <CurrentStepComponent
          requestId={requestId}
          requestText={requestText}
            setStory={setStory}
            goToPreviousStep={goToPreviousStep}
            recorderControls={recorderControls}
            goToNextStep={goToNextStep}
            onClose={onClose}
            story={story}
            isFreeStyle={isFreeStyle}
            questionOfTheWeek={questionOfTheWeek}
          />
        </>
      )}
    </DialogContent>
  );
};

export default RecordStoryModal;
