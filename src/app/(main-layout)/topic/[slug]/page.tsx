import PostItem from "@/components/PostItem";
import TopicsService from "@/services/topics.service";
import { notFound } from "next/navigation";
import RelativeTopicsHeader from "./relativeTopicsHeader";

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
        {response.data?.posts &&
          response.data.posts.length > 0 &&
          response.data.posts.map((post) => (
            <div key={post.id} className="w-[48%] max-[768px]:w-[100%]">
              <PostItem mode="VERTICAL" post={post} width="100%" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopicPosts;
