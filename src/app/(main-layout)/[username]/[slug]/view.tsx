"use client";

import CommentSection from "@/components/CommentSection";
import PostItem from "@/components/PostItem";
import { TextEditorContent } from "@/components/TextEditor/types";
import TextEditorView from "@/components/TextEditor/view";
import usePostLikesByPostId from "@/react-query/hooks/usePostLikesByPostId";
import { GetPostDetailsSuccessResponse } from "@/types/apiResponse";

const PostDetailsView = ({ data }: { data: GetPostDetailsSuccessResponse }) => {
  const contents = JSON.parse(data.post.content) as TextEditorContent;
  const { postLikes, isLoading } = usePostLikesByPostId(data.post.id);

  return (
    <div className="w-[70%] max-[760px]:w-full flex flex-col relative gap-[40px]">
      <div className="w-full flex flex-col relative">
        <TextEditorView
          contents={contents}
          topics={data.post.topics}
          postDetails={data.post}
          postLikes={postLikes}
          isLoadingPostLikes={isLoading}
        />
        <CommentSection data={data} style={{ marginTop: "50px" }} />
      </div>

      {data.relative_posts && data.relative_posts.length > 0 && (
        <div className="w-full flex flex-col">
          <div className="w-full text-[#121212] font-bold text-[1.5rem] mb-[10px]">
            Relative posts
          </div>
          <div className="w-full flex flex-row flex-wrap relative justify-between">
            {data.relative_posts.map((post) => (
              <PostItem width="48%" mode="VERTICAL" key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailsView;
