import React from "react";
import Link from "next/link";

import LoginForm from "./LoginForm";

const Login = () => {
  console.log("hsjc");

  return (
    <>
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl md:max-w-md shadow-md">
        <h2 className="mb-7 text-4xl font-medium font-crimson text-center ">
          storycloud
        </h2>
        <LoginForm />
      </div>
      <div className="w-full max-w-sm p-6 mt-10 bg-white rounded-2xl shadow-md md:max-w-md">
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
