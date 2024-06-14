"use client";

import { FormEvent, useEffect, useState } from "react";
import { FontStyle, TextEditorContent } from "./types";
import ParagraphView from "./paragraphView";
import { PostDetails, PostLike, Topic } from "@/types/apiResponse";
import { useRouter } from "next/navigation";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import PostsService from "@/services/posts.service";
import { useQueryClient } from "react-query";
import { QUERY_KEYS } from "@/react-query/consts";
import { useSelector } from "react-redux";
import { State } from "@/redux/store";
import { toast } from "react-toastify";

type Props = {
  contents: TextEditorContent;
  topics?: Topic[] | null;
  postDetails?: PostDetails;
  postLikes?: PostLike[] | null;
};

const TextEditorView: React.FC<Props> = ({
  contents,
  topics = [],
  postDetails = null,
  postLikes = null,
}) => {
  const queryClient = useQueryClient();
  const userState = useSelector((state: State) => state.user);
  const router = useRouter();
  const [clonedContents, setClonedContents] =
    useState<TextEditorContent | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (contents) {
      console.log(contents);
      setClonedContents(structuredClone(contents));
    }
  }, [contents]);

  const getTitleNode = (title: string): React.ReactNode => {
    return (
      <div
        id="title-wrapper"
        style={{
          textWrap: "balance",
        }}
        className="w-full relative mb-[20px] flex text-center"
      >
        <div
          id={`title`}
          onInput={(e) => handleOnTextChange(e, -1)}
          className="w-full text-[3rem] font-bold text-[#121212] block break-words outline-none px-[10px] py-[5px] bg-[white]"
        >
          {title.length > 0 && title}
        </div>
        {title.length === 0 && (
          <p
            id="title-placeholder"
            className="absolute top-0 left-[15px] 
            text-[3rem] py-[5px] font-bold
            text-[rgba(0,0,0,0.2)] pointer-events-none
          "
          >
            Title
          </p>
        )}
      </div>
    );
  };

  const handleOnTextChange = (e: FormEvent<HTMLDivElement>, index: number) => {
    if (e.currentTarget.innerHTML.includes("<br>")) {
      e.currentTarget.innerHTML = e.currentTarget.innerHTML.replaceAll(
        "<br>",
        ""
      );
    }
    if (e.currentTarget.innerHTML.includes("<div>")) {
      e.currentTarget.innerHTML = e.currentTarget.innerHTML.replaceAll(
        "<div>",
        ""
      );
    }
    if (e.currentTarget.innerHTML.includes("</div>")) {
      e.currentTarget.innerHTML = e.currentTarget.innerHTML.replaceAll(
        "</div>",
        ""
      );
    }
    if (e.currentTarget.innerHTML.includes("</div>")) {
      e.currentTarget.innerHTML = e.currentTarget.innerHTML.replaceAll(
        "</div>",
        ""
      );
    }
    if (index === -1) {
      if (e.currentTarget.innerText.length > 0) {
        const titlePlaceholderEle =
          document.getElementById("title-placeholder");
        if (titlePlaceholderEle) {
          titlePlaceholderEle.style.display = "none";
        }
      } else {
        const titleWrapper = document.getElementById("title-wrapper");
        if (!titleWrapper) return;
        const titlePlaceholderEle =
          document.getElementById("title-placeholder");
        if (titlePlaceholderEle) {
          titlePlaceholderEle.style.display = "flex";
        }
      }
    } else {
      if (e.currentTarget.innerText.length > 0) {
        const placeHolderEle = document.getElementById(
          `paragraph-${index}-placeholder`
        );
        if (placeHolderEle) {
          placeHolderEle.style.display = "none";
        }
      } else {
        const pgWrapper = document.getElementById(`paragraph-wrapper-${index}`);
        if (!pgWrapper) return;
        const placeHolderEle = document.getElementById(
          `paragraph-${index}-placeholder`
        );
        if (placeHolderEle) {
          placeHolderEle.style.display = "flex";
        }
      }
    }
  };

  useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("unmounted");
    };
  }, []);

  const removeFS = (fs: FontStyle, index: number) => {
    let cloneContents = Object.assign({}, clonedContents);
    cloneContents.paragraphs[index].fontStyles = cloneContents.paragraphs[
      index
    ].fontStyles.filter((ele) => ele !== fs);
    setClonedContents(cloneContents);
  };

  const addFS = (fs: FontStyle, index: number) => {
    let cloneContents = Object.assign({}, clonedContents);
    cloneContents.paragraphs[index].fontStyles.push(fs);
    setClonedContents(cloneContents);
  };

  return (
    <div className="w-full mt-[20px]">
      <div className="w-full flex-col gap-[20px]">
        <div className="w-full flex flex-col mb-[30px]">
          {clonedContents && getTitleNode(clonedContents.title.content)}
          {postDetails && (
            <div
              className="w-full flex flex-row items-center 
                        gap-[5px] mb-[30px] mt-[30px] py-[15px]
                        border-y-solid border-y-[rgba(0,0,0,0.1)] border-y-[1px]"
            >
              {postLikes &&
              postLikes.find(
                (ele) => ele.user_id === userState.userInfo?.id
              ) ? (
                <div
                  onClick={async () => {
                    const response = await PostsService.UnlikePost(
                      postDetails.id
                    );
                    if (response.status === "success") {
                      queryClient.invalidateQueries([
                        QUERY_KEYS.POST_LIKES_BY_POST_ID,
                      ]);
                    }
                  }}
                  style={{
                    transform: "scaleX(-1)",
                    cursor: "pointer",
                  }}
                >
                  <ThumbUpAlt />
                </div>
              ) : (
                <div
                  onClick={async () => {
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
                          to be able to like this post
                        </div>,
                        {
                          position: "top-center",
                        }
                      );
                      return;
                    }
                    const response = await PostsService.LikePost(
                      postDetails.id
                    );
                    if (response.status === "success") {
                      queryClient.invalidateQueries([
                        QUERY_KEYS.POST_LIKES_BY_POST_ID,
                      ]);
                    }
                  }}
                  style={{
                    transform: "scaleX(-1)",
                    cursor: "pointer",
                  }}
                >
                  <ThumbUpOffAltIcon />
                </div>
              )}
              {postLikes?.length ?? 0} likes
            </div>
          )}
          {clonedContents &&
            clonedContents.paragraphs.map((pa, i) => (
              <ParagraphView
                removeFS={removeFS}
                addFS={addFS}
                clonedContents={clonedContents}
                i={i}
                paragraph={pa}
                setClonedContents={setClonedContents}
                handleOnTextChange={handleOnTextChange}
                key={i}
              />
            ))}
        </div>
        <div className="w-full flex flex-row gap-[15px]">
          {topics &&
            topics.length > 0 &&
            topics.map((topic) => (
              <div
                onClick={() => router.push("/topic/" + topic.slug)}
                key={topic.id}
                className="bg-[rgba(0,0,0,0.05)] cursor-pointer text-[0.85rem] py-[10px] px-[20px] rounded-3xl font-semibold"
              >
                {topic.topic_name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TextEditorView;
