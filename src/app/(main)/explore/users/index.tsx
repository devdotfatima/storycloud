"use client";
import React, { useState } from "react";
import debounce from "lodash.debounce";
import SearchBar from "@/shared/components/SearchBar";
import { useSessionContext } from "@/app/providers/SessionProvider";
import SearchUsers from "./SearchUsers";
import { useFetchUsers } from "./mutations";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSessionContext();
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
    refetch,
  } = useFetchUsers(user, searchTerm);

  const debouncedSearch = debounce((query: string) => {
    setSearchTerm(query);
    refetch(); // Refetch data when the search term changes
  }, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-7 md:gap-10 xl:gap-16 md:px-16">
      <SearchBar placeholder="users" onSearch={handleSearch} />

      <SearchUsers
        status={status}
        error={error}
        data={data}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Users;
