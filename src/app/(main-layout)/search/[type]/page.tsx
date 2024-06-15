"use client";

import PostsList from "@/components/PostsList";
import PostsListNoFetch from "@/components/PostsListNoFetch";
import TopicsList from "@/components/TopicsList";
import usePosts from "@/react-query/hooks/usePosts";
import useSearchTopics from "@/react-query/hooks/useSearchTopics";
import { useRouter } from "next/navigation";

const SearchPage = ({
  searchParams,
  params,
}: {
  searchParams: { q?: string };
  params: { type: string };
}) => {
  const router = useRouter();
  const { posts, isLoading: isLoadingPosts } = usePosts(
    null,
    searchParams.q ?? "*",
    params.type && params.type === "posts" ? true : false
  );
  const { topics, isLoading: isLoadingTopics } = useSearchTopics(
    searchParams.q ?? "",
    params.type && params.type === "topics" ? true : false
  );

  const renderComponentByType = () => {
    switch (params.type) {
      case "posts":
        return (
          <div className="w-[75%] max-[768px]:w-full flex flex-row">
            <PostsListNoFetch
              style={{ width: "100%" }}
              isLoading={isLoadingPosts}
              posts={posts}
            />
            {/* <div className="w-full flex-1">
              <TopicsList isLoading={} />
            </div> */}
          </div>
        );
      case "topics":
        return <TopicsList isLoading={isLoadingTopics} topics={topics} />;
    }
  };

  return (
    <div className="w-[100%] flex flex-col">
      <div className="w-full py-[40px] font-semibold text-[2.5rem] text-[rgba(0,0,0,0.45)]">
        Results for{" "}
        <span className="text-[#121212]">{`“${searchParams.q}”`}</span>
      </div>
      <div className="w-full h-[35px] border-b-[1px] border-b-solid border-b-[rgba(0,0,0,0,0.6)] flex flex-row flex-wrap gap-[15px] mb-[20px]">
        <div
          onClick={() => router.push(`/search/posts?q=${searchParams.q}`)}
          style={{
            color: params.type === "posts" ? "#121212" : "rgba(0,0,0,0.55)",
            borderBottom:
              params.type === "posts"
                ? "1px solid #121212"
                : "1px solid transparent",
          }}
          className="h-full px-[10px] text-[0.95rem] font-semibold  cursor-pointer transition-colors hover:text-[#121212]"
        >
          Posts
        </div>
        <div
          onClick={() => router.push(`/search/topics?q=${searchParams.q}`)}
          style={{
            color: params.type === "topics" ? "#121212" : "rgba(0,0,0,0.55)",
            borderBottom:
              params.type === "topics"
                ? "1px solid #121212"
                : "1px solid transparent",
          }}
          className="h-full px-[10px] text-[0.95rem] font-semibold  cursor-pointer transition-colors hover:text-[#121212]"
        >
          Topics
        </div>
      </div>
      <div>{renderComponentByType()}</div>
    </div>
  );
};

export default SearchPage;
