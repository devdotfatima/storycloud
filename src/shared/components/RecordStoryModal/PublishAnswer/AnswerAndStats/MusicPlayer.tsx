import React, { useCallback, useEffect, useRef, useState } from "react";
import "./MusicPlayer.css";
import PlayIcon from "../../../../../assets/icons/play.svg";
import PauseWhiteIcon from "../../../../../assets/icons/pause-white.svg";
import NextIcon from "../../../../../assets/icons/next-black.svg";
import RestartIcon from "../../../../../assets/icons/restart.svg";
import Image from "next/image";
import { useParams } from "next/navigation";
import DeleteAudioModal from "@/shared/components/AudioRecorder/DeleteAudioModal";
import RestartAudioModal from "@/shared/components/AudioRecorder/RestartAudioModal";
import { MusicPlayerPropsT } from "../types";
import RestartGreyIcon from "../../../../../assets/icons/restart-grey.svg";

const MusicPlayer = ({
  soundURL,
  stopRecording,
  clearCanvas,
  goToPreviousStep,
  isEditing,
}: MusicPlayerPropsT) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { storyId } = useParams();

  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);
  // const updateProgress = () => {
  //   if (!audioRef.current) return;
  //   const { currentTime, duration } = audioRef.current;
  //   setProgress((currentTime / duration) * 100);
  //   setCurrentTime(currentTime);
  // };
  const updateProgress = useCallback(() => {
    if (audioRef.current && duration) {
      const { currentTime } = audioRef.current;
      setProgress((currentTime / duration) * 100);
      setCurrentTime(currentTime);
    }
  }, [duration]);
  const seekAudio = (event: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current;
    if (progressBar && audioRef.current) {
      const rect = progressBar.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const width = rect.width;
      const clickRatio = clickX / width;
      const duration = audioRef.current.duration;
      audioRef.current.currentTime = clickRatio * duration;
      setCurrentTime(audioRef.current.currentTime);
      setProgress(clickRatio * 100);
    }
  };

  const startDrag = () => {
    setIsDragging(true);
    window.addEventListener("mousemove", dragThumb);
    window.addEventListener("mouseup", stopDrag);
  };

  const stopDrag = (event: MouseEvent) => {
    if (isDragging) {
      seekAudio(event as unknown as React.MouseEvent<HTMLDivElement>);
      setIsDragging(false);
      window.removeEventListener("mousemove", dragThumb);
      window.removeEventListener("mouseup", stopDrag);
    }
  };
  const dragThumb = (event: MouseEvent) => {
    if (isDragging && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const width = rect.width;
      const dragProgress = Math.max(0, Math.min((clickX / width) * 100, 100));

      setProgress(dragProgress);
      if (audioRef.current) {
        audioRef.current.currentTime =
          (dragProgress / 100) * audioRef.current.duration;
        formatTime(audioRef.current.currentTime);

        setCurrentTime(audioRef.current.currentTime);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleRestart = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setProgress(0);
    }
    stopRecording?.();
    clearCanvas?.();
    goToPreviousStep?.();
  }, [stopRecording, clearCanvas, goToPreviousStep]);

  const forwardAudioThirtySeconds = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = Math.min(
      audioRef.current.currentTime + 30,
      audioRef.current.duration
    );
    updateProgress();
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    const fetchActualDuration = (event: Event) => {
      const target = event.target as HTMLAudioElement;
      setCurrentTime(0);

      if (target) {
        setCurrentTime(0);

        setDuration(target.duration); // Set the actual duration
        target.removeEventListener("timeupdate", fetchActualDuration); // Clean up
      }
    };

    const setAudioDuration = () => {
      if (
        audioElement &&
        (audioElement.duration === Infinity || isNaN(audioElement.duration))
      ) {
        audioElement.currentTime = 1e101; // Set to a very large number to force duration calculation
        audioElement.addEventListener("timeupdate", fetchActualDuration);
      } else {
        setDuration(audioElement?.duration || 0);
        setCurrentTime(0);
      }
    };

    setAudioDuration();

    if (audioElement) {
      audioElement.addEventListener("loadedmetadata", setAudioDuration);
      audioElement.addEventListener("timeupdate", updateProgress);
      audioElement.addEventListener("ended", () => setIsPlaying(false));
    }

    // Cleanup event listeners on unmount
    return () => {
      if (audioElement) {
        audioElement.removeEventListener("loadedmetadata", setAudioDuration);
        audioElement.removeEventListener("timeupdate", updateProgress);
        audioElement.removeEventListener("timeupdate", fetchActualDuration);
      }
    };
  }, [updateProgress]);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between gap-4 w-full items-center">
        <span>{formatTime(currentTime)}</span>

        <div className="w-full">
          <div
            className="progress-bar-container"
            ref={progressBarRef}
            onClick={seekAudio}
          >
            <div className="progress" style={{ width: `${progress}%` }}></div>
            <div
              className="progress-thumb"
              style={{ left: `${progress}%` }}
              onMouseDown={startDrag}
              onClick={startDrag}
            ></div>
          </div>

          <audio ref={audioRef} src={soundURL} preload="true" />
        </div>

        <span>{formatTime(duration)}</span>
      </div>

      <div className="flex justify-between w-full space-x-6 mt-6 items-start ">
        {!storyId ? (
          <RestartAudioModal
            handleRestart={handleRestart}
            recordingTime={duration}
          />
        ) : (
          <button
            className="flex flex-col items-center justify-center gap-1.5"
            aria-label="restart recording"
            onClick={handleRestart}
          >
            <Image
              alt="restart recording"
              className="w-10 h-10  lg:w-16 lg:h-16"
              width={60}
              height={60}
              src={isEditing ? RestartGreyIcon : RestartIcon}
            />
            <span className={`text-base ${"text-black"}`}>restart</span>
          </button>
        )}

        <button
          onClick={togglePlayPause}
          className={`w-14 h-14  lg:w-24 lg:h-24  bg-purple-400  rounded-full text-white flex justify-center items-center`}
        >
          <Image
            src={isPlaying ? PauseWhiteIcon : PlayIcon}
            alt="play recording"
            width={40}
            height={30}
            className="w-6 h-6 lg:w-12 lg:h-10 ml-1"
          />
        </button>

        {!storyId ? (
          <DeleteAudioModal
            recordingTime={duration}
            handleDelete={handleRestart}
          />
        ) : null}
        {storyId ? (
          <>
            {" "}
            <button
              className="flex flex-col items-center justify-center gap-1.5"
              aria-label="forward audio by 30 seconds"
              onClick={forwardAudioThirtySeconds}
            >
              <Image
                alt="forward audio by 30 seconds"
                width={60}
                height={60}
                className="w-10 h-10  lg:w-16 lg:h-16"
                src={NextIcon}
              />
              <span className={`text-base ${"text-black"}`}>next</span>
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default MusicPlayer;
