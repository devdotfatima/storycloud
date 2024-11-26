"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import { EyeIcon, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import GoogleImage from "../../../assets/images/google.png";
import { loginSchema, LoginT } from "@/lib/validations";
import { login } from "./actions";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const form = useForm<LoginT>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginT) {
    setError(undefined);
    startTransition(async () => {
      const response = await login(values);

      if (response?.error) {
        setError(response.error);
      }
    });
  }

  return (
    <Form {...form}>
      {error && <p className="text-center text-red">{error}</p>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input
                  className="w-full border-2 px-5 border-purple-400  focus:outline-none ring-purple focus:ring-2 focus:border-0  "
                  placeholder="user@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>Password</FormLabel>
                <Link
                  href={"/forgot-password"}
                  className="text-base text-purple underline"
                >
                  Forgot Password
                </Link>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    className="w-full border-2 border-purple-400  focus:outline-none ring-purple focus:ring-2 focus:border-0 "
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="*****"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeIcon /> : <EyeOff />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between mb-4">
          <button
            disabled={isPending}
            type="submit"
            className="w-full px-4 py-2 font-medium text-center rounded-2xl bg-purple-400 text-purple bg-opacity-15 focus:outline-none disabled:cursor-not-allowed enabled:cursor-default"
          >
            Log In
          </button>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-purple" />
          <span className="mx-4  ">or</span>
          <hr className="flex-grow border-t border-purple" />
        </div>

        <div className="flex items-start justify-start">
          <button
            className="flex items-center   font-medium text-purple"
            type="button"
          >
            <Image
              src={GoogleImage}
              alt={"google sign in Logo"}
              width="64"
              className="w-10 h-10 mr-3"
              height="64"
            />
            login with Google
          </button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
