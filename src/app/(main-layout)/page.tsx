"use client";

import PostsList from "@/components/PostsList";
import ScrollerItems from "@/components/ScrollerItems";
import TopicsList from "@/components/TopicsList";
import useRecommendedTopics from "@/react-query/hooks/useRecommendedTopics";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    <div className="w-full flex flex-row max-[768px]:flex-col flex-wrap items-start gap-[50px]">
      {/* {isLoading && (
          <div className="fixed top-0 left-0 z-[1000] w-screen h-screen bg-[white] flex flex-col items-center justify-center pointer-events-none">
            <div className="relative w-[35%] aspect-video pointer-events-none cursor-default">
              <Image
                className="animate-pulse"
                src={logo.src}
                fill
                objectFit="contain"
                objectPosition="top"
                alt="logo"
              />
            </div>
          </div>
        )} */}
      <div className="w-[65%] max-[768px]:w-full flex flex-wrap flex-col pb-[50px] max-[760px]:pb-[0px]">
        <div className="sticky top-[0px] mt-[35px] mb-[20px] z-[100] w-[100%] h-[60px]">
          <ScrollerItems />
        </div>
        <PostsList />
      </div>

      <div className="flex-1 flex flex-col gap-[20px] mt-[50px] max-[760px]:mt-[0px] sticky max-[760px]:relative top-[20px] max-[760px]:top-[0px]">
        <div className="w-full font-bold text-[#121212]">
          Recommended topics
        </div>
        <TopicsList isLoading={isLoadingReTopics} topics={relativeTopics} />
      </div>
    </div>
  );
};

export default HomePage;
