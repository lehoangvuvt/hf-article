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

    console.log(sortedByOrder);

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
        </div>
      )}
    </div>
  );
}

export default NewEditor;
