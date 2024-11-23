"use client";
import React, { useState } from "react";
import { EyeIcon, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
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

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignUpT>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      birthday: undefined, // Ensure `undefined` to prevent errors
    },
  });

  const onSubmit = (data: SignUpT) => {
    console.log({ data });

    // Store user data in localStorage
    localStorage.setItem("userSignUpData", JSON.stringify(data));

    // Redirect to the edit profile page
    window.location.href = "/profile/edit";
  };

  return (
    <Form {...form}>
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
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : "" // Format the Date object to YYYY-MM-DD
                  }
                  onChange={(e) => {
                    // Parse the string back to a Date object
                    field.onChange(new Date(e.target.value));
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
            className="w-full px-4 py-2 font-medium text-center bg-purple text-purple bg-opacity-15 focus:outline-none"
          >
            Sign Up
          </button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
