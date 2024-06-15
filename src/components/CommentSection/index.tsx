"use client";

import { QUERY_KEYS } from "@/react-query/consts";
import useComments from "@/react-query/hooks/useComments";
import PostsService from "@/services/posts.service";
import { GetPostDetailsSuccessResponse } from "@/types/apiResponse";
import { FormEvent, useState } from "react";
import { useQueryClient } from "react-query";
import CommentItem from "./commentItem";
import { ClipLoader } from "react-spinners";
import CommentInput from "./commentInput";

const CommentSection = ({
  style,
  data,
}: {
  style?: React.CSSProperties;
  data: GetPostDetailsSuccessResponse;
}) => {
  const { comments, isLoading } = useComments(data.post.id);
  const queryClient = useQueryClient();
  const [isSendingCmt, setSendingCmt] = useState(false);

  const handleOnSend = async (commentInput: string) => {
    if (isSendingCmt) return;
    setSendingCmt(true);
    const response = await PostsService.CommentToPost({
      postId: data.post.id,
      content: commentInput,
      replyToCommentId: -1,
    });
    if (response.status === "success") {
      queryClient.invalidateQueries([QUERY_KEYS.COMMENTS]);
    }
    setSendingCmt(false);
  };

  return (
    <div
      style={style}
      className="w-full flex flex-col gap-[30px] border-[1px] 
                    border-solid border-[rgba(0,0,0,0.1)] 
                    rounded-sm p-[30px]"
    >
      <CommentInput onSend={handleOnSend} isSendingCmt={isSendingCmt} />
      <div className="w-full flex flex-col items-center gap-[30px]">
        {isLoading && <ClipLoader color={"#121212"} size={25} />}
        {!isLoading &&
          comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default CommentSection;
