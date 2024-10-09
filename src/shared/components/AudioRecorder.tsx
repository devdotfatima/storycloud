"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

const AudioRecorder = () => {
  const [recordedUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const [duration, setDuration] = useState(0); // Track the total duration of the recording
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time while recording
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunks = useRef<Blob[]>([]);
  const recordingInterval = useRef<NodeJS.Timeout | null>(null); // Reference to the timer

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      // mediaRecorder.current.onstop = () => {
      //   const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
      //   const url = URL.createObjectURL(recordedBlob);
      //   setRecordedUrl(url);
      //   chunks.current = [];
      //   setIsRecording(false);
      //   setElapsedTime(0); // Reset elapsed time
      // };

      mediaRecorder.current.start();
      setIsRecording(true);

      // Start the timer to track the elapsed time
      recordingInterval.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);

    // Stop the timer and calculate the total duration
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
      setDuration(elapsedTime); // Set the final duration
      setElapsedTime(elapsedTime);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // const togglePlayPause = () => {
  //   const audioElement = audioRef.current;
  //   if (isPlaying) {
  //     audioElement?.pause();
  //   } else {
  //     audioElement?.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };

  // const handleTimeUpdate = () => {
  //   const audioElement = audioRef.current;
  //   if (audioElement) {
  //     const progressValue =
  //       (audioElement.currentTime / audioElement.duration) * 100;

  //     const range = document.getElementById("progressBar");
  //     range?.style.setProperty("--value", `${progressValue}%`);
  //   }
  // };

  const handleTimeUpdate = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const progressValue =
        (audioElement.currentTime / audioElement.duration) * 100;
      setElapsedTime(audioElement.currentTime); // Update the elapsed time in state

      const range = document.getElementById("progressBar");
      if (range) {
        range.style.setProperty("--value", `${progressValue}`); // Dynamically update the --value
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = (Number(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    // Clear the interval when recording stops
    return () => {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  space-y-4 max-w-[600px] mx-auto">
      <div className="relative w-full">
        <audio
          ref={audioRef}
          src={recordedUrl}
          onTimeUpdate={handleTimeUpdate}
          className="w-full rounded-md"
          controls={false}
        />
        {/* <input
          type="range"
          value={elapsedTime} // Represents elapsed time in seconds
          id="progressBar"
          onChange={handleSeek}
          className="w-full custom-range mt-2"
          min="0"
          max="300" // Set max to 300 seconds for 5 minutes
          step="1" // Step of 1 second for the range
          style={{
            backgroundSize: `${(elapsedTime / 300) * 100}% 100%`,
            transition: "background-size 0.1s ease-in-out",
          }} // Ensure background size represents the correct fraction of 5 minutes
        /> */}
        <input
          type="range"
          value={elapsedTime} // Represents elapsed time in seconds
          id="progressBar"
          onChange={handleSeek}
          className="w-full custom-range mt-2"
          min="0"
          max="300" // Set max to 300 seconds for 5 minutes
          step="1" // Step of 1 second for the range
          style={{
            background: `linear-gradient(to right, #6a6fd5 ${Math.min(
              (elapsedTime / 300) * 100,
              100
            )}%, #b1b1b1 ${Math.min((elapsedTime / 300) * 100, 100)}%)`,
          }}
        />

        <div className="text-sm text-black w-full flex justify-between">
          <span className="block">{formatTime(elapsedTime)} </span>{" "}
          {/* Elapsed Time */}
          <span className="block">05:00</span> {/* Total Duration */}
        </div>
      </div>

      <div className="flex justify-between w-full ">
        <Image
          alt="delete recording"
          width={40}
          height={40}
          src={"./restart-grey.svg"}
        />
        <button
          onClick={toggleRecording}
          className={`w-24 h-24 rounded-full text-white  focus:outline-none bg-purple-100 flex justify-center items-center`}
        >
          {isRecording ? (
            <Image
              src={"/pause.svg"}
              alt="pause the recording"
              width={48}
              height={48}
              className="w-12 h-12 text-blue-500"
            />
          ) : (
            <Image
              src={"/microphone-purple.svg"}
              alt="start the recording"
              width={48}
              height={48}
              className="w-12 h-12 text-blue-500"
            />
          )}
        </button>
        <Image
          alt="delete recording"
          width={40}
          height={40}
          src={"./trash-grey.svg"}
        />
      </div>
    </div>
  );
};

export default AudioRecorder;

// import React, { useRef, useState } from "react";
// const AudioRecorder = () => {
//   const [recordedUrl, setRecordedUrl] = useState("");

//   const mediaStream = useRef<MediaStream | null>(null);
//   const mediaRecorder = useRef<MediaRecorder | null>(null);

//   const chunks = useRef<Blob[]>([]);

//   const startRecording = async (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>
//   ) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaStream.current = stream;
//       mediaRecorder.current = new MediaRecorder(stream);
//       mediaRecorder.current.ondataavailable = (e) => {
//         if (e.data.size > 0) {
//           chunks.current.push(e.data);
//         }
//       };
//       mediaRecorder.current.onstop = () => {
//         const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
//         const url = URL.createObjectURL(recordedBlob);
//         setRecordedUrl(url);
//         chunks.current = [];
//       };
//       mediaRecorder.current.start();
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//     }
//   };
//   const stopRecording = () => {
//     if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
//       mediaRecorder.current.stop();
//     }
//     if (mediaStream.current) {
//       mediaStream.current.getTracks().forEach((track) => {
//         track.stop();
//       });
//     }
//   };
//   return (
//     <div>
//       <audio controls src={recordedUrl} />
//       <button onClick={startRecording}>Start Recording</button>
//       <button onClick={stopRecording}>Stop Recording</button>
//     </div>
//   );
// };
// export default AudioRecorder;
