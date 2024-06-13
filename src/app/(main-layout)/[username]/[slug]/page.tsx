import { notFound } from "next/navigation";
import { Metadata } from "next";
import PostsService from "@/services/posts.service";
import TextEditorView from "@/components/TextEditor/view";
import { TextEditorContent } from "@/components/TextEditor/types";
import PostItem from "@/components/PostItem";

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
  };
}

const PostDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const response = await PostsService.GetPostDetails(params.slug);
  if (response.status === "fail") {
    console.log(response.errorMsg);
    return notFound();
  }
  const postDetails = response.data.post;
  const contents = JSON.parse(postDetails.content) as TextEditorContent;

  return (
    <div className="w-[70%] flex flex-col relative gap-[40px]">
      <div className="w-full flex flex-col relative">
        <TextEditorView contents={contents} topics={postDetails.topics} />
      </div>

      {response.data.relative_posts &&
        response.data.relative_posts.length > 0 && (
          <div className="w-full flex flex-col">
            <div className="w-full text-[#121212] font-bold text-[1.5rem] mb-[10px]">
              Relative posts
            </div>
            <div className="w-full flex flex-row flex-wrap relative justify-between">
              {response.data.relative_posts.map((post) => (
                <PostItem
                  width="48%"
                  mode="VERTICAL"
                  key={post.id}
                  post={post}
                />
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default PostDetailsPage;
