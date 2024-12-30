"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import UnlockIcon from "@/assets/icons/unlock.svg";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { updatePasswordSchema, UpdatePasswordT } from "@/lib/validations";
import { updatePassword } from "./actions";

const ForgotPassword = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const form = useForm<UpdatePasswordT>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: UpdatePasswordT) {
    setError(undefined);
    startTransition(async () => {
      console.log("data", data);
      const response = await updatePassword(data);

      if (response?.error) {
        setError(response.error);
        return;
      }
      if (data.password) {
      }
    });
  }
  return (
    <>
      <div className="w-full max-w-sm  px-7 bg-white rounded-2xl md:max-w-md min-h-[380px] flex flex-col gap-10  pt-[52px] pb-10 items-center">
        <div>
          <Image
            src={UnlockIcon}
            alt="forgot password main icon"
            className="w-10 h-10 mx-auto"
            height={10}
            width={10}
          />

          <h2 className="mt-3 text-center text-purple">reset password</h2>
        </div>

        <div className=" space-y-6   w-full">
          {error && <p className="text-center text-red">{error}</p>}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-10"
            >
              {/* Email Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>enter new password</FormLabel>

                    <FormControl>
                      <Input
                        className="w-full border-purple-400 border-2 focus:outline-none ring-purple focus:ring-2 focus:border-0  "
                        placeholder="*********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>re-enter new password</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full border-purple-400 border-2 focus:outline-none ring-purple focus:ring-2 focus:border-0  "
                        placeholder="*********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between mt-10">
                <button
                  disabled={isPending}
                  type="submit"
                  className="w-full px-4 py-2 text-center  outline-none border-0 ring-0 text-purple bg-purple-100 focus:outline-none disabled:cursor-progress enabled:cursor-default"
                >
                  save password
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
