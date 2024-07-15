"use client";

import CommentSection from "@/components/CommentSection";
import NewEditor from "@/components/NewTextEditor";
import { PostItem } from "@/components/PostItem";
import { GetPostDetailsSuccessResponse } from "@/types/apiResponse";
import { useRouter } from "next/navigation";

const PostDetailsView = ({ data }: { data: GetPostDetailsSuccessResponse }) => {
  const router = useRouter();

  return (
    <div className="w-[70%] max-[760px]:w-full flex flex-col relative gap-[40px]">
      <div className="w-full flex flex-col relative">
        {data.post.editor_type === 2 && (
          <NewEditor
            mode="readonly"
            initValue={JSON.parse(data.post.content)}
          />
        )}
        <div className="w-full flex flex-row gap-[15px]">
          {data.post.topics &&
            data.post.topics.length > 0 &&
            data.post.topics.map((topic) => (
              <div
                onClick={() => router.push("/topic/" + topic.slug)}
                key={topic.id}
                className="bg-[rgba(0,0,0,0.05)] cursor-pointer text-[0.85rem] py-[10px] px-[20px] rounded-3xl font-semibold"
              >
                {topic.topic_name}
              </div>
            ))}
        </div>
        <CommentSection data={data} style={{ marginTop: "50px" }} />
      </div>

      {data.relative_posts && data.relative_posts.length > 0 && (
        <div className="w-full flex flex-col">
          <div className="w-full text-[#121212] font-bold text-[1.5rem] mb-[10px]">
            Relative posts
          </div>
          <div className="w-full flex flex-row flex-wrap relative justify-between">
            {data.relative_posts.map((post) => (
              <PostItem.Root
                key={post.id}
                mode="VERTICAL"
                context={{
                  post,
                  width: "48%%",
                }}
              >
                <PostItem.Thumbnail />
              </PostItem.Root>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailsView;
