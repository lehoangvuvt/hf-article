"use client";

import { Post } from "@/types/apiResponse";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  post: Post;
  width?: string;
  mode?: "VERTICAL" | "HORIZONTAL";
};

const PostItem: React.FC<Props> = ({
  post,
  width = "20%",
  mode = "HORIZONTAL",
}) => {
  const router = useRouter();

  if (mode === "HORIZONTAL") {
    return (
      <div
        onClick={() => router.push(`/@${post.username}/${post.slug}`)}
        style={{
          width,
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          userSelect: "none",
        }}
        className="flex flex-row py-[15px] cursor-pointer"
      >
        <div className="w-[75%] flex flex-col">
          <div className="w-full font-medium text-[0.9rem] text-[rgba(0,0,0,0.7)] pr-[100px] mb-[20px]">
            {post.username}
          </div>
          <div className="w-full font-extrabold text-[1.3rem] text-[#121212] pr-[100px]">
            {post.title}
          </div>
          <div className="w-full font-semibold text-[0.9rem] pr-[100px] mt-[15px] text-[rgba(0,0,0,0.6)]">
            {post.short_content.substring(0, 200)}...
          </div>
          <div className="w-full font-semibold text-[0.85rem] mt-[25px] text-[rgba(0,0,0,0.55)]">
            {moment(post.created_at).format("MMM DD, YYYY")}
          </div>
        </div>
        <div
          className="flex-1 flex items-center justify-end"
          dangerouslySetInnerHTML={{ __html: post.thumbnail_url }}
        />
      </div>
    );
  } else {
    return (
      <div
        onClick={() => router.push(`/@${post.username}/${post.slug}`)}
        style={{
          width,
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          userSelect: "none",
        }}
        className="flex flex-col py-[15px] cursor-pointer"
      >
        {post.thumbnail_url && (
          <div className="w-[100%] aspect-video flex items-start justify-center relative">
            <Image
              src={post.thumbnail_url
                .split("src=")[1]
                .split("alt=")[0]
                .replaceAll(`"`, "")}
              alt="thumbnail"
              fill
              objectFit="contain"
              objectPosition="left"
            />
          </div>
        )}
        <div className="w-full font-medium text-[0.9rem] text-[rgba(0,0,0,0.7)] mb-[15px] mt-[20px]">
          {post.username}
        </div>
        <div className="w-[100%] flex flex-col">
          <div className="w-full font-extrabold text-[1.3rem] text-[#121212]">
            {post.title}
          </div>
          <div className="w-full font-semibold text-[0.9rem] mt-[15px] text-[rgba(0,0,0,0.6)]">
            {post.short_content.substring(0, 200)}...
          </div>
          <div className="w-full font-semibold text-[0.85rem] mt-[25px] text-[rgba(0,0,0,0.55)]">
            {moment(post.created_at).format("MMM DD, YYYY")}
          </div>
        </div>
      </div>
    );
  }
};

export default PostItem;
