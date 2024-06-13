"use client";

import { twMerge } from "tailwind-merge";
import BodyLayout from "./bodyLayout";
import logo from "/public/images/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import { Suspense } from "react";
import AuthConditionalRenderWrapper from "@/middlewares/authConditionalRenderWrapper";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";

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
        <div className="w-[100%] top-0 z-[200] flex flex-row items-center justify-start bg-[white] gap-[20px] px-[5%] py-[15px] shadow-sm">
          <div
            onClick={() => router.push("/?topic=all")}
            className="w-[18%] aspect-[5.5/1] relative cursor-pointer"
          >
            <Image
              src={logo.src}
              fill
              objectFit="contain"
              objectPosition="right"
              alt="logo"
            />
          </div>
          <div className="w-[25%]">
            <SearchInput />
          </div>
          <div className="flex-1 flex items-center justify-end">
            <AuthConditionalRenderWrapper required>
              <button
                onClick={() => router.push("/new-post")}
                className="flex items-center text-[rgba(0,0,0,0.6)] gap-[8px] text-[0.85rem] font-medium
              hover:text-[#121212] transition-colors
              "
              >
                <DriveFileRenameOutlineOutlinedIcon color="inherit" />
                Write
              </button>
            </AuthConditionalRenderWrapper>
            <AuthConditionalRenderWrapper required={false}>
              <button
                onClick={() => router.push("/login")}
                className="flex items-center text-[white] gap-[8px] text-[0.85rem] font-medium
              hover:brightness-75 transition-all bg-[#121212] px-[30px] py-[8px] rounded-3xl
              "
              >
                Log In
              </button>
            </AuthConditionalRenderWrapper>
          </div>
        </div>
        <BodyLayout>{children}</BodyLayout>
      </div>
    </Suspense>
  );
}
