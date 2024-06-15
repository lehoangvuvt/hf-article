"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { PackedData } from "./types";
import TextEditorView from "./view";
import useSearchTopics from "@/react-query/hooks/useSearchTopics";
import { Popover } from "@mui/material";
import PostsService from "@/services/posts.service";

type Props = {
  packedData: PackedData | null;
  isOpen: boolean;
};

const PublishModal: React.FC<Props> = ({ packedData, isOpen }) => {
  const [newTopics, setNewTopics] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  const [existedTopics, setExistedTopics] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  const [topicInput, setTopicInput] = useState("");
  const [enabled, setEnabled] = useState(true);
  const inputTopicRef = useRef<HTMLInputElement>(null);
  const { topics: searchedTopics, isLoading } = useSearchTopics(
    topicInput,
    enabled
  );
  const timeoutRef = useRef<any>(null);
  const [isOpenPopover, setOpenPopver] = useState(false);

  useEffect(() => {
    setEnabled(false);
    if (timeoutRef && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setEnabled(true);
    }, 300);
  }, [topicInput]);

  useEffect(() => {
    if (!isLoading && searchedTopics && searchedTopics.length > 0) {
      setOpenPopver(true);
    } else {
      setOpenPopver(false);
    }
  }, [searchedTopics, isLoading]);

  useEffect(() => {
    if (isOpen && packedData) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isOpen, packedData]);

  const handleAddTag = (e: FormEvent) => {
    e.preventDefault();
    if (topicInput.trim().length === 0) {
      return;
    }
    if (newTopics.find((ele) => ele.name === topicInput)) {
      return;
    }

    setNewTopics([
      ...newTopics,
      {
        id: -1,
        name: topicInput,
      },
    ]);
    setTopicInput("");
  };

  const publish = async () => {
    if (!packedData) return;
    const data = {
      title: packedData.title,
      short_content: packedData.short_content,
      thumbnail_url: packedData.thumbnail_url,
      content: packedData.content,
      topics: [...existedTopics, ...newTopics],
    };
    await PostsService.CreatePost(data);
  };

  if (!isOpen || packedData === null) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[500] bg-[white] flex justify-center items-center">
      <div className="w-[80%] h-[80%] bg-[white] flex flex-wrap flex-row gap-[40px]">
        <div className="flex-1 h-[100%] select-none flex flex-col flex-wrap overflow-hidden">
          <div className="w-full font-semibold text-[#121212] text-[1.2rem]">
            Post review
          </div>
          <div
            style={{
              transform: "scale(1)",
              transformOrigin: "top center",
              aspectRatio: 16 / 9,
            }}
            className="w-full flex-1 justify-center overflow-y-auto"
          >
            <TextEditorView
              contents={JSON.parse(packedData.content)}
              postLikes={null}
              isLoadingPostLikes={false}
            />
          </div>
        </div>

        <div className="flex-1 h-[100%] flex flex-col gap-[20px]">
          <div className="w-full font-semibold text-[#121212] text-[1.2rem]">
            Publish your post
          </div>
          <form
            onSubmit={handleAddTag}
            className="w-full outline-none py-[15px] px-[15px] flex flex-wrap gap-[10px]
                 bg-[rgba(0,0,0,0.05)]"
          >
            {newTopics &&
              newTopics.length > 0 &&
              newTopics.map((topic) => (
                <div
                  style={{ minWidth: "70px" }}
                  className="relative px-[8px] py-[5px] bg-[white] text-[0.9rem] flex
                  gap-[10px]
                  justify-center items-center"
                  key={topic.name}
                >
                  {topic.name}
                  <button
                    type="button"
                    onClick={() => {
                      setNewTopics((prev) =>
                        prev.filter((ele) => ele.name !== topic.name)
                      );
                    }}
                    className="text-[0.85rem] cursor-pointer"
                  >
                    <ClearIcon fontSize="inherit" />
                  </button>
                </div>
              ))}

            {existedTopics &&
              existedTopics.length > 0 &&
              existedTopics.map((topic) => (
                <div
                  style={{ minWidth: "70px" }}
                  className="relative px-[8px] py-[5px] bg-[white] text-[0.9rem] flex
                  gap-[10px]
                  justify-center items-center"
                  key={topic.name}
                >
                  {topic.name}
                  <button
                    type="button"
                    onClick={() => {
                      setExistedTopics((prev) =>
                        prev.filter((ele) => ele.id !== topic.id)
                      );
                    }}
                    className="text-[0.85rem] cursor-pointer"
                  >
                    <ClearIcon fontSize="inherit" />
                  </button>
                </div>
              ))}
            <input
              ref={inputTopicRef}
              className="flex-1 outline-none bg-[transparent] py-[5px] border-none"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="Add a topic..."
            />
          </form>
          <button
            onClick={publish}
            className="bg-[#0099FF] font-semibold text-[white] w-[100px] outline-none py-[8px] rounded-3xl text-[0.9rem] hover:brightness-90"
          >
            Publish
          </button>
          <Popover
            open={isOpenPopover}
            anchorEl={inputTopicRef.current}
            disableAutoFocus
            disableEnforceFocus
            onClose={() => {
              setOpenPopver(false);
            }}
            style={{
              marginLeft: "-50px",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div className="bg-[white] flex flex-col flex-wrap px-[15px] py-[10px] gap-[5px]">
              {searchedTopics &&
                searchedTopics.length > 0 &&
                searchedTopics.map((topic) => (
                  <button
                    onClick={() => {
                      if (existedTopics.find((item) => item.id === topic.id)) {
                        setOpenPopver(false);
                        return;
                      }
                      setExistedTopics([
                        ...existedTopics,
                        {
                          id: topic.id,
                          name: topic.topic_name,
                        },
                      ]);
                      setOpenPopver(false);
                      setTopicInput("");
                    }}
                    className="w-full text-[0.85rem] font-semibold cursor-pointer text-left"
                    key={topic.slug}
                  >
                    {topic.topic_name}{" "}
                    <span className="text-[rgba(0,0,0,0.5)]">
                      ({topic.total_posts})
                    </span>
                  </button>
                ))}
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
