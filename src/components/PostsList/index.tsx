"use client";

import MySkeleton, { SHAPE_ENUMS } from "../Skeleton";
import PostItem from "../PostItem";
import usePosts from "@/react-query/hooks/usePosts";
import { useSearchParams } from "next/navigation";
import usePostsByTopic from "@/react-query/hooks/usePostsByTopic";

const PostsList = ({
  q = "*",
  searchMode = false,
}: {
  q?: string;
  searchMode?: boolean;
}) => {
  const searchParams = useSearchParams();
  const { posts, isLoading } = usePosts(
    searchParams.get("topic"),
    q,
    searchMode
  );

  const { posts: postsByTopic, isLoading: isLoadingPostsByTopic } =
    usePostsByTopic(searchParams.get("topic"));

  return (
    <div className="w-full flex flex-col flex-wrap gap-[15px]">
      {isLoading ||
        (isLoadingPostsByTopic &&
          Array(10)
            .fill("")
            .map((_, i) => (
              <MySkeleton
                shape={SHAPE_ENUMS.CUSTOM}
                customRatio={6 / 1}
                key={i}
                width="100%"
              />
            )))}
      {typeof searchParams.get("topic") === "string" &&
        searchParams.get("topic") === "all" &&
        !isLoading &&
        posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <PostItem width="100%" key={post.id} post={post} />
        ))}

      {searchMode &&
        !isLoading &&
        posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <PostItem width="100%" key={post.id} post={post} />
        ))}

      {typeof searchParams.get("topic") === "string" &&
        searchParams.get("topic") !== "all" &&
        !isLoadingPostsByTopic &&
        postsByTopic &&
        postsByTopic.length > 0 &&
        postsByTopic.map((post) => (
          <PostItem width="100%" key={post.id} post={post} />
        ))}
    </div>
  );
};

export default PostsList;
