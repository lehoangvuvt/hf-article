"use client";

import { twMerge } from "tailwind-merge";
import BodyLayout from "./bodyLayout";
import logo from "/public/images/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <Suspense>
      <div
        className={twMerge(
          "absolute",
          "w-[100%]",
          "flex flex-col",
          "items-center"
        )}
      >
        <div className="w-[100%] top-0 z-[200] flex flex-row items-center justify-start bg-[white] gap-[20px] px-[12%] py-[5px] shadow-sm">
          <div
            onClick={() => router.push("/?topic=all")}
            className="w-[18%] aspect-[3/1] relative cursor-pointer"
          >
            <Image
              src={logo.src}
              fill
              objectFit="contain"
              objectPosition="center"
              alt="logo"
            />
          </div>
          <div className="w-[25%]">
            <SearchInput />
          </div>
        </div>
        <BodyLayout>{children}</BodyLayout>
      </div>
    </Suspense>
  );
}
