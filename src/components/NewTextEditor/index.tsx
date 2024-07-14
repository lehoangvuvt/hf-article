"use client";

import YooptaEditor, {
  createYooptaEditor,
  Elements,
  Blocks,
  useYooptaEditor,
} from "@yoopta/editor";

import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import Embed from "@yoopta/embed";
import Image from "@yoopta/image";
import Link from "@yoopta/link";
import Callout from "@yoopta/callout";
import Video from "@yoopta/video";
import File from "@yoopta/file";
import Accordion from "@yoopta/accordion";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from "@yoopta/marks";
import { HeadingOne, HeadingThree, HeadingTwo } from "@yoopta/headings";
import Code from "@yoopta/code";
import ActionMenuList, {
  DefaultActionMenuRender,
} from "@yoopta/action-menu-list";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";

import { useEffect, useMemo, useRef, useState } from "react";
import UploadService from "@/services/upload.service";
import AuthConditionalRenderWrapper from "@/middlewares/authConditionalRenderWrapper";
import { PackedData } from "@/components/TextEditor/types";
import PublishModal from "@/components/TextEditor/publishModal";

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString());
    reader.onerror = reject;
  });

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

function NewEditor({
  mode = "edit",
  initValue = {},
}: {
  mode?: "readonly" | "edit";
  initValue?: any;
}) {
  const [packedData, setPackedData] = useState<PackedData | null>(null);
  const [isOpenPbModal, setOpenPbModal] = useState(false);
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef(null);
  const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [headingTitles, setHeadingTitles] = useState<
    { id: string; text: string }[]
  >([]);

  const plugins: any = [
    Paragraph,
    Accordion,
    HeadingOne,
    HeadingTwo,
    HeadingThree,
    Blockquote,
    Callout,
    NumberedList,
    BulletedList,
    TodoList,
    Code,
    Link,
    Embed,
    Image.extend({
      options: {
        async onUpload(file) {
          const base64 = (await toBase64(file)) as string;

          const response = await UploadService.UploadFile({
            base64,
            file_type: "image",
            file_name: `${file.name}_${new Date().getTime()}`,
          });

          if (response.status === "fail") {
            return {
              src: "",
              alt: "",
              sizes: {
                width: 0,
                height: 0,
              },
            };
          }
          setThumbnailURL(response.data.url);
          return {
            src: response.data.url,
            alt: file.name,
            sizes: {
              width: response.data.width,
              height: response.data.height,
            },
          };
        },
      },
    }),
  ];

  const TOOLS = {
    ActionMenu: {
      render: DefaultActionMenuRender,
      tool: ActionMenuList,
    },
    Toolbar: {
      render: DefaultToolbarRender,
      tool: Toolbar,
    },
    LinkTool: {
      render: DefaultLinkToolRender,
      tool: LinkTool,
    },
  };

  useEffect(() => {
    function handleChange(value: any) {
      console.log("value", value);
    }
    editor.on("change", handleChange);
    return () => {
      editor.off("change", handleChange);
    };
  }, [editor]);

  useEffect(() => {
    const headingTitles: { id: string; text: string }[] = [];
    if (mode === "readonly") {
      Object.keys(initValue).forEach((key: any) => {
        const item = initValue[key];
        if (item.type.includes("Heading")) {
          headingTitles.push({
            id: item.value[0].id,
            text: item.value[0].children[0].text,
          });
        }
      });
      setHeadingTitles(headingTitles.slice(1));
    }
  }, [mode, initValue]);

  const save = async () => {
    const editorContent = editor.getEditorValue();
    let title = "";
    let shortContent = "";
    const sortedByOrder = Object.keys(editorContent)
      .map((key) => {
        return {
          ...editorContent[key],
        };
      })
      .toSorted((a, b) => a.meta.order - b.meta.order);
    sortedByOrder.forEach((item) => {
      if (title !== "" && shortContent !== "") return;
      if (
        (item.type === "Paragraph" ||
          item.type === "HeadingOne" ||
          item.type === "HeadingTwo" ||
          item.type === "HeadingThree") &&
        item.value[0].children[0].text !== ""
      ) {
        if (title === "") {
          title = item.value[0].children[0].text;
        } else {
          shortContent = item.value[0].children[0].text;
        }
      }
    });

    // clone.title.content = document.getElementById("title")?.innerText as string;
    // const title = clone.title.content;
    const data: PackedData = {
      title,
      content: JSON.stringify(editorContent),
      short_content: shortContent,
      thumbnail_url: thumbnailURL ?? "",
    };
    setPackedData(data);
    setOpenPbModal(true);
  };

  const scrollToContent = (eleId: string) => {
    const ele: any = document.getElementById(eleId);
    if (ele) {
      const parent: any = ele.offsetParent.offsetParent;
      window.scrollTo({ top: parent.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {mode === "edit" ? (
        <AuthConditionalRenderWrapper renderIf="AUTH">
          <div
            className="w-full flex justify-center mt-[20px]"
            ref={selectionRef}
          >
            <YooptaEditor
              style={{
                width: "100%",
              }}
              editor={editor}
              plugins={plugins}
              tools={TOOLS}
              marks={MARKS}
              selectionBoxRoot={selectionRef}
              autoFocus
            />
          </div>
          {!isOpenPbModal && (
            <button
              onClick={save}
              className="fixed top-[22px] text-[0.9rem] right-[12%] bg-[#121212] px-[15px] py-[5px] text-[white] z-[600]"
            >
              Publish
            </button>
          )}
          <PublishModal
            isOpen={isOpenPbModal && packedData != null}
            packedData={packedData}
          />
        </AuthConditionalRenderWrapper>
      ) : (
        <div
          className="w-full flex justify-center mt-[20px]"
          ref={selectionRef}
        >
          <YooptaEditor
            style={{
              width: "100%",
            }}
            editor={editor}
            plugins={plugins}
            tools={TOOLS}
            marks={MARKS}
            selectionBoxRoot={selectionRef}
            value={initValue}
            readOnly
            autoFocus
          />
          <div
            tabIndex={1}
            onBlur={(e) => {
              setOpenMenu(false);
            }}
            onClick={() => setOpenMenu(!isOpenMenu)}
            className={`fixed top-[200px] max-[768px]:right-[10px] max-[768px]:top-[80px] right-[18%] border-solid border-[2px] border-[rgba(0,0,0,0.2)]
                          rounded-[40px] h-[40px] w-[40px] bg-[white] z-[100] flex items-center justify-center cursor-pointer`}
          >
            <div>
              <MenuIcon
                fontSize="inherit"
                style={{
                  fontSize: "1.2rem",
                }}
              />
              <div
                style={{
                  pointerEvents: isOpenMenu ? "auto" : "none",
                  opacity: isOpenMenu ? 1 : 0,
                  transition: "all 0.1s ease",
                }}
                className={`w-[350px] max-[768px]:right-[10px] max-[768px]:top-[125px] flex flex-col gap-[10px] 
                          bg-[white] px-[20px] py-[20px] fixed top-[250px] right-[18%] 
                          rounded-md border-solid border-[1px] border-[rgba(0,0,0,0.1)] shadow-md`}
              >
                {headingTitles.map((title) => (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToContent(title.id);
                    }}
                    className="hover:underline"
                    key={title.id}
                  >
                    {title.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewEditor;
