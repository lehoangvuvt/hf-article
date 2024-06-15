"use client";

import { State } from "@/redux/store";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const CommentInput = ({
  onSend,
  isSendingCmt,
}: {
  onSend: (input: string) => void;
  isSendingCmt: boolean;
}) => {
  const [commentInput, setCommentInput] = useState("");
  const userState = useSelector((state: State) => state.user);
  const router = useRouter();

  const submitComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!userState.userInfo) {
      toast(
        <div>
          You need to{" "}
          <span
            onClick={() => router.push("/login")}
            className="cursor-pointer text-[#0099FF] font-semibold hover:underline"
          >
            login
          </span>{" "}
          to be able to comment
        </div>,
        {
          position: "top-center",
        }
      );
      return;
    } else {
      if (commentInput.trim().length === 0) {
        toast("Please input your comment", {
          type: "error",
          position: "top-center",
        });
        return;
      }
      onSend(commentInput);
    }
  };

  useEffect(() => {
    if (!isSendingCmt) setCommentInput("");
  }, [isSendingCmt]);

  return (
    <form
      onSubmit={submitComment}
      className="w-full flex items-center 
                    gap-[40px] border-b-[1px] border-b-solid
                  border-b-[rgba(0,0,0,0.1)] pb-[30px]"
    >
      <input
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        type="text"
        className="flex-1 outline-none text-[0.925rem]"
        placeholder="Share your thoughts about this post"
      />
      <button
        disabled={isSendingCmt}
        type="button"
        onClick={submitComment}
        style={{
          cursor: !isSendingCmt ? "pointer" : "not-allowed",
        }}
        className="text-[0.925rem] flex items-center justify-center"
      >
        {!isSendingCmt ? "Send" : <ClipLoader color={"#121212"} size={25} />}
      </button>
    </form>
  );
};

export default CommentInput;
