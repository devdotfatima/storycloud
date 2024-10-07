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
      <div className="w-full max-w-sm  px-7 bg-white rounded-2xl md:max-w-md min-h-[380px] flex flex-col gap-10  pt-[52px] items-center">
        <div>
          <Image
            src={"/unlock.svg"}
            alt="forgot password main icon"
            className="w-10 h-10 mx-auto"
            height={10}
            width={10}
          />

          <h2 className="mt-3    text-center text-purple">Forgot password?</h2>
        </div>

        {!emailSent ? (
          <div className="mb-10 ">
            <p className="mb-10   text-center">
              Enter your email and we’ll send you a link to get back into your
              account.
            </p>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  className="w-full  py-1.5 leading-tight text-grey border-2 appearance-none px-4 border-purple-400  focus:outline-none ring-purple focus:ring-2 focus:border-0  "
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
                  className="w-full px-4 py-2 text-center  outline-none border-0 ring-0   text-purple bg-purple-100 focus:outline-none"
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
          </div>
        ) : (
          <div className="w-full flex flex-col gap-8 items-center">
            <p className=" px-8 text-center ">
              A link has been sent to your email
            </p>
            <p className=" text-purple">{email}</p>

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
