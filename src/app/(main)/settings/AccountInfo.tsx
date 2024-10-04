import { ArrowLeft } from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const AccountInfo = () => {
  return (
    <div className="absolute top-0 left-0 z-50 flex flex-col w-screen h-screen  gap-6 p-10 lowercase md:p-0 md:w-full md:h-full md:relative bg-purple-100">
      <a href="/settings" className="md:hidden">
        {" "}
        <ArrowLeft />
      </a>
      <div className="flex items-end gap-4 md:mb-5 text-purple">
        <Image
          src={"/user-purple.svg"}
          alt="info icon"
          width={30}
          height={30}
        />
        <p> account info</p>
      </div>
      <div className="flex flex-col gap-4  sm:mr-6 lg:mr-20">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name=""
            placeholder="user@gmail.com"
            id="email"
            className="p-1 px-3   sm:max-w-sm lg:max-w-lg w-full placeholder:text-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="dob">birthday</label>
          <input
            type="date"
            name=""
            placeholder="mm/dd/yyyy"
            id="dob"
            className="p-1 px-3  sm:max-w-sm lg:max-w-lg w-full placeholder:text-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="email"
            name=""
            id="password"
            placeholder="******"
            className="py-1   sm:max-w-sm lg:max-w-lg w-full placeholder:text-black"
          />
        </div>
        <Link href={"/"} className=" text-purple underline">
          Change password
        </Link>
      </div>
    </div>
  );
};

export default AccountInfo;
