"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTxt, setSearchTxt] = useState(
    searchParams.has("q") ? (searchParams.get("q") as string) : ""
  );
  const pathName = usePathname();

  useEffect(() => {
    if (pathName.split("/")[1].split("/")[0] !== "search") {
      setSearchTxt("");
    }
  }, [pathName]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTxt.trim().length === 0) {
      router.push("/?topic=all");
    } else {
      router.push(`/search/posts?q=${searchTxt}`);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="w-full flex items-center bg-[rgba(0,0,0,0.03)] px-[16px] py-[8px] rounded-3xl"
    >
      <input
        onChange={(e) => setSearchTxt(e.target.value)}
        value={searchTxt}
        className="w-full border-none outline-none bg-transparent text-[0.85rem]"
        placeholder="Search"
      />
    </form>
  );
};

export default SearchInput;
