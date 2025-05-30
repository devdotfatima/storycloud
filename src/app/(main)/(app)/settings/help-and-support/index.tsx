"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import TopicsDropdown from "./TopicsDropdown";
import ReturnPurpleIcon from "@/assets/icons/return-purple.svg";
import HelpPurpleIcon from "@/assets/icons/help-purple.svg";
import { helpRequestSchema, helpRequestT } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendHelpRequest } from "./actions";

const HelpAndSupport = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const form = useForm<helpRequestT>({
    resolver: zodResolver(helpRequestSchema),
    defaultValues: {
      subject: "",
      text: "",
      topic: "",
    },
  });

  const onSubmit = async (data: helpRequestT) => {
    setError(undefined);
    setSuccess(false);
    startTransition(async () => {
      const response = await sendHelpRequest(data);

      if (response?.error) {
        setError(response.error);
      }
      if (response?.success) {
        setSuccess(true);
        setIsSubmitted(true);
      }
    });
  };

  return (
    <div className="absolute top-0 left-0 z-50 flex flex-col w-screen h-screen gap-6 p-10 lowercase md:p-0 md:w-full md:h-full md:relative bg-purple-100">
      <div className="flex items-center justify-center md:justify-start relative gap-4 md:mb-4 text-purple">
        <a
          href="/settings"
          className="absolute top-1/2 transform -translate-y-1/2 left-0 md:hidden"
        >
          <Image
            src={ReturnPurpleIcon}
            alt="info icon"
            width={7}
            height={7}
            className="w-4 h-4 text-purple"
          />
        </a>
        <div className="flex items-end mx-auto md:mx-0 w-fit gap-2">
          <Image
            src={HelpPurpleIcon}
            alt="help and support icon"
            width={20}
            height={20}
            className="w-7 h-7 text-purple"
          />
          Help & Support
        </div>
      </div>
      <Form {...form}>
        {error && <p className="text-center text-red">{error}</p>}

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 sm:mr-6 lg:mr-20"
        >
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>topic</FormLabel>
                <FormControl>
                  <TopicsDropdown field={field} disabled={isSubmitted} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>subject</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-2 pl-5 sm:max-w-sm lg:max-w-lg bg-white disabled:bg-white"
                    placeholder="subject"
                    {...field}
                    disabled={isSubmitted}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>message</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="type in your message"
                    className="w-full disabled:bg-white disabled:cursor-not-allowed p-2 pl-5 sm:max-w-sm lg:max-w-lg rounded-2xl resize-none outline-none"
                    rows={5}
                    {...field}
                    disabled={isSubmitted}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            disabled={isPending || isSubmitted}
            type="submit"
            className="p-2 mt-6 text-white w-full sm:w-60 bg-purple-400 disabled:cursor-progress "
          >
            send
          </button>

          {success && (
            <p className="text-left mt-6 text-green-600">
              Your help request was submitted successfully!
            </p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default HelpAndSupport;
