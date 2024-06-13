"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { FontStyle, PackedData, TextEditorContent, Type } from "./types";
import ParagraphEdit from "./paragraphEdit";
import { ChangeContentTypeData } from "./paraphraphPopover";
import PostsService from "@/services/posts.service";
import PublishModal from "./publishModal";
import { createPortal } from "react-dom";

const TextEditorEdit = () => {
  const [focusId, setFocusId] = useState<string | null>("title");
  const [packedData, setPackedData] = useState<PackedData | null>(null);
  const [isOpenPbModal, setOpenPbModal] = useState(false);

  const [contents, setContents] = useState<TextEditorContent>({
    title: {
      content: "",
      type: Type.TEXT,
      validFontStyles: [FontStyle.TITLE],
      fontStyles: [FontStyle.TITLE],
      validTypes: [Type.TEXT],
    },
    paragraphs: [],
  });

  const [clonedContents, setClonedContents] =
    useState<TextEditorContent | null>(structuredClone(contents));

  const getTitleNode = (title: string): React.ReactNode => {
    return (
      <div id="title-wrapper" className="w-full relative mb-[20px] flex">
        <div
          onClick={(e) => setFocusId(`title`)}
          id={`title`}
          contentEditable={`title` === focusId}
          onInput={(e) => handleOnTextChange(e, -1)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              if (focusId === "title") {
                let cloneContents = Object.assign({}, clonedContents);
                cloneContents.paragraphs.forEach((_, i) => {
                  const ele = document.getElementById(`paragraph_${i}`);
                  const content = ele?.innerText as string;
                  cloneContents.paragraphs[i].content = content;
                });

                cloneContents.paragraphs = [
                  {
                    content: "",
                    type: Type.TEXT,
                    fontStyles: [],
                    validFontStyles: [
                      FontStyle.BOLD,
                      FontStyle.ITALIC,
                      FontStyle.QUOTE,
                    ],
                    validTypes: [Type.TEXT, Type.LINK, Type.IMAGE],
                  },
                  ...cloneContents.paragraphs,
                ];

                setFocusId(`paragraph_0`);
                setContents(cloneContents);
                setClonedContents(cloneContents);
              }
            }
            if (e.key === "Backspace") {
            }
          }}
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

  useEffect(() => {
    if (focusId) {
      const ele = document.getElementById(focusId);
      if (ele) {
        ele.focus();
        ele.click();
      }
    }
  }, [focusId, clonedContents]);

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

  const save = async () => {
    const clone = Object.assign({}, contents);
    let short_content = "";
    let thumbnail_url = "";
    clone.paragraphs.forEach((p, i) => {
      const ele = document.getElementById(`paragraph_${i}`);
      let content = "";
      if (p.type === Type.IMAGE) {
        if (thumbnail_url === "") {
          thumbnail_url = ele?.innerHTML as string;
        }
        content = ele?.innerHTML as string;
      } else {
        if (short_content === "") {
          short_content = ele?.innerText as string;
        }
        content = ele?.innerText as string;
      }
      clone.paragraphs[i].content = content;
    });

    clone.title.content = document.getElementById("title")?.innerText as string;

    const title = clone.title.content;

    const data: PackedData = {
      title,
      content: JSON.stringify(clone),
      short_content,
      thumbnail_url,
    };
    setPackedData(data);
    setOpenPbModal(true);
  };

  const changeContentType = (data: ChangeContentTypeData, index: number) => {
    let cloneContents = Object.assign({}, clonedContents);
    cloneContents.paragraphs[index].type = data.type;
    cloneContents.paragraphs[index].content = data.value;
    if (data.type === Type.IMAGE) {
      cloneContents.paragraphs[index] = {
        ...cloneContents.paragraphs[index],
        imgProperties: {
          width: data.width,
          height: data.height,
        },
      };
      cloneContents.paragraphs.push({
        content: "",
        type: Type.TEXT,
        fontStyles: [],
        validFontStyles: [FontStyle.BOLD, FontStyle.ITALIC, FontStyle.QUOTE],
        validTypes: [Type.TEXT, Type.LINK, Type.IMAGE],
      });
      setFocusId(`paragraph_${index + 1}`);
    }
    setClonedContents(cloneContents);
  };

  useEffect(() => {
    window.scrollTo({
      top: window.innerHeight + window.outerHeight,
      behavior: "smooth",
    });
  }, [clonedContents]);

  return (
    <div className="w-full mt-[20px]">
      <PublishModal
        isOpen={isOpenPbModal && packedData != null}
        packedData={packedData}
      />
      <div className="w-full">
        <div className="w-full flex flex-col mb-[100px]">
          {clonedContents && getTitleNode(clonedContents.title.content)}
          {clonedContents &&
            clonedContents.paragraphs.map((pa, i) => (
              <ParagraphEdit
                removeFS={removeFS}
                addFS={addFS}
                clonedContents={clonedContents}
                focusId={focusId}
                i={i}
                paragraph={pa}
                setClonedContents={setClonedContents}
                handleOnTextChange={handleOnTextChange}
                setFocusId={setFocusId}
                key={i}
                changeContentType={changeContentType}
              />
            ))}
        </div>
      </div>
      <button
        onClick={save}
        className="fixed bottom-[50px] right-[50px] bg-[#121212] px-[15px] py-[5px] text-[white] z-[100]"
      >
        Save
      </button>
    </div>
  );
};

export default TextEditorEdit;
