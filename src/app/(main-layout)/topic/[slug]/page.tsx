import TopicsService from "@/services/topics.service";
import { notFound } from "next/navigation";
import RelativeTopicsHeader from "./relativeTopicsHeader";
import TopicDetailsView from "./view";

const TopicPosts = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page: number };
}) => {
  const response = await TopicsService.GetPostsByTopic(
    params.slug,
    searchParams.page - 1 ?? 0,
    6
  );
  if (response.status === "fail") return notFound();
  return (
    <div className="w-full flex flex-col">
      <RelativeTopicsHeader currSlug={params.slug} />
      <div className="w-full flex flex-row flex-wrap justify-between">
        <TopicDetailsView data={response.data} />
      </div>
    </div>
  );
};

export default TopicPosts;
