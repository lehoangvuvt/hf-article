import { twMerge } from "tailwind-merge";
import BodyLayout from "./bodyLayout";
import logo from "/public/images/logo.png";
import Image from "next/image";
import SearchInput from "@/components/SearchInput";
import { Suspense } from "react";
import AuthConditionalRenderWrapper from "@/middlewares/authConditionalRenderWrapper";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={twMerge(
        "absolute",
        "w-[100%]",
        "flex flex-col",
        "items-center"
      )}
    >
      <div className="w-[100%] top-0 z-[200] flex flex-row items-center justify-start bg-[white] gap-[20px] px-[5%] py-[15px] shadow-sm">
        <Link
          href="/?topic=all"
          className="w-[25%] aspect-[5.5/1] relative cursor-pointer"
        >
          <Image
            src={logo.src}
            fill
            objectFit="contain"
            objectPosition="center"
            alt="logo"
          />
        </Link>
        <Suspense>
          <div className="w-[25%]">
            <SearchInput />
          </div>
        </Suspense>
        <div className="flex-1 flex items-center justify-end">
          <AuthConditionalRenderWrapper renderIf="AUTH">
            <Link
              href="/new-post"
              className="flex items-center text-[rgba(0,0,0,0.6)] gap-[8px] text-[0.85rem] font-medium
              hover:text-[#121212] transition-colors
              "
            >
              <DriveFileRenameOutlineOutlinedIcon color="inherit" />
              Write
            </Link>
          </AuthConditionalRenderWrapper>
          <AuthConditionalRenderWrapper renderIf="NOT_AUTH">
            <Link
              href="/login"
              className="flex items-center text-[white] gap-[8px] text-[0.85rem] font-medium
              hover:brightness-75 transition-all bg-[#121212] px-[30px] py-[8px] rounded-3xl
              "
            >
              Log In
            </Link>
          </AuthConditionalRenderWrapper>
        </div>
      </div>
      <BodyLayout>
        <Suspense>{children}</Suspense>
      </BodyLayout>
      <ToastContainer />
    </div>
  );
}
