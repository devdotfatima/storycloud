"use client";
import Link from "next/link";
import React from "react";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <>
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl md:max-w-md">
        <h2 className="mb-7 text-4xl font-medium font-crimson text-center ">
          storycloud
        </h2>
        <SignUpForm />
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
