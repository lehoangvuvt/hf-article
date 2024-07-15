"use client";

import { PostItem } from "@/components/PostItem";
import { GetPostsSuccessResponse } from "@/types/apiResponse";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TopicDetailsView = ({ data }: { data: GetPostsSuccessResponse }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const changePage = (page: number) => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("page", page.toString());
    router.push(`${pathName}?${urlSearchParams}`);
  };

  return (
    <div className="w-full flex flex-col gap-[50px]">
      <div className="w-full flex flex-row flex-wrap justify-between">
        {data?.posts &&
          data.posts.length > 0 &&
          data.posts.map((post) => (
            <div key={post.id} className="w-[48%] max-[768px]:w-[100%]">
              <PostItem.Root
                mode="VERTICAL"
                context={{
                  post,
                  width: "100%",
                }}
              >
                <PostItem.Thumbnail />
              </PostItem.Root>
            </div>
          ))}
      </div>
      <div className="w-full flex justify-center gap-[10px]">
        {Array(data.total_pages)
          .fill("")
          .map((_, i) => (
            <div
              onClick={() => changePage(i + 1)}
              style={{
                background:
                  parseInt(searchParams.get("page") as string) === i + 1
                    ? "#1DA1F2"
                    : "transparent",
                color:
                  parseInt(searchParams.get("page") as string) === i + 1
                    ? "white"
                    : "#121212",
              }}
              className="w-[40px] aspect-square text-[1rem] flex items-center justify-center 
                        cursor-pointer hover:underline"
              key={i}
            >
              {i + 1}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopicDetailsView;
