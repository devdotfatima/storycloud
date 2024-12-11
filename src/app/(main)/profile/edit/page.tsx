"use client";
import Image from "next/image";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { editProfileSchema, EditProfileT } from "@/lib/validations";
import EditWhiteIcon from "@/assets/icons/edit-white.svg";
import UserPurpleIcon from "@/assets/icons/user-purple.svg";
import { updateProfile } from "./actions";
import { useSessionContext } from "@/app/providers/SessionProvider";

const EditProfile = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const user = useSessionContext();

  const form = useForm<EditProfileT>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      user_name: "",
      user_bio: "",
      user_image: undefined,
    },
  });
  const onSubmit = async (data: EditProfileT) => {
    setError(undefined);

    startTransition(async () => {
      const response = await updateProfile(data);
      if (response?.error) {
        setError(response.error);
      }
    });
  };

  const [selectedProfileImage, setSelectedProfileImage] = useState<
    null | string
  >(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedProfileImage(URL.createObjectURL(files[0]));

      form.setValue("user_image", files[0]);
    }
  };

  useEffect(() => {
    form.reset({
      user_name: user.user_name,
      // user_image: user.user_profile_image,
      user_bio: user.user_bio,
    });
    setSelectedProfileImage(user.user_profile_image);
  }, [user, form]);
  return (
    <>
      <div className="w-full mx-6 max-w-sm sm:max-w-lg p-6 sm:p-8 bg-white rounded-lg md:max-w-screen-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && <p className="text-center text-red">{error}</p>}

            <FormField
              control={form.control}
              name="user_image"
              render={({}) => (
                <FormItem className="flex justify-center items-center">
                  <FormControl className="">
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
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                      <Image
                        width={80}
                        height={80}
                        src={
                          selectedProfileImage
                            ? selectedProfileImage
                            : UserPurpleIcon
                        }
                        alt="Profile"
                        className={`${
                          selectedProfileImage
                            ? "w-full h-full object-cover rounded-full"
                            : "w-14 h-14 object-contain"
                        }   bg-purple-100`}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`${
                      form.formState.errors.user_name ? "" : "text-purple"
                    }`}
                  >
                    {" "}
                    full name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="w-full px-3 py-1.5 leading-tight border border-purple-400 focus:outline-none ring-purple focus:ring-2 focus:border-0"
                        {...field}
                        placeholder="full name"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="user_bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple"> bio</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <textarea
                        className="w-full px-3 py-2 leading-tight  border appearance-none   border-purple-400  focus:outline-none h-28 resize-none rounded-xl sm:rounded-2xl ring-purple focus:ring-2 focus:border-0"
                        {...field}
                        placeholder="enter your bio"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between mb-4">
              <button
                disabled={isPending}
                className={`w-full px-4 py-2 font-medium text-center focus:outline-none disabled:opacity-50  disabled:cursor-not-allowed disabled:bg-grey-100 enabled:bg-purple-100 enabled:text-purple"
                }`}
                type="submit"
              >
                done
              </button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditProfile;
