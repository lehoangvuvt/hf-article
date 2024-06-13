import PostItem from "@/components/PostItem";
import TopicsService from "@/services/topics.service";
import Link from "next/link";
import { notFound } from "next/navigation";
import RelativeTopicsHeader from "./relativeTopicsHeader";

const TopicPosts = async ({ params }: { params: { slug: string } }) => {
  const response = await TopicsService.GetPostsByTopic(params.slug);
  if (response.status === "fail") return notFound();
  return (
    <div className="w-full flex flex-col">
      <RelativeTopicsHeader currSlug={params.slug} />
      <div className="w-full flex flex-row flex-wrap justify-between">
        {response.data.posts?.length > 0 &&
          response.data.posts.map((post) => (
            <PostItem key={post.id} mode="VERTICAL" post={post} width="48%" />
          ))}
      </div>
    </div>
  );
};

export default TopicPosts;
