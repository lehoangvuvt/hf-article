"use client";

import MySkeleton, { SHAPE_ENUMS } from "../Skeleton";
import PostItem from "../PostItem";
import { Post } from "@/types/apiResponse";

const PostsListNoFetch = ({
  posts,
  isLoading,
  style,
}: {
  posts: Post[] | null;
  isLoading: boolean;
  style?: React.CSSProperties;
}) => {
  return (
    <div style={style} className="w-full flex flex-col flex-wrap gap-[15px]">
      {isLoading &&
        Array(10)
          .fill("")
          .map((_, i) => (
            <MySkeleton
              shape={SHAPE_ENUMS.CUSTOM}
              customRatio={6 / 1}
              key={i}
              width="100%"
            />
          ))}

      {!isLoading &&
        posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <PostItem width="100%" key={post.id} post={post} />
        ))}
    </div>
  );
};

export default PostsListNoFetch;
