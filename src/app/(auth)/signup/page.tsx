"use client";
import Link from "next/link";
import React, { useState } from "react";
import { EyeIcon, EyeOff } from "lucide-react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl md:max-w-md">
        <h2 className="mb-7 text-4xl font-medium font-crimson text-center ">
          storycloud
        </h2>
        <form className="">
          <div className="mb-6">
            <label className="block mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border-2 border-purple-400  focus:outline-none ring-purple focus:ring-2 focus:border-0  "
              id="email"
              type="email"
              placeholder="user@gmail.com"
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block" htmlFor="birthday">
                Birthday
              </label>
              <span className="text-base text-purple">
                must be 13+ to sign up
              </span>
            </div>

            <input
              className="w-full border-2 border-purple-400  focus:outline-none ring-purple focus:ring-2 focus:border-0  "
              id="birthday"
              type="date"
            />
          </div>

          <div className="relative mb-6">
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full border-2 border-purple-400  focus:outline-none ring-purple focus:ring-2 focus:border-0  "
                id="password"
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
          </div>

          <p className="mb-6 text-center text-base">
            By signing up, you agree to our{" "}
            <Link href={"/terms"} className="text-purple">
              terms & conditions and privacy policy
            </Link>
            .
          </p>

          <div className="flex items-center justify-between mb-4">
            <Link
              href={"/profile/edit"}
              className="w-full px-4 py-2 font-medium text-center   bg-purple text-purple bg-opacity-15 focus:outline-none"
              type="button"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      <div className="w-full max-w-sm p-6 mt-10 bg-white rounded-2xl shadow-md md:max-w-md">
        <p className="text-center  ">
          {"already have an account? "}
          <Link className="cursor-pointer text-purple" href={"/login"}>
            {"Log in"}
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;
