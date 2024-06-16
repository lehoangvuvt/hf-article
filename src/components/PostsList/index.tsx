"use client";

import { useSearchParams } from "next/navigation";
import { AllPostsList } from "./allPostsList";
import PostsByTopicList from "./postsByTopicList";

const PostsList = ({ style }: { style?: React.CSSProperties }) => {
  const searchParams = useSearchParams();

  return (
    <div style={style} className="w-full flex flex-col flex-wrap gap-[15px]">
      {typeof searchParams.get("topic") === "string" &&
        searchParams.get("topic") === "all" && <AllPostsList />}

      {typeof searchParams.get("topic") === "string" &&
        searchParams.get("topic") !== "all" && (
          <PostsByTopicList key={searchParams.get("topic")} />
        )}

      {/* <button
        disabled={!getPostsData?.has_prev}
        onClick={() => {
          if (getPostsData?.posts && getPostsData.posts.length > 0) {
            setEnd(-1);
            setStart(getPostsData.posts[0].id);
          }
        }}
      >
        Prev
      </button> */}
    </div>
  );
};

export default PostsList;
