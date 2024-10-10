"use client";
import React, { useRef, useState, useEffect } from "react";
import { DialogContent, DialogClose, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import AudioRecorder from "../AudioRecorder";
import { formatRecordingTime } from "./formatRecordingTime";

const RecordStoryModal = () => {
  const [recordedUrl, setRecordedUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time while recording
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const chunks = useRef<Blob[]>([]);
  const recordingInterval = useRef<NodeJS.Timeout | null>(null); // Reference to the timer

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaStream.current = stream;

      mediaStream.current.getTracks().forEach((track) => {
        track.onended = () => {
          console.error("MediaStreamTrack ended due to capture failure");
        };
      });

      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );

      const options = {
        mimeType: isSafari
          ? "audio/mp4"
          : MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4",
      };

      mediaRecorder.current = new MediaRecorder(stream, options);

      mediaRecorder.current.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, {
          type: options.mimeType,
        });
        console.log("Recording stopped in Safari. Blob created:", recordedBlob); // Debugging in Safari
        const url = URL.createObjectURL(recordedBlob);
        setRecordedUrl(url);
        chunks.current = [];
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setIsPaused(false);

      recordingInterval.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
      setElapsedTime(elapsedTime);
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.pause();
      setIsPaused(true);
    }
    // Stop the timer and calculate the total duration
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
      setElapsedTime(elapsedTime);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "paused") {
      mediaRecorder.current.resume();
      recordingInterval.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      setIsPaused(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      // stopRecording();
      if (isPaused) {
        resumeRecording();
      } else {
        pauseRecording();
      }
    } else {
      startRecording();
    }
  };

  const handleRestart = () => {
    if (mediaRecorder.current) {
      // Stop and reset everything
      mediaRecorder.current.stop();
      chunks.current = [];
      setRecordedUrl("");
      setElapsedTime(0);

      // Restart recording
      startRecording();
    }
  };

  const handleDelete = () => {
    if (mediaRecorder.current) {
      // Stop and reset everything without restarting
      mediaRecorder.current.stop();
      chunks.current = [];
      setRecordedUrl("");
      setElapsedTime(0);
      setIsRecording(false); // Do not restart recording
    }
  };

  useEffect(() => {
    return () => {
      if (recordingInterval.current) clearInterval(recordingInterval.current);
      if (mediaStream.current) {
        mediaStream.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  console.log(recordedUrl);

  return (
    <DialogContent
      aria-description="record your story to the question "
      aria-describedby="record your story to the question "
      className=" lg:max-w-[860px]  max-h-[950px] bg-transparent w-full    h-[90vh] overflow-y-auto lg:overflow-hidden    lg:pr-8  pt-[20px] "
    >
      <DialogClose className="absolute z-50 p-0 rounded-full outline-none cursor-pointer top-1 right-3 md:top-5 md:right-0  w-fit">
        <Image
          src={"/close-purple.svg"}
          alt="Close button"
          className="w-7 h-7 bg-white rounded-full p-0"
          width={30}
          height={30}
        />
      </DialogClose>
      <div className="w-full h-full bg-white rounded-2xl p-6 md:p-10 flex flex-col  gap-6 md:gap-10 overflow-y-auto">
        <button
          className={`${
            elapsedTime > 0
              ? "bg-purple-100 text-purple "
              : " bg-grey-100 text-grey "
          } w-32 py-2  self-end`}
          onClick={stopRecording}
        >
          next
        </button>

        <DialogTitle className="text-center text-xl md:text-4xl font-crimson max-w-[600px] mx-auto md:px-6">
          What is your favorite travel destination?
        </DialogTitle>
        <div className="max-w-[600px] w-full h-fit md:max-h-[450px] bg-purple-100 md:h-full mx-auto  rounded-2xl p-6  sm:p-10 text-center">
          <h2 className="text-purple">some advice</h2>
          <ul className="text-left mt-8 flex flex-col  gap-4">
            <li>
              <span className="text-purple">Be yourself.</span> Your audience
              values authenticity.
            </li>
            <li>
              <span className="text-purple">Don’t rush.</span> Take your time
              and flow at your own pace.
            </li>
            <li>
              <span className="text-purple">Paint a picture.</span> Describe the
              scenes in detail.
            </li>
            <li>
              <span className="text-purple">Stay on course.</span> Focus on the
              main plot or message.
            </li>
            <li>
              {" "}
              <span className="text-purple">Keep it below 5 min.</span> That’s
              the average attention span.
            </li>
          </ul>
        </div>
        <div className="">
          <AudioRecorder
            formatTime={formatRecordingTime}
            toggleRecording={toggleRecording}
            isPaused={isPaused}
            isRecording={isRecording}
            elapsedTime={elapsedTime}
            handleDelete={handleDelete}
            handleRestart={handleRestart}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default RecordStoryModal;
