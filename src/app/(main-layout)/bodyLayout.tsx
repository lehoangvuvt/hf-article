"use client";

import { routes } from "@/config/routes";
import useCustomRouter from "@/hooks/useCustomRouter";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function BodyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={twMerge(
        "w-[75%] max-[768px]:w-[95%] h-auto",
        "mt-[10px]",
        "flex flex-col flex-wrap items-center mb-[100px]"
      )}
    >
      {children}
    </div>
  );
}
