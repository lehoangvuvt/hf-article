"use client";

import { Post } from "@/types/apiResponse";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";

type Props = {
  context: Context;
  children: React.ReactNode;
  mode?: "VERTICAL" | "HORIZONTAL";
};

type Context = {
  post: Post | null;
  width?: string;
};

const PostItemContext = createContext<Context>({
  post: null,
  width: "20%",
});

function Username() {
  const context = useContext(PostItemContext);
  return (
    <div className="w-full font-medium text-[0.9rem] text-[rgba(0,0,0,0.7)] pr-[100px] max-[768px]:pr-[0px] mb-[10px] mt-[10px]">
      {context.post?.username}
    </div>
  );
}

function Title() {
  const context = useContext(PostItemContext);
  return (
    <div className="w-full font-extrabold text-[1.3rem] text-[#121212] pr-[100px] max-[768px]:pr-[0px]">
      {context.post?.title}
    </div>
  );
}

function ShortContent() {
  const context = useContext(PostItemContext);
  return (
    <div className="w-full font-semibold text-[0.9rem] pr-[100px] max-[768px]:pr-[0px] mt-[15px] text-[rgba(0,0,0,0.6)]">
      {context.post?.short_content.substring(0, 200)}...
    </div>
  );
}

function CreatedAt() {
  const context = useContext(PostItemContext);
  return (
    <div className="w-full font-semibold text-[0.85rem] mt-[25px] text-[rgba(0,0,0,0.55)]">
      {moment(context.post?.created_at).format("MMM DD, YYYY")}
    </div>
  );
}

function Thumbnail() {
  const context = useContext(PostItemContext);
  if (context.post?.thumbnail_url) {
    return (
      <div className="w-[100%] max-[768px]:w-[100%] aspect-video flex items-start justify-start relative">
        <Image
          src={context.post.thumbnail_url}
          alt="thumbnail"
          fill
          objectFit="contain"
          objectPosition="left"
        />
      </div>
    );
  }
  return null;
}

const Root: React.FC<Props> = ({ context, mode = "HORIZONTAL", children }) => {
  const router = useRouter();
  const post = context.post;

  if (mode === "HORIZONTAL") {
    return (
      <PostItemContext.Provider value={context}>
        <div
          onClick={() => router.push(`/@${post?.username}/${post?.slug}`)}
          style={{
            width: context.width,
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            userSelect: "none",
          }}
          className="flex flex-row max-[768px]:flex-col py-[15px] cursor-pointer"
        >
          {children}
        </div>
      </PostItemContext.Provider>
    );
  } else {
    return (
      <PostItemContext.Provider value={context}>
        <div
          onClick={() => router.push(`/@${post?.username}/${post?.slug}`)}
          style={{
            width: context.width,
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            userSelect: "none",
          }}
          className="flex flex-col py-[15px] cursor-pointer"
        >
          {children}
        </div>
      </PostItemContext.Provider>
    );
  }
};

export const PostItem = {
  Root: Root,
  Title: Title,
  Username: Username,
  ShortContent: ShortContent,
  Thumbnail: Thumbnail,
  CreatedAt: CreatedAt,
};
