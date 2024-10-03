"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const EditProfile = () => {
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [selectedProfileImage, setSelectedProfileImage] = useState<
    null | string
  >(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedProfileImage(URL.createObjectURL(files[0]));
    }
  };
  const isDisabled = !fullName || !username;
  return (
    <>
      <div className="w-full mx-6 max-w-sm sm:max-w-xl p-6 sm:p-8 bg-white rounded-lg md:max-w-2xl">
        <form className="">
          <div className="relative w-24 h-24 mx-auto ">
            <label
              htmlFor="dropzone-file"
              className=" absolute -top-1 p-1.5 rounded-full -right-1 bg-purple-100 cursor-pointer"
            >
              <Image
                src={"/edit-purple.svg"}
                width={12}
                height={12}
                alt="edit image file icon"
                className="w-4 h-4 "
              />

              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>

            <Image
              width={80}
              height={80}
              src={
                selectedProfileImage
                  ? selectedProfileImage
                  : "/profile_image.png"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-purple" htmlFor="full name">
              full name
            </label>
            <input
              className="w-full px-3 py-1 leading-tight   "
              id="full name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-purple" htmlFor="username">
              username
            </label>

            <div className="relative">
              <input
                className="w-full px-3 py-1 leading-tight   "
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {false ? (
                  <Image
                    width={24}
                    height={24}
                    src={"/validation-pass.svg"}
                    alt="validation pass"
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <Image
                    width={24}
                    height={24}
                    src={"/validation-fail.svg"}
                    alt="validation fail"
                    className="w-6 h-6 rounded-full"
                  />
                )}
              </button>
            </div>
          </div>

          <div className="relative mb-6">
            <label className="block mb-2 text-purple" htmlFor="bio">
              bio
            </label>
            <div className="relative">
              <textarea
                className="w-full px-3 py-1 leading-tight  border appearance-none border-purple-400  focus:outline-none h-28 resize-none rounded-xl sm:rounded-2xl ring-purple focus:ring-2 focus:border-0"
                id="bio"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <Link
              href={"/"}
              className={`w-full px-4 py-2 font-medium text-center  focus:outline-none focus:ring ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed bg-grey-100 text-grey"
                  : "bg-purple-100 text-purple"
              }`}
              type="button"
              onClick={(e) => isDisabled && e.preventDefault()}
            >
              done
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
