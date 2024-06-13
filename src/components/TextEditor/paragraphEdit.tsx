/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { FontStyle, Paragraph, TextEditorContent, Type } from "./types";
import { twMerge } from "tailwind-merge";
import { FormEvent, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import FontDownloadOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import ParaphraphPopover, { ChangeContentTypeData } from "./paraphraphPopover";

type Props = {
  paragraph: Paragraph;
  i: number;
  setFocusId: (id: string) => void;
  focusId: string | null;
  clonedContents: TextEditorContent;
  setClonedContents: (content: TextEditorContent) => void;
  handleOnTextChange: (e: FormEvent<HTMLDivElement>, index: number) => void;
  removeFS: (fs: FontStyle, index: number) => void;
  addFS: (fs: FontStyle, index: number) => void;
  changeContentType: (data: ChangeContentTypeData, index: number) => void;
};

const ParagraphEdit: React.FC<Props> = ({
  paragraph,
  i,
  setFocusId,
  focusId,
  clonedContents,
  setClonedContents,
  handleOnTextChange,
  removeFS,
  addFS,
  changeContentType,
}) => {
  const [isOpenPopover, setOpenPopover] = useState(false);
  const [status, setStatus] = useState<"CREATE" | "UPDATE" | "NONE">("NONE");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (focusId !== `paragraph_${i}`) {
      setStatus("NONE");
      return;
    }
    const ele = document.getElementById(`paragraph_${i}`);
    if (!ele) return;

    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(ele, ele.childNodes.length);
    range.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(range);

    if (ele.innerText.length > 0) {
      setStatus("UPDATE");
    } else {
      setStatus("CREATE");
    }
  }, [status, i, focusId]);

  if (paragraph.type == Type.IMAGE) {
    const className =
      "w-full aspect-video relative mt-[50px] mb-[50px] flex justify-center outline-none";
    return (
      <div
        contentEditable
        id={`paragraph_${i}`}
        onKeyUp={(e) => {
          if (e.key === "Delete") {
            if (focusId && focusId === `paragraph_${i}`) {
              let newClonedContents = Object.assign({}, clonedContents);
              newClonedContents.paragraphs =
                newClonedContents.paragraphs.filter(
                  (_, index) => `paragraph_${index}` !== `paragraph_${i}`
                );

              if (newClonedContents.paragraphs.length > 0) {
                const currentFocusIndex = parseInt(focusId.split("_")[1]);
                setFocusId(`paragraph_${currentFocusIndex - 1}`);
              } else {
                setFocusId("title");
              }
              setClonedContents(newClonedContents);
            }
          }
        }}
        className={className}
        onClick={(e) => setFocusId(`paragraph_${i}`)}
      >
        <img
          style={{
            border: focusId === `paragraph_${i}` ? "4px solid #0099FF" : "none",
            pointerEvents: "none",
          }}
          width={paragraph.imgProperties?.width}
          height={paragraph.imgProperties?.height}
          src={paragraph.content}
          alt="post-image"
        />
      </div>
    );
  } else {
    let className =
      "w-full text-[1.2rem] outline-none break-words px-[10px] py-[10px]";
    if (paragraph.fontStyles.length === 0) {
      className += " font-light text-[#121212]";
    } else {
      paragraph.fontStyles.forEach((fs) => {
        switch (fs) {
          case FontStyle.BOLD:
            className += " font-bold text-[#121212]";
            break;
          case FontStyle.ITALIC:
            className += " italic";
            break;
          case FontStyle.QUOTE:
            className +=
              " border-l-[solid] border-l-[2px] border-l-[#121212] pl-[10px]";
            break;
        }
      });
    }

    return (
      <div
        id={`paragraph-wrapper-${i}`}
        className="w-full relative"
        style={{
          minHeight: "40px",
        }}
      >
        <ParaphraphPopover
          status={status}
          anchorEl={anchorEl}
          open={open}
          paragraph={paragraph}
          removeFS={(fs) => removeFS(fs, i)}
          addFS={(fs) => addFS(fs, i)}
          setAnchorEl={setAnchorEl}
          changeContentType={(data) => changeContentType(data, i)}
        />
        {status === "CREATE" && (
          <button
            className="absolute -left-[45px] top-0 bg-[white] 
            border-solid border-[rgba(0,0,0,0.9)] border-[1px] 
            w-[35px] h-[35px] rounded-full
            text-[rgba(0,0,0,0.9)]
            flex items-center justify-center
            "
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              setOpenPopover(!isOpenPopover);
            }}
          >
            <AddIcon
              color="inherit"
              style={{
                fontSize: "2rem",
              }}
            />
          </button>
        )}

        {status === "UPDATE" && (
          <button
            className="absolute -left-[45px] top-0 bg-[white] 
            w-[35px] h-[35px]
            text-[1.8em]
            text-[rgba(0,0,0,0.9)]
            flex items-center justify-center
            "
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              setOpenPopover(!isOpenPopover);
            }}
          >
            <FontDownloadOutlinedIcon fontSize="inherit" />
          </button>
        )}

        <div
          key={i}
          onClick={(e) => setFocusId(`paragraph_${i}`)}
          id={`paragraph_${i}`}
          contentEditable={`paragraph_${i}` === focusId}
          className={twMerge(className, "cursor-text", "block")}
          onInput={(e) => {
            if (e.currentTarget.innerText.length > 0) {
              setStatus("UPDATE");
            } else {
              setStatus("CREATE");
            }
            handleOnTextChange(e, i);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              if (focusId) {
                let newClonedContents = Object.assign({}, clonedContents);

                const ele = document.getElementById(`paragraph_${i}`);

                if (ele) {
                  newClonedContents.paragraphs[i].content = ele.innerText;
                }

                const currentFocusIndex = parseInt(focusId.split("_")[1]);
                newClonedContents.paragraphs.splice(currentFocusIndex + 1, 0, {
                  content: "",
                  type: Type.TEXT,
                  fontStyles: [],
                  validFontStyles: [
                    FontStyle.BOLD,
                    FontStyle.ITALIC,
                    FontStyle.QUOTE,
                  ],
                  validTypes: [Type.TEXT, Type.LINK, Type.IMAGE],
                });

                setFocusId(`paragraph_${i + 1}`);
                console.log(newClonedContents);
                setClonedContents(newClonedContents);
              }
            }
            if (e.key === "Backspace") {
              if (focusId) {
                const ele = document.getElementById(`${focusId}`);
                if (!ele) return;
                if (status === "CREATE") {
                  let newClonedContents = Object.assign({}, clonedContents);

                  const ele = document.getElementById(`paragraph_${i}`);

                  if (ele) {
                    newClonedContents.paragraphs[i].content = ele.innerText;
                  }

                  newClonedContents.paragraphs =
                    newClonedContents.paragraphs.filter(
                      (_, index) => `paragraph_${index}` !== `paragraph_${i}`
                    );

                  if (newClonedContents.paragraphs.length > 0) {
                    const currentFocusIndex = parseInt(focusId.split("_")[1]);
                    setFocusId(`paragraph_${currentFocusIndex - 1}`);
                  } else {
                    setFocusId("title");
                  }
                  setClonedContents(newClonedContents);
                }
              }
            }
          }}
        >
          {paragraph.type === Type.TEXT ? (
            paragraph.content && paragraph.content.length > 0 ? (
              paragraph.content
            ) : null
          ) : (
            <a href={paragraph.content} className="text-[blue]">
              123
            </a>
          )}
        </div>
        {paragraph.content && paragraph.content.length === 0 && (
          <p
            id={`paragraph-${i}-placeholder`}
            className="absolute top-0 left-[15px] 
            text-[1.8rem] py-[5px] font-medium
            text-[rgba(0,0,0,0.2)] pointer-events-none
          "
          >
            Paragraph {i + 1}
          </p>
        )}
      </div>
    );
  }
};

export default ParagraphEdit;
