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
  const getRandomWidth = () => {
    return Math.floor(Math.random() * (100 - 80 + 1) + 80);
  };

  return (
    <div className="w-[100%] flex flex-row justify-start items-start flex-wrap gap-[10px]">
      {isLoading
        ? Array(8)
            .fill("")
            .map((_, i) => (
              <MySkeleton
                key={i}
                shape={SHAPE_ENUMS.CUSTOM}
                childrenStyle={{
                  height: "30px",
                }}
                borderRadius="40px"
                width={getRandomWidth() + "px"}
              />
            ))
        : topics &&
          topics.map((topic) => <TopicItem key={topic.id} topic={topic} />)}
    </div>
  );
};

export default TopicsList;
