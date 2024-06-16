"use client";

import { Topic } from "@/types/apiResponse";
import { useRouter } from "next/navigation";

const TopicItem = ({ topic }: { topic: Topic }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/topic/${topic.slug}?page=1`)}
      className="bg-[rgba(0,0,0,0.06)] px-[15px] py-[8px] rounded-3xl text-[0.85rem] cursor-pointer"
      key={topic.id}
    >
      {topic.topic_name}
    </div>
  );
};

export default TopicItem;
