import { notFound } from "next/navigation";
import { Metadata } from "next";
import PostsService from "@/services/posts.service";
import PostDetailsView from "./view";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const response = await PostsService.GetPostDetails(params.slug);
  if (response.status === "fail") {
    return {
      title: "Article",
      description: "Artile",
    };
  }
  return {
    title: response.data.post.title,
    description: response.data.post.title,
    openGraph: {
      images: [response.data.post.thumbnail_url ?? ""],
    },
  };
}

const PostDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const response = await PostsService.GetPostDetails(params.slug);
  if (response.status === "fail") {
    return notFound();
  }
  return <PostDetailsView data={response.data} />;
};

export default PostDetailsPage;
