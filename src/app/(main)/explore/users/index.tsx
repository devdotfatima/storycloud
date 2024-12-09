import SearchBar from "@/shared/components/SearchBar";
import { Loader } from "lucide-react";

import React, { Suspense } from "react";
import SearchUsers from "./SearchUsers";

const Users = () => {
  return (
    <div className="flex flex-col gap-5 sm:gap-7 md:gap-10 xl:gap-16 md:px-16">
      <SearchBar placeholder="users" />
      <Suspense
        fallback={<Loader fill="#6A6FD5" className="animate-spin m-auto " />}
      >
        <SearchUsers />
      </Suspense>
    </div>
  );
};

export default Users;
