"use client";

import PostItem from "@/components/PostItem";
import MySkeleton, { SHAPE_ENUMS } from "@/components/Skeleton";
import usePosts from "@/react-query/hooks/usePosts";
import { Post } from "@/types/apiResponse";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPostsPage = () => {
  const searchParams = useSearchParams();
  const [end, setEnd] = useState(-1);
  const [start, setStart] = useState(-1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const { data: getPostsData, isLoading: isLoadingPosts } = usePosts(
    null,
    query ?? "*",
    true,
    start,
    end
  );

  useEffect(() => {
    if (
      !isLoadingPosts &&
      getPostsData?.posts &&
      getPostsData.posts.length > 0
    ) {
      const posts = getPostsData.posts;
      setPosts((prev) => [...prev, ...posts]);
    }
  }, [getPostsData, isLoadingPosts]);

  useEffect(() => {
    setPosts([]);
    setStart(-1);
    setEnd(-1);
    if (searchParams.has("q")) {
      setQuery(searchParams.get("q") as string);
    } else {
      setQuery("*");
    }
  }, [searchParams]);

  return (
    <div>
      <div className="w-[75%] max-[768px]:w-full flex flex-col gap-[10px]">
        {posts &&
          posts.length > 0 &&
          posts.map((post) => (
            <PostItem width="100%" key={post.id} post={post} />
          ))}

        {isLoadingPosts &&
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

        {getPostsData && getPostsData?.has_next && (
          <button
            disabled={!getPostsData?.has_next}
            onClick={() => {
              if (getPostsData?.posts && getPostsData.posts.length > 0) {
                setStart(-1);
                setEnd(getPostsData.posts[getPostsData.posts.length - 1].id);
              }
            }}
          >
            More...
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchPostsPage;
