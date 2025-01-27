import React, { useCallback, useEffect, useState } from "react";
import { Mp3Encoder } from "lamejs";
import AudioRecorder from "../../AudioRecorder";
import { RecordAnswerPropsT } from "./types";
import { useCreateStory } from "./mutations";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { StoryAnswerT } from "@/shared/types";
import LoadingButton from "../../LoadingButton";

const RecordAnswer = ({
  goToNextStep,
  recorderControls,
  isFreeStyle = false,
  questionOfTheWeek = "",
  setStory,
}: RecordAnswerPropsT) => {
  const [title, setTitle] = useState(questionOfTheWeek || "freestyle");
  const user = useSessionContext();
  const [isConverting, setIsConverting] = useState(false);
  const createStoryMutation = useCreateStory(user);
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };
  const {
    startRecording,
    stopRecording,
    recordingTime,
    isPausedRecording,
    isRecordingInProgress,
    togglePauseResume,
    clearCanvas,
    formattedRecordingTime,
    recordedBlob,
  } = recorderControls;

  const toggleRecording = () => {
    if (isRecordingInProgress) {
      togglePauseResume();
    } else {
      startRecording();
    }
  };

  const handleRestart = () => {
    stopRecording();
    clearCanvas();
  };

  const handleDelete = () => {
    stopRecording();
    clearCanvas();
  };

  const convertToMp3 = useCallback(async (audioBlob: Blob) => {
    try {
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioContext = new AudioContext();

      // Decode the audio Blob into raw audio data
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const channelData = audioBuffer.getChannelData(0); // Assuming mono audio
      const sampleRate = audioBuffer.sampleRate;

      // Convert Float32Array to Int16Array
      const floatToInt16 = (input: Float32Array): Int16Array => {
        const output = new Int16Array(input.length);
        for (let i = 0; i < input.length; i++) {
          let sample = input[i];
          sample = Math.max(-1, Math.min(1, sample)); // Clamp to [-1, 1]
          output[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff; // Scale to 16-bit
        }
        return output;
      };

      const int16ChannelData = floatToInt16(channelData);

      // Create an MP3 encoder
      const mp3Encoder = new Mp3Encoder(1, sampleRate, 128); // 1 channel, sampleRate, 128kbps
      const samplesPerFrame = 1152;
      const mp3Data: Uint8Array[] = [];

      for (let i = 0; i < int16ChannelData.length; i += samplesPerFrame) {
        const sampleChunk = int16ChannelData.subarray(i, i + samplesPerFrame);
        const mp3Buffer = mp3Encoder.encodeBuffer(sampleChunk);
        if (mp3Buffer.length > 0) {
          mp3Data.push(mp3Buffer);
        }
      }

      // Finish encoding
      const mp3End = mp3Encoder.flush();
      if (mp3End.length > 0) {
        mp3Data.push(mp3End);
      }

      const mp3Blob = new Blob(mp3Data, { type: "audio/mpeg" });
      return mp3Blob;
    } catch (error) {
      console.error("Error converting audio to MP3:", error);
      throw error;
    }
  }, []);

  const onNext = () => {
    stopRecording();
    setIsConverting(true);
  };

  const processAudio = useCallback(
    async (recordedBlob: Blob) => {
      try {
        const mp3Blob = await convertToMp3(recordedBlob);
        if (!mp3Blob) throw new Error("MP3 conversion failed");

        // Wrap the MP3 Blob in a File instance
        const mp3File = new File([mp3Blob], "recording.mp3", {
          type: "audio/mpeg",
        });

        createStoryMutation.mutate(
          { audio: mp3File },
          {
            onSuccess: (data) => {
              setStory(data as StoryAnswerT);
              goToNextStep();
            },
            onError: (error) => {
              console.error("Error response:", error);
            },
          }
        );
      } catch (error) {
        console.error("Error during MP3 conversion or mutation:", error);
      } finally {
        setIsConverting(false); // Stop the loader
      }
    },
    [convertToMp3, createStoryMutation, goToNextStep, setStory]
  );

  useEffect(() => {
    if (!recordedBlob) {
      return;
    }
    if (recordedBlob && isConverting) {
      processAudio(recordedBlob);
    }
  }, [recordedBlob, processAudio, isConverting]);
  return (
    <div className="w-full h-full overflow-hidden  bg-white rounded-2xl p-6 md:p-10 flex flex-col  gap-6 lg:gap-10 [@media(max-height:760px)]:overflow-y-auto">
      <LoadingButton
        loading={isConverting || createStoryMutation.isPending}
        type="button"
        onClick={onNext}
        className={`${
          recordingTime > 0
            ? "bg-purple-100 text-purple pointer-events-auto "
            : " bg-grey-100 text-grey pointer-events-none "
        } w-32 py-2  self-end disabled:cursor-progress`}
      >
        next
      </LoadingButton>

      <div
        className={`text-center text-2xl h-40 max-w-[600px] mx-auto flex items-center justify-center sm:text-3xl font-crimson font-medium ${
          isFreeStyle
            ? "bg-white border-purple border-2 sm:border-0 sm:bg-purple-100 rounded-2xl"
            : "md:bg-purple-100"
        } w-full p-4 rounded-xl`}
      >
        {isFreeStyle ? (
          <textarea
            className="border-0 outline-none overflow-y-auto  max-h-full sm:bg-purple-100 flex items-center  w-full resize-none text-center rounded align-middle"
            rows={1}
            value={title}
            onChange={handleTitleChange}
          />
        ) : (
          <p className="h-fit "> {questionOfTheWeek} </p>
        )}
      </div>
      <div className=" pr-1  bg-purple-100 w-full  max-w-[600px]  mx-auto rounded-2xl lg:max-h-[450px] overflow-hidden min-h-[220px] h-full py-2 ">
        <div className="overflow-y-auto text-center h-full ">
          <h2 className="text-purple pt-4 lg:pt-7">some advice</h2>
          <ul className="text-left px-6 lg:px-10 py-4 lg:py-8  flex flex-col  gap-4">
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
      </div>
      <div className="  w-full h-fit min-h-32 lg:min-h-40 items-end overflow-y-auto flex self-end ">
        <AudioRecorder
          recorderControls={recorderControls}
          toggleRecording={toggleRecording}
          isPaused={isPausedRecording}
          isRecording={isRecordingInProgress}
          formattedRecordingDuration={formattedRecordingTime}
          recordingTime={recordingTime}
          handleDelete={handleDelete}
          handleRestart={handleRestart}
        />
      </div>
    </div>
  );
};

export default RecordAnswer;
