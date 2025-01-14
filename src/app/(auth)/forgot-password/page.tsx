"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
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
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { forgotPasswordSchema, ForgotPasswordT } from "@/lib/validations";
import { forgotPassword } from "./actions";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const form = useForm<ForgotPasswordT>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordT) {
    setError(undefined);
    startTransition(async () => {
      const response = await forgotPassword(data);

      if (response?.error) {
        setError(response.error);
        return;
      }
      console.log(response);

      if (data.email) {
        setEmailSent(true);
      }
    });
  }
  return (
    <>
      <div className="w-full max-w-sm  px-7 bg-white rounded-2xl md:max-w-md min-h-[380px] flex flex-col gap-10  pt-[52px] items-center">
        <div>
          <Image
            src={UnlockIcon}
            alt="forgot password main icon"
            className="w-10 h-10 mx-auto"
            height={10}
            width={10}
          />

          <h2 className="mt-3 text-center text-purple">Forgot password?</h2>
        </div>

        {!emailSent ? (
          <div className="mb-10 space-y-6 ">
            <p className="mb-10 text-center">
              Enter your email and we’ll send you a link to get back into your
              account.
            </p>
            {error && <p className="text-center text-red">{error}</p>}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-full border-purple-400 border-2 focus:outline-none ring-purple focus:ring-2 focus:border-0  "
                          placeholder="user@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between mb-6">
                  <button
                    disabled={isPending}
                    type="submit"
                    className="w-full px-4 py-2 text-center  outline-none border-0 ring-0 text-purple bg-purple-100 focus:outline-none disabled:cursor-progress enabled:cursor-default"
                  >
                    send link
                  </button>
                </div>

                <div className="flex items-center my-4">
                  <hr className="flex-grow border-t border-purple" />
                  <span className="mx-4  ">or</span>
                  <hr className="flex-grow border-t border-purple" />
                </div>
                <div className="flex items-center justify-center ">
                  <p>
                    back to{" "}
                    <Link
                      className="text-purple  custom-link-class"
                      href="/login"
                    >
                      login
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-8 items-center">
            <p className=" px-8 text-center ">
              A link has been sent to your email
            </p>
            <p className=" text-purple">{form.getValues().email}</p>

            <Link
              href="/login"
              className="block w-full px-4 py-2 text-center  text-purple bg-purple-100 focus:outline-none"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
      {!emailSent ? (
        <div className="w-full max-w-sm p-6 mt-10 bg-white rounded-2xl shadow-md md:max-w-md">
          <p className="text-center  ">
            {"Don't have an account? "}
            <Link href={"/login"} className="cursor-pointer text-purple ">
              Sign up
            </Link>
          </p>
        </div>
      ) : null}
    </>
  );
};

export default ForgotPassword;
