"use client";
import React, { useState, useTransition } from "react";
import { EyeIcon, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
// import Image from "next/image";
import { signUpSchema, SignUpT } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
// import ValidationFailIcon from "../../../assets/icons/validation-fail.svg";
// import ValidationPassIcon from "../../../assets/icons/validation-pass.svg";
import { signUp } from "./actions";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const form = useForm<SignUpT>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      birthday: undefined,
      username: "",
    },
  });
  const onSubmit = async (data: SignUpT) => {
    setError(undefined);
    startTransition(async () => {
      const response = await signUp(data);

      if (response?.error) {
        setError(response.error); // Set the error state
      }
    });
  };

  return (
    <Form {...form}>
      {error && <p className="text-center text-red">{error}</p>}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="w-full border-2 px-5 border-purple-400 focus:outline-none ring-purple focus:ring-2 focus:border-0"
                  placeholder="user@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>username</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="w-full border-2 px-5 border-purple-400 focus:outline-none ring-purple focus:ring-2 focus:border-0"
                    {...field}
                    placeholder="username"
                  />
                  {/* <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {false ? (
                      <Image
                        width={24}
                        height={24}
                        src={ValidationPassIcon}
                        alt="validation pass"
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <Image
                        width={24}
                        height={24}
                        src={ValidationFailIcon}
                        alt="validation fail"
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                  </span> */}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* birthday */}
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex items-center justify-between mb-2">
                  <label className="block" htmlFor="birthday">
                    Birthday
                  </label>
                  <span className={`text-base  text-purple`}>
                    must be 13+ to sign up
                  </span>
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  className={`w-full border-2 border-purple-400 focus:outline-none ring-purple focus:ring-2 focus:border-0 text-grey ${
                    field.value ? "text-black" : ""
                  }`}
                  id="birthday"
                  type="date"
                  placeholder="MM/DD/YYYY" // Placeholder won't show for type="date"
                  value={
                    field.value && !isNaN(new Date(field.value).getTime())
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue && /^\d{4}-\d{2}-\d{2}$/.test(inputValue)) {
                      field.onChange(new Date(inputValue)); // Update field value if valid
                    } else {
                      field.onChange("");
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1">
                Password
                <FormMessage />
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="w-full border-2 border-purple-400 focus:outline-none ring-purple focus:ring-2 focus:border-0"
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="*****"
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
            </FormItem>
          )}
        />

        {/* Terms and Conditions */}
        <p className="text-center text-base">
          By signing up, you agree to our{" "}
          <Link href={"/terms"} className="text-purple">
            terms & conditions and privacy policy
          </Link>
          .
        </p>

        {/* Submit Button */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="submit"
            disabled={isPending}
            className="w-full px-4 py-2 font-medium text-center bg-purple text-purple bg-opacity-15 focus:outline-none disabled:cursor-not-allowed enabled:cursor-default"
          >
            Sign Up
          </button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
