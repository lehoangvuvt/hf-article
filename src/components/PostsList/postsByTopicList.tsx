"use client";

import MySkeleton, { SHAPE_ENUMS } from "../Skeleton";
import { PostItem } from "../PostItem";
import { useSearchParams } from "next/navigation";
import usePostsByTopic from "@/react-query/hooks/usePostsByTopic";
import { useEffect, useState } from "react";
import { Post } from "@/types/apiResponse";

const PostsByTopicList = () => {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setCurrentPage] = useState(0);
  const { data, isLoading } = usePostsByTopic(searchParams.get("topic"), page);

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
          <PostItem.Root
            key={post.id}
            mode="HORIZONTAL"
            context={{
              post,
              width: "100%",
            }}
          >
            <div className="w-[65%]">
              <PostItem.Username />
              <PostItem.Title />
              <PostItem.ShortContent />
              <PostItem.CreatedAt />
            </div>
            <div className="flex-1 flex items-center justify-end">
              <PostItem.Thumbnail />
            </div>
          </PostItem.Root>
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
              setCurrentPage(page + 1);
            }
          }}
        >
          More...
        </button>
      )}
    </div>
  );
};

export default PostsByTopicList;
