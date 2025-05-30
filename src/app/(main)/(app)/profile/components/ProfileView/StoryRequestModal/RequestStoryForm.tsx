"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useTransition, useState } from "react";
import SendGreyIcon from "@/assets/icons/send-grey.svg";
import SendPurpleIcon from "@/assets/icons/send.svg";
import { RequestStoryFormPropsT } from "./types";
import { useForm } from "react-hook-form";
import { storyRequestSchema, StoryRequestT } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendStoryRequest } from "./actions";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { Loader } from "lucide-react";

const RequestStoryForm = ({
  onSend,
  setRequest,
  setRequestId,
}: RequestStoryFormPropsT) => {
  const [error, setError] = useState<string>();
  const { userHandle } = useParams();
  const [isPending, startTransition] = useTransition();
  const handle = typeof userHandle === "string" ? userHandle : "";
  const user = useSessionContext();
  const form = useForm<StoryRequestT>({
    resolver: zodResolver(storyRequestSchema),
    defaultValues: {
      request_text: "",
      receiver_id: handle,
    },
  });
  const handleSubmit = (data: StoryRequestT) => {
    setError(undefined);
    startTransition(async () => {
      const response = await sendStoryRequest(data, user);

      if (response?.error) {
        setError(response.error);
      } else {
        setRequest(form.getValues("request_text"));
        setRequestId(response.request_id || null);
        onSend();
      }
    });
  };

  return (
    <form className="w-full " onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="relative">
        <input
          type="text"
          {...form.register("request_text")}
          className="block px-5 h-16 sm:h-18 w-full z-20    rounded-xl  border border-purple focus:border-[1px] pr-10"
          placeholder="type your question"
        />
        <button
          type="submit"
          disabled={!form.watch("request_text") || isPending}
          className="absolute -top-0 end-0 p-2.5 h-full  font-medium text-white rounded-e-lg border-0   "
        >
          {isPending ? (
            <Loader
              className="animate-spin size-8 text-purple cursor-default"
              fill="red"
              color="purple"
            />
          ) : (
            <Image
              src={form.watch("request_text") ? SendPurpleIcon : SendGreyIcon}
              className="h-5 w-5 sm:h-6 sm:w-6"
              width={25}
              height={25}
              alt="send"
            />
          )}
        </button>
      </div>

      {form.formState.errors.request_text && (
        <p className="text-red-500 text-sm mt-1">
          {form.formState.errors.request_text.message}
        </p>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  );
};

export default RequestStoryForm;
