import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReturnPurpleIcon from "../../../assets/icons/return-purple.svg";
import UserPurpleIcon from "../../../assets/icons/user-purple.svg";

const AccountInfo = () => {
  return (
    <div className="absolute top-0 left-0 z-50 flex flex-col w-screen h-screen  gap-6 p-10 lowercase md:p-0 md:w-full md:h-full md:relative bg-purple-100">
      <div className="flex items-center justify-center md:justify-start relative gap-4 md:mb-4 text-purple">
        <a
          href="/settings"
          className=" absolute top-1/2 transform -translate-y-1/2 left-0 md:hidden"
        >
          <Image
            src={ReturnPurpleIcon}
            alt="info icon"
            width={7}
            height={7}
            className="w-4 h-4 text-purple"
          />
        </a>
        <div className="flex items-end mx-auto md:mx-0 w-fit gap-2">
          {" "}
          <Image
            src={UserPurpleIcon}
            alt="info icon"
            width={20}
            height={20}
            className="w-7 h-7 text-purple"
          />
          <p> account info</p>
        </div>
      </div>
      <div className="flex flex-col gap-4  sm:mr-6 lg:mr-20">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name=""
            placeholder="user@gmail.com"
            id="email"
            readOnly
            className="p-1 px-3   sm:max-w-sm lg:max-w-lg w-full  "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="dob">birthday</label>
          <input
            type="date"
            name=""
            value="2013-10-02"
            readOnly
            placeholder="mm/dd/yyyy"
            id="dob"
            className="p-1 px-3  sm:max-w-sm lg:max-w-lg w-full text-grey"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="email"
            name=""
            id="password"
            readOnly
            placeholder="******"
            className="py-1   sm:max-w-sm lg:max-w-lg w-full  "
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
