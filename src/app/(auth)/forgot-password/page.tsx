"use client";

import React, { useState } from "react";

import Link from "next/link";
import Image from "next/image";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setEmailSent(true);
    }
  };
  return (
    <>
      <div className="w-full max-w-sm p-8 bg-white rounded-lg md:max-w-md">
        <Image
          src={"/unlock.svg"}
          alt="forgot password main icon"
          className="w-10 h-10 mx-auto"
          height={10}
          width={10}
        />

        <h2 className="mt-3 mb-6   text-center text-purple">
          Forgot password?
        </h2>

        {!emailSent ? (
          <>
            <p className="mb-10   text-center">
              Enter your email and we’ll send you a link to get back into your
              account.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  className="w-full px-3 py-1 leading-tight  border appearance-none border-purple-400  focus:outline-none ring-purple focus:ring-2 focus:border-0"
                  id="email"
                  type="email"
                  placeholder="user@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-center    text-purple bg-purple-100 focus:outline-none focus:ring"
                >
                  send link
                </button>
              </div>

              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-purple" />
                <span className="mx-4 text-black">or</span>
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
          </>
        ) : (
          <div className="text-center w-full ">
            <p className="mb-6 px-8 text-center">
              A link has been sent to your email
            </p>
            <p className="mb-6 text-purple">{email}</p>

            <Link
              href="/login"
              className="block w-full px-4 py-2 text-center  text-purple bg-purple-100 focus:outline-none focus:ring"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
      {!emailSent ? (
        <div className="w-full max-w-sm p-6 mt-10 bg-white rounded-lg shadow-md md:max-w-md">
          <p className="text-center text-black">
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
