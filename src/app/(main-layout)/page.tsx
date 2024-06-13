"use client";

import PostsList from "@/components/PostsList";
import ScrollerItems from "@/components/ScrollerItems";
import MySkeleton, { SHAPE_ENUMS } from "@/components/Skeleton";
import TopicsList from "@/components/TopicsList";
import useRecommendedTopics from "@/react-query/hooks/useRecommendedTopics";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { topics: relativeTopics, isLoading: isLoadingReTopics } =
    useRecommendedTopics();

  useEffect(() => {
    if (router) {
      if (!searchParams.has("topic")) {
        router.push("/?topic=all");
      }
    }
  }, [router, searchParams]);

  return (
    <div className="w-full flex flex-row flex-wrap items-start gap-[50px]">
      <div className="w-[65%] flex flex-wrap flex-col pb-[50px]">
        <div className="sticky top-[0px] mt-[35px] z-[100] w-[100%] h-[60px]">
          <ScrollerItems />
        </div>
        <PostsList />
      </div>

      <div className="flex-1 flex flex-col gap-[20px] mt-[50px] sticky top-[20px]">
        <div className="w-full font-bold text-[#121212]">
          Recommended topics
        </div>
        <TopicsList isLoading={isLoadingReTopics} topics={relativeTopics} />
      </div>
    </div>
  );
};

export default HomePage;
