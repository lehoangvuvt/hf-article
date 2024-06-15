"use client";

import MySkeleton, { SHAPE_ENUMS } from "@/components/Skeleton";
import useRelativeTopics from "@/react-query/hooks/useRelativeTopics";
import { useRouter } from "next/navigation";

const RelativeTopicsHeader = ({ currSlug }: { currSlug: string }) => {
  const router = useRouter();
  const { topics, isLoading } = useRelativeTopics(currSlug);

  return (
    <div className="w-full flex flex-row flex-wrap gap-[15px] pt-[10px] pb-[10px]">
      {isLoading &&
        Array(8)
          .fill("")
          .map((_, i) => (
            <MySkeleton
              key={i}
              borderRadius="20px"
              shape={SHAPE_ENUMS.CUSTOM}
              style={{ width: "100px" }}
              childrenStyle={{
                height: "35px",
              }}
            />
          ))}
      {!isLoading &&
        topics &&
        topics.length > 0 &&
        topics.map((topic) => (
          <div
            onClick={() => router.push("/topic/" + topic.slug)}
            style={{
              border:
                currSlug === topic.slug
                  ? "1px solid #121212"
                  : "1px solid transparent",
            }}
            className="py-[8px] text-[rgba(0,0,0,0.7)] px-[20px] rounded-3xl bg-[rgba(0,0,0,0.05)] font-semibold text-[0.85rem] cursor-pointer"
            key={topic.id}
          >
            {topic.topic_name}
          </div>
        ))}
    </div>
  );
};

export default RelativeTopicsHeader;
