"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import EditWhiteIcon from "../../../assets/icons/edit-white.svg";
import UserPurpleIcon from "../../../assets/icons/user-purple.svg";

const EditProfile = () => {
  const [fullName, setFullName] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const [selectedProfileImage, setSelectedProfileImage] = useState<
    null | string
  >(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedProfileImage(URL.createObjectURL(files[0]));
    }
  };

  return (
    <>
      <div className="w-full mx-6 max-w-sm sm:max-w-lg p-6 sm:p-8 bg-white rounded-lg md:max-w-screen-sm">
        <form className="">
          <div className="relative w-full flex items-center justify-center mb-5 ">
            <div className="bg-purple-100 rounded-full w-32 h-32 flex items-center justify-center relative">
              <label
                htmlFor="dropzone-file"
                className=" absolute top-1 p-1.5 rounded-full right-2 bg-purple-400 cursor-pointer"
              >
                <Image
                  src={EditWhiteIcon}
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
                  selectedProfileImage ? selectedProfileImage : UserPurpleIcon
                }
                alt="Profile"
                className="w-14 h-14  object-contain bg-purple-100"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-purple" htmlFor="full name">
              full name
            </label>
            <input
              className="w-full px-3 py-1.5 leading-tight   border border-purple-400  focus:outline-none ring-purple focus:ring-2 focus:border-0   "
              id="full name"
              placeholder="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="relative mb-6">
            <label className="block mb-2 text-purple" htmlFor="bio">
              bio
            </label>
            <div className="relative">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Enter your bio"
                className="w-full px-3 py-1 leading-tight  border appearance-none   border-purple-400  focus:outline-none h-28 resize-none rounded-xl sm:rounded-2xl ring-purple focus:ring-2 focus:border-0"
                id="bio"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <Link
              href={"/"}
              className={`w-full px-4 py-2 font-medium text-center  focus:outline-none ${
                true
                  ? "opacity-50 cursor-not-allowed bg-grey-100  "
                  : "bg-purple-100 text-purple"
              }`}
              type="button"
              onClick={(e) => true && e.preventDefault()}
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
