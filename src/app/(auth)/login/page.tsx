"use client";
import React, { useState } from "react";
import { EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="w-full max-w-sm p-8 bg-white rounded-lg md:max-w-md shadow-md">
        <h2 className="mb-7 text-4xl font-medium font-crimson text-center ">
          storycloud
        </h2>
        <form className="">
          <div className="mb-6">
            <label className="block mb-2  " htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-1 leading-tight text-gray-700  "
              id="email"
              type="email"
              placeholder="user@gmail.com"
            />
          </div>

          <div className="relative mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block  " htmlFor="password">
                Password
              </label>
              <Link
                href={"/forgot-password"}
                className="text-base text-purple underline"
              >
                Forgot Password
              </Link>
            </div>
            <div className="relative">
              <input
                className="w-full px-3 py-1 leading-tight text-gray-700  "
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

          <div className="flex items-center justify-between mb-4">
            <Link
              href={"/"}
              className="w-full px-4 py-2 font-medium text-center rounded-2xl bg-purple-400 text-purple bg-opacity-15 focus:outline-none focus:ring"
              type="button"
            >
              Log In
            </Link>
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
                src={`/google.png`}
                alt={"google sign in Logo"}
                width="64"
                className="w-10 h-10 mr-3"
                height="64"
              />
              login with Google
            </button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-sm p-6 mt-10 bg-white rounded-lg shadow-md md:max-w-md">
        <p className="text-center  ">
          {"don't have an account? "}
          <Link className="cursor-pointer text-purple " href={"/signup"}>
            {"Sign up"}
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
