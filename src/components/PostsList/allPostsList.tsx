"use client";

import MySkeleton, { SHAPE_ENUMS } from "../Skeleton";
import PostItem from "../PostItem";
import usePosts from "@/react-query/hooks/usePosts";
import { useEffect, useState } from "react";
import { Post } from "@/types/apiResponse";

export const AllPostsList = () => {
  const [end, setEnd] = useState(-1);
  const [start, setStart] = useState(-1);
  const [posts, setPosts] = useState<Post[]>([]);
  const { data, isLoading } = usePosts("all", "*", false, start, end);

  useEffect(() => {
    if (!isLoading && data?.posts && data.posts.length > 0) {
      const posts = data.posts;
      setPosts((prev) => [...prev, ...posts]);
    }
  }, [data, isLoading]);

  return (
    <div className="w-full flex flex-col flex-wrap gap-[15px]">
      {posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <PostItem width="100%" key={post.id} post={post} />
        ))}

      {isLoading &&
        Array(5)
          .fill("")
          .map((_, i) => (
            <MySkeleton
              shape={SHAPE_ENUMS.CUSTOM}
              customRatio={6 / 1}
              key={i}
              width="100%"
            />
          ))}
      {data?.has_next && (
        <button
          disabled={!data?.has_next}
          onClick={() => {
            if (data?.posts && data.posts.length > 0) {
              setStart(-1);
              setEnd(data.posts[data.posts.length - 1].id);
            }
          }}
        >
          More...
        </button>
      )}
    </div>
  );
};
