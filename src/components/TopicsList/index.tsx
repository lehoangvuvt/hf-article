"use client";

import { Topic } from "@/types/apiResponse";
import MySkeleton, { SHAPE_ENUMS } from "../Skeleton";
import TopicItem from "./topicItem";

const TopicsList = ({
  topics,
  isLoading,
}: {
  topics: Topic[] | null;
  isLoading: boolean;
}) => {
  return (
    <div className="w-[100%] flex flex-row justify-start items-start flex-wrap gap-[10px]">
      {isLoading
        ? Array(5)
            .fill("")
            .map((_, i) => (
              <MySkeleton
                key={i}
                shape={SHAPE_ENUMS.CUSTOM}
                customRatio={2.5 / 1}
                borderRadius="40px"
                width="80px"
              />
            ))
        : topics &&
          topics.map((topic) => <TopicItem key={topic.id} topic={topic} />)}
    </div>
  );
};

export default TopicsList;
