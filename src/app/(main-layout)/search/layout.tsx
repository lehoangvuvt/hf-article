"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <div className="w-[100%] flex flex-col">
      <div className="w-full py-[40px] font-semibold text-[2.5rem] text-[rgba(0,0,0,0.45)]">
        Results for{" "}
        <span className="text-[#121212]">{`“${searchParams.get("q")}”`}</span>
      </div>
      <div className="w-full h-[35px] border-b-[1px] border-b-solid border-b-[rgba(0,0,0,0,0.6)] flex flex-row flex-wrap gap-[15px] mb-[20px]">
        <div
          onClick={() =>
            router.push(`/search/posts?q=${searchParams.get("q")}`)
          }
          style={{
            color:
              pathname === "/search/posts" ? "#121212" : "rgba(0,0,0,0.55)",
            borderBottom:
              pathname === "/search/posts"
                ? "1px solid #121212"
                : "1px solid transparent",
          }}
          className="h-full px-[10px] text-[0.95rem] font-semibold  cursor-pointer transition-colors hover:text-[#121212]"
        >
          Posts
        </div>
        <div
          onClick={() =>
            router.push(`/search/topics?q=${searchParams.get("q")}`)
          }
          style={{
            color:
              pathname === "/search/topics" ? "#121212" : "rgba(0,0,0,0.55)",
            borderBottom:
              pathname === "/search/topics"
                ? "1px solid #121212"
                : "1px solid transparent",
          }}
          className="h-full px-[10px] text-[0.95rem] font-semibold  cursor-pointer transition-colors hover:text-[#121212]"
        >
          Topics
        </div>
      </div>
      {children}
    </div>
  );
}
