"use client";

import { Comment } from "@/types/apiResponse";
import moment from "moment";
import { twMerge } from "tailwind-merge";

const CommentItem = ({
  comment,
  isLast = false,
}: {
  comment: Comment;
  isLast?: boolean;
}) => {
  const classes = twMerge(
    "w-full flex flex-col gap-[10px] pb-[20px]",
    !isLast ? "border-b-solid border-b-[1px]" : ""
  );
  return (
    <div className={classes}>
      <div className="w-full flex flex-row gap-[20px]">
        <div className="w-[50px] aspect-square rounded-full bg-[#f4cdd4]" />
        <div className="w-full flex-1 flex-col">
          <div className="w-full text-[0.925rem] font-bold text-[#121212]">
            {comment.user_details.username}
          </div>
          <div className="w-full text-[0.85rem] font-medium text-[rgba(0,0,0,0.5)]">
            {moment(comment.created_at).fromNow()}
          </div>
        </div>
      </div>
      <div className="w-full text-[0.9rem] text-[#121212] mt-[5px]">
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
