"use client";

import { Comment } from "@/types/apiResponse";
import moment from "moment";

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <div className="w-full flex flex-col gap-[10px] border-b-solid border-b-[1px] pb-[20px]">
      <div className="w-full flex-col">
        <div className="w-full text-[0.925rem] font-bold text-[#121212]">
          {comment.user_details.username}
        </div>
        <div className="w-full text-[0.85   rem] font-semibold text-[rgba(0,0,0,0.5)]">
          {moment(comment.created_at).fromNow()}
        </div>
      </div>
      <div className="w-full text-[0.9  rem] text-[#121212]">
        {comment.content}
      </div>
      <div className="w-full">
        <button className="text-[0.8rem] text-[rgba(0,0,0,0.7)] cursor-pointer hover:underline">
          Reply
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
